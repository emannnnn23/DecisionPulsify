"""Logistic regression parameters for each course.

Coefficients predict P(Decline) (class 1). Keep in sync with the fallback
copy in frontend/script.js.
"""

GWA_SCALE = {"MIN": 70.0, "MAX": 100.0}

# General questions (q11-q20) and background features shared in structure across models.
MODELS = {
    "CS": {
        "title": "Bachelor of Science in Computer Science",
        "intercept": -1.0,
        "coefficients": {
            "q1_No": 0.4, "q2_No": 0.3, "q3_No": 0.5, "q4_No": 0.84, "q5_No": 0.90,
            "q6_No": 1.33, "q7_No": 0.2, "q8_No": 0.1, "q9_No": 1.24, "q10_No": 0.1,
            "q11_No": 0.2, "q12_No": 0.1, "q13_No": 1.07, "q14_No": 0.1, "q15_Yes": 0.1, "q16_No": 0.1,
            "q17_No": 0.3, "q18_Yes": -0.83, "q19_Yes": -0.55, "q20_Yes": 0.15,
            "with_honors_Yes": -0.97, "shs_strand_STEM": 0.82, "shs_strand_HUMSS": 0.15, "shs_strand_TVL": 0.30,
            "shs_strand_GAS": 0.05, "shs_strand_ABM": 0.20,
            "high_school_type_Private": 0.1, "high_school_type_Science High School": -0.1,
            "gwa_scaled": -0.3,
        },
    },
    "NURSING": {
        "title": "Bachelor of Science in Nursing",
        "intercept": -0.5,
        "coefficients": {
            "q1_No": 1.50, "q2_No": 1.10, "q3_No": 0.90, "q4_No": 0.50, "q5_No": 0.30,
            "q6_No": 0.10, "q7_No": 0.20, "q8_No": 0.15, "q9_No": 0.10, "q10_No": 0.05,
            "q11_No": 0.3, "q12_No": 0.2, "q13_No": 0.5, "q14_No": 0.1, "q15_Yes": 0.05, "q16_No": 0.05,
            "q17_No": 0.4, "q18_Yes": -0.7, "q19_Yes": -0.4, "q20_Yes": 0.2,
            "with_honors_Yes": -0.70, "shs_strand_STEM": -0.50, "shs_strand_HUMSS": 0.20, "shs_strand_TVL": 0.40,
            "shs_strand_GAS": 0.30, "shs_strand_ABM": 0.50,
            "high_school_type_Private": 0.05, "high_school_type_Science High School": -0.2,
            "gwa_scaled": -0.4,
        },
    },
    "TOURISM": {
        "title": "Bachelor of Science in Tourism Management",
        "intercept": -0.8,
        "coefficients": {
            "q1_No": 1.20, "q2_No": 0.90, "q3_No": 0.70, "q4_No": 0.30, "q5_No": 0.50,
            "q6_No": 0.10, "q7_No": 0.15, "q8_No": 0.20, "q9_No": 0.05, "q10_No": 0.08,
            "q11_No": 0.25, "q12_No": 0.15, "q13_No": 0.8, "q14_No": 0.05, "q15_Yes": 0.1, "q16_No": 0.1,
            "q17_No": 0.35, "q18_Yes": -0.6, "q19_Yes": -0.3, "q20_Yes": 0.1,
            "with_honors_Yes": -0.60, "shs_strand_STEM": 0.1, "shs_strand_HUMSS": -0.3, "shs_strand_TVL": -0.4,
            "shs_strand_GAS": -0.2, "shs_strand_ABM": -0.35,
            "high_school_type_Private": 0.1, "high_school_type_Science High School": 0.0,
            "gwa_scaled": -0.2,
        },
    },
    "CRIMINOLOGY": {
        "title": "Bachelor of Science in Criminology",
        "intercept": -1.2,
        "coefficients": {
            "q1_No": 1.30, "q2_No": 1.10, "q3_No": 0.90, "q4_No": 0.60, "q5_No": 0.40,
            "q6_No": 0.20, "q7_No": 0.10, "q8_No": 0.15, "q9_No": 0.05, "q10_No": 0.08,
            "q11_No": 0.35, "q12_No": 0.1, "q13_No": 0.9, "q14_No": 0.2, "q15_Yes": 0.05, "q16_No": 0.05,
            "q17_No": 0.3, "q18_Yes": -0.7, "q19_Yes": -0.5, "q20_Yes": 0.15,
            "with_honors_Yes": -0.80, "shs_strand_STEM": 0.1, "shs_strand_HUMSS": -0.4, "shs_strand_TVL": 0.2,
            "shs_strand_GAS": 0.1, "shs_strand_ABM": 0.3,
            "high_school_type_Private": 0.05, "high_school_type_Science High School": -0.1,
            "gwa_scaled": -0.3,
        },
    },
    "EDUCATION": {
        "title": "Bachelor of Science in Education",
        "intercept": -0.7,
        "coefficients": {
            "q1_No": 1.40, "q2_No": 1.00, "q3_No": 0.80, "q4_No": 0.50, "q5_No": 0.30,
            "q6_No": 0.10, "q7_No": 0.15, "q8_No": 0.20, "q9_No": 0.05, "q10_No": 0.08,
            "q11_No": 0.25, "q12_No": 0.15, "q13_No": 0.8, "q14_No": 0.1, "q15_Yes": 0.05, "q16_No": 0.1,
            "q17_No": 0.35, "q18_Yes": -0.6, "q19_Yes": -0.3, "q20_Yes": 0.1,
            "with_honors_Yes": -0.70, "shs_strand_STEM": 0.2, "shs_strand_HUMSS": -0.3, "shs_strand_TVL": 0.1,
            "shs_strand_GAS": -0.4, "shs_strand_ABM": 0.2,
            "high_school_type_Private": 0.05, "high_school_type_Science High School": -0.1,
            "gwa_scaled": -0.35,
        },
    },
}
