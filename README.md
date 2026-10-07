```markdown
# 📊 DecisionPulse

## 📖 Overview

DecisionPulse is a dynamic web application designed to facilitate structured decision-making. It provides an intuitive interface for users to define various criteria, evaluate multiple options against these criteria, and visualize the resulting scores to make clearer, more objective choices. The application leverages client-side JavaScript for an interactive experience and includes a Python component for potential auxiliary data processing or advanced analysis.

## ✨ Features

-   **Interactive Decision Matrix**: Easily define and manage decision criteria and alternative options.
-   **Weighted Scoring System**: Assign weights to different criteria to reflect their importance in the decision process.
-   **Dynamic Option Evaluation**: Score each option against every criterion for comprehensive analysis.
-   **Visualized Decision Outcomes**: See clear, organized results of your evaluations, helping to identify the optimal choice.
-   **Local Data Persistence**: Save and load your decision projects directly in the browser using local storage.
-   **Intuitive User Interface**: A responsive and easy-to-use interface for seamless interaction.
-   **Extensible Design**: A Python directory is included, allowing for the integration of advanced algorithms, data processing, or backend functionalities.

## 📁 Project Structure

```
DecisionPulse/
├── frontend/              # Static site → deployed on Vercel
│   ├── index.html
│   ├── styles.css
│   ├── script.js          # UI logic + local fallback model
│   ├── config.js          # Backend API URL
│   └── vercel.json
├── backend/               # FastAPI prediction API → deployed on Render
│   ├── app/main.py        # Endpoints: /health, /api/courses, /api/predict
│   ├── app/models.py      # Logistic regression coefficients per course
│   └── requirements.txt
├── python/                # Offline model training/analysis (not deployed)
├── render.yaml            # Render Blueprint for the backend
└── web/                   # Legacy Firebase Hosting copy (unused)
```

## 🚀 Running Locally

**Backend**
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

**Frontend**
```bash
cd frontend
python -m http.server 5500
# open http://localhost:5500 (automatically talks to http://localhost:8000)
```

If the API is unreachable, the frontend computes the prediction in the browser using the same coefficients.

**Training script (optional)**
```bash
cd python
pip install -r requirements.txt
python data_preparation.py
```

## ☁️ Deployment

### 1. Backend on Render
1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, then select the repo. Render reads `render.yaml` and creates the `decisionpulse-api` web service.
   - Manual alternative: **New → Web Service**, Root Directory `backend`, Build `pip install -r requirements.txt`, Start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, Health check `/health`.
3. Copy the service URL (e.g. `https://decisionpulse-api.onrender.com`) and check `https://<your-url>/health`.

### 2. Frontend on Vercel
1. Set `PRODUCTION_API_URL` in `frontend/config.js` to your Render URL, then commit and push.
2. In Vercel: **Add New → Project**, then import the repo.
3. Set **Root Directory** to `frontend` and **Framework Preset** to `Other`. Leave the build command empty.
4. Deploy.

### 3. Lock down CORS
In Render → Environment, set `ALLOWED_ORIGINS` to your Vercel URL (e.g. `https://decisionpulse.vercel.app`, comma-separate multiple). To also allow preview deploys, set `ALLOWED_ORIGIN_REGEX`, e.g. `https://decisionpulse.*\.vercel\.app`.

> Render's free plan sleeps after inactivity, so the first request can take ~30–60s. The frontend waits 8s, then falls back to the in-browser model.

### Environment variables (backend)
| Variable | Default | Purpose |
|---|---|---|
| `ALLOWED_ORIGINS` | `*` | Comma-separated allowed frontend origins |
| `ALLOWED_ORIGIN_REGEX` | – | Optional regex for allowed origins |
| `PYTHON_VERSION` | `3.12.8` | Python version on Render |

## 🤝 Contributing

We welcome contributions to DecisionPulse! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

## 📄 License

This project is currently without an explicit license. Please contact the repository owner for licensing information. <!-- TODO: Add a LICENSE file with an open-source license like MIT or Apache 2.0 -->

## 🙏 Acknowledgments

-   Built with vanilla HTML, CSS, and JavaScript.
-   Prediction API built with FastAPI.

## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/reyxdz/DecisionPulse/issues)

---

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [reyxdz](https://github.com/reyxdz)

</div>
```
