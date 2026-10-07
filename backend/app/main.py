import math
import os
from typing import Dict, Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from .models import GWA_SCALE, MODELS

YesNo = Literal["Yes", "No"]

app = FastAPI(title="DecisionPulse API", version="1.0.0")

# Comma-separated list of allowed frontend origins, e.g. "https://decisionpulse.vercel.app".
# Defaults to "*" so the API works before the Vercel URL is known.
allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    # Also allow Vercel preview deployments when ALLOWED_ORIGIN_REGEX is set,
    # e.g. "https://decisionpulse.*\.vercel\.app".
    allow_origin_regex=os.getenv("ALLOWED_ORIGIN_REGEX") or None,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class PredictionRequest(BaseModel):
    course: str
    gwa: float = Field(ge=GWA_SCALE["MIN"], le=GWA_SCALE["MAX"])
    shs_strand: Literal["HUMSS", "STEM", "GAS", "ABM", "TVL", "Others"]
    high_school_type: Literal["Public", "Private", "Science High School"]
    with_honors: YesNo
    # q1..q20 -> "Yes" / "No"
    answers: Dict[str, YesNo]


class PredictionResponse(BaseModel):
    course: str
    title: str
    p_confirm: float
    p_decline: float


def sigmoid(z: float) -> float:
    z = max(min(z, 30.0), -30.0)
    return 1.0 / (1.0 + math.exp(-z))


def predict(req: PredictionRequest) -> float:
    """Returns P(Decline) for the requested course."""
    model = MODELS[req.course]
    coeffs = model["coefficients"]

    z = model["intercept"]
    gwa_scaled = (req.gwa - GWA_SCALE["MIN"]) / (GWA_SCALE["MAX"] - GWA_SCALE["MIN"])
    z += gwa_scaled * coeffs.get("gwa_scaled", 0.0)

    active_features = {
        f"with_honors_{req.with_honors}",
        f"shs_strand_{req.shs_strand}",
        f"high_school_type_{req.high_school_type}",
        *(f"{q}_{v}" for q, v in req.answers.items()),
    }
    z += sum(coeffs.get(feature, 0.0) for feature in active_features)
    return sigmoid(z)


@app.get("/")
def root():
    return {"name": "DecisionPulse API", "docs": "/docs", "health": "/health"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/courses")
def courses():
    return [{"key": key, "title": m["title"]} for key, m in MODELS.items()]


@app.post("/api/predict", response_model=PredictionResponse)
def predict_endpoint(req: PredictionRequest):
    if req.course not in MODELS:
        raise HTTPException(status_code=400, detail=f"Unknown course '{req.course}'")

    expected = {f"q{i}" for i in range(1, 21)}
    missing = sorted(expected - req.answers.keys(), key=lambda q: int(q[1:]))
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing answers: {', '.join(missing)}")

    p_decline = predict(req)
    return PredictionResponse(
        course=req.course,
        title=MODELS[req.course]["title"],
        p_confirm=1.0 - p_decline,
        p_decline=p_decline,
    )
