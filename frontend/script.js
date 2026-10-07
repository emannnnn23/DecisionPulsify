// Firebase Configuration and Initialization using CDN
const firebaseConfig = {
  apiKey: "AIzaSyADdUW8zQrC6svyYNNQW0e-Qf6o9HPYB-8",
  authDomain: "decisionpulse-online.firebaseapp.com",
  projectId: "decisionpulse-online",
  storageBucket: "decisionpulse-online.firebasestorage.app",
  messagingSenderId: "743709648764",
  appId: "1:743709648764:web:f5e89187208ee1b1cae6f9",
  measurementId: "G-6P9ZN8263Q"
};

// Initialize Firebase using global firebase object from CDN
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();

// --- LOGISTIC REGRESSION MODEL PARAMETERS (Algorithm Definitions) ---

// Base/Template Questions and Coefficients (CS/IT Model is based on user data)
const BASE_GWA_SCALE = { MIN: 70.0, MAX: 100.0 };

// 1. Bachelor of Science in Computer Science Model (Based on your provided data analysis)
const CS_MODEL = {
    TITLE: 'Bachelor of Science in Computer Science',
    INTERCEPT: -1.0,
    GWA_SCALE: BASE_GWA_SCALE,
    COEFFICIENTS: {
        // IT/CS Specific Questions (Q1-Q10) - Binary: Yes=0, No=1 -> P(Decline)
        'q1_No': 0.4, 'q2_No': 0.3, 'q3_No': 0.5, 'q4_No': 0.84, 'q5_No': 0.90, 
        'q6_No': 1.33, // High influence
        'q7_No': 0.2, 'q8_No': 0.1, 'q9_No': 1.24, // High influence
        'q10_No': 0.1, 
        
        // General Questions (Q11-Q20) - These are kept consistent across all models
        'q11_No': 0.2, 'q12_No': 0.1, 'q13_No': 1.07, 'q14_No': 0.1, 'q15_Yes': 0.1, 'q16_No': 0.1, 
        'q17_No': 0.3, 'q18_Yes': -0.83, 'q19_Yes': -0.55, 'q20_Yes': 0.15, 

        // Academic/Background
        'with_honors_Yes': -0.97, 'shs_strand_STEM': 0.82, 'shs_strand_HUMSS': 0.15, 'shs_strand_TVL': 0.30,
        'shs_strand_GAS': 0.05, 'shs_strand_ABM': 0.20,
        'high_school_type_Private': 0.1, 'high_school_type_Science High School': -0.1,
        'gwa_scaled': -0.3
    },
    QUESTIONS: [
        { id: 'q1', text: '1. Do you like using computers and technology?' },
        { id: 'q2', text: '2. Do you enjoy solving problems using logic and creativity?' },
        { id: 'q3', text: '3. Do you want to learn programming or coding?' },
        { id: 'q4', text: '4. Are you interested in creating apps, games, or websites?' },
        { id: 'q5', text: '5. Do you like subjects such as math and science?' },
        { id: 'q6', text: '6. Are you patient when working on computers for a long time?' },
        { id: 'q7', text: '7. Do you want to work in an office or IT company in the future?' },
        { id: 'q8', text: '8. Are you good at analyzing and fixing computer problems?' },
        { id: 'q9', text: '9. Do you like learning new technologies or software?' },
        { id: 'q10', text: '10. Do you see yourself working as a programmer or IT professional?' },
    ]
};

// 2. Bachelor of Science in Nursing Model (Simulated)
const NURSING_MODEL = {
    TITLE: 'Bachelor of Science in Nursing',
    INTERCEPT: -0.5,
    GWA_SCALE: BASE_GWA_SCALE,
    COEFFICIENTS: {
        // Nursing Specific Questions - Binary: Yes=0, No=1 -> P(Decline)
        'q1_No': 1.50, // Caring for people
        'q2_No': 1.10, // Patience/Calmness
        'q3_No': 0.90, // Communication
        'q4_No': 0.50, // Biology/Health-related
        'q5_No': 0.30, 
        'q6_No': 0.10,
        'q7_No': 0.20, 
        'q8_No': 0.15, // Working hours
        'q9_No': 0.10, // Protocols
        'q10_No': 0.05, // Bodily fluids/injuries
        
        // General Questions (Q11-Q20) - Simulated
        'q11_No': 0.3, 'q12_No': 0.2, 'q13_No': 0.5, 'q14_No': 0.1, 'q15_Yes': 0.05, 'q16_No': 0.05, 
        'q17_No': 0.4, 'q18_Yes': -0.7, 'q19_Yes': -0.4, 'q20_Yes': 0.2, 

        // Academic/Background - Simulated
        'with_honors_Yes': -0.70, 
        'shs_strand_STEM': -0.50, // STEM is very helpful for health
        'shs_strand_HUMSS': 0.20, 'shs_strand_TVL': 0.40, 'shs_strand_GAS': 0.30, 'shs_strand_ABM': 0.50,
        'high_school_type_Private': 0.05, 'high_school_type_Science High School': -0.2,
        'gwa_scaled': -0.4
    },
    QUESTIONS: [
        { id: 'q1', text: '1. Do you enjoy helping and caring for other people?' },
        { id: 'q2', text: '2. Are you patient and calm when faced with difficult situations?' },
        { id: 'q3', text: '3. Are you good at communicating with people, especially when they are distressed?' },
        { id: 'q4', text: '4. Do you enjoy studying Biology/Health-related subjects?' },
        { id: 'q5', text: '5. Do you mind working long or irregular hours (e.g., night shifts)?' },
        { id: 'q6', text: '6. Are you good at following strict protocols and procedures exactly?' },
        { id: 'q7', text: '7. Do you handle the sight of blood or bodily injury well?' },
        { id: 'q8', text: '8. Is your long-term goal to work abroad in the medical field?' },
        { id: 'q9', text: '9. Do you consider yourself highly resilient to stress?' },
        { id: 'q10', text: '10. Do you have strong organizational skills for managing tasks?' },
    ]
};

// 3. Bachelor of Science in Tourism Management Model (Simulated)
const TOURISM_MODEL = {
    TITLE: 'Bachelor of Science in Tourism Management',
    INTERCEPT: -0.8,
    GWA_SCALE: BASE_GWA_SCALE,
    COEFFICIENTS: {
        // Tourism Specific Questions - Binary: Yes=0, No=1 -> P(Decline)
        'q1_No': 1.20, // Interest in travel
        'q2_No': 0.90, // Customer service
        'q3_No': 0.70, // Foreign language
        'q4_No': 0.30, // Working with people
        'q5_No': 0.50, // Organized events
        'q6_No': 0.10,
        'q7_No': 0.15, 
        'q8_No': 0.20, 
        'q9_No': 0.05, 
        'q10_No': 0.08,
        
        // General Questions (Q11-Q20) - Simulated
        'q11_No': 0.25, 'q12_No': 0.15, 'q13_No': 0.8, 'q14_No': 0.05, 'q15_Yes': 0.1, 'q16_No': 0.1, 
        'q17_No': 0.35, 'q18_Yes': -0.6, 'q19_Yes': -0.3, 'q20_Yes': 0.1, 

        // Academic/Background - Simulated
        'with_honors_Yes': -0.60, 
        'shs_strand_STEM': 0.1, 'shs_strand_HUMSS': -0.3, 'shs_strand_TVL': -0.4, // TVL/HUMSS more relevant
        'shs_strand_GAS': -0.2, 'shs_strand_ABM': -0.35,
        'high_school_type_Private': 0.1, 'high_school_type_Science High School': 0.0,
        'gwa_scaled': -0.2
    },
    QUESTIONS: [
        { id: 'q1', text: '1. Are you passionate about travel, culture, and destinations?' },
        { id: 'q2', text: '2. Do you enjoy providing customer service and interacting with the public?' },
        { id: 'q3', text: '3. Are you interested in learning or using a foreign language?' },
        { id: 'q4', text: '4. Do you like planning or organizing events, trips, or activities?' },
        { id: 'q5', text: '5. Do you handle unexpected changes or problems calmly and effectively?' },
        { id: 'q6', text: '6. Are you comfortable with a career that may require irregular hours or relocation?' },
        { id: 'q7', text: '7. Do you consider yourself charismatic and good at sales or promotion?' },
        { id: 'q8', text: '8. Are you generally patient with difficult customers or situations?' },
        { id: 'q9', text: '9. Do you enjoy learning about business management and operations?' },
        { id: 'q10', text: '10. Do you aspire to start your own tourism or hospitality business?' },
    ]
};

// 4. Bachelor of Science in Criminology Model (Simulated)
const CRIMINOLOGY_MODEL = {
    TITLE: 'Bachelor of Science in Criminology',
    INTERCEPT: -1.2,
    GWA_SCALE: BASE_GWA_SCALE,
    COEFFICIENTS: {
        // Criminology Specific Questions - Binary: Yes=0, No=1 -> P(Decline)
        'q1_No': 1.30, // Interest in law/justice
        'q2_No': 1.10, // Physical fitness
        'q3_No': 0.90, // Discipline/structure
        'q4_No': 0.60, // Investigative work
        'q5_No': 0.40, 
        'q6_No': 0.20,
        'q7_No': 0.10, 
        'q8_No': 0.15, 
        'q9_No': 0.05, 
        'q10_No': 0.08,
        
        // General Questions (Q11-Q20) - Simulated
        'q11_No': 0.35, 'q12_No': 0.1, 'q13_No': 0.9, 'q14_No': 0.2, 'q15_Yes': 0.05, 'q16_No': 0.05, 
        'q17_No': 0.3, 'q18_Yes': -0.7, 'q19_Yes': -0.5, 'q20_Yes': 0.15, 

        // Academic/Background - Simulated
        'with_honors_Yes': -0.80, 
        'shs_strand_STEM': 0.1, 'shs_strand_HUMSS': -0.4, // HUMSS highly relevant
        'shs_strand_TVL': 0.2, 'shs_strand_GAS': 0.1, 'shs_strand_ABM': 0.3,
        'high_school_type_Private': 0.05, 'high_school_type_Science High School': -0.1,
        'gwa_scaled': -0.3
    },
    QUESTIONS: [
        { id: 'q1', text: '1. Are you passionate about justice, law, and public safety?' },
        { id: 'q2', text: '2. Do you believe you are physically fit and disciplined?' },
        { id: 'q3', text: '3. Are you interested in the work of police, security, or correctional services?' },
        { id: 'q4', text: '4. Do you enjoy researching and analyzing facts to solve problems?' },
        { id: 'q5', text: '5. Are you comfortable with careers that demand high mental and physical stress?' },
        { id: 'q6', text: '6. Do you believe you have strong ethical boundaries and integrity?' },
        { id: 'q7', text: '7. Are you good at remembering names, faces, and details?' },
        { id: 'q8', text: '8. Have you enjoyed subjects like history, sociology, or law?' },
        { id: 'q9', text: '9. Are you willing to strictly adhere to rules and a chain of command?' },
        { id: 'q10', text: '10. Do you find investigative shows or true crime stories appealing?' },
    ]
};

// 5. Bachelor of Science in Education Model (Simulated)
const EDUCATION_MODEL = {
    TITLE: 'Bachelor of Science in Education',
    INTERCEPT: -0.7,
    GWA_SCALE: BASE_GWA_SCALE,
    COEFFICIENTS: {
        // Education Specific Questions - Binary: Yes=0, No=1 -> P(Decline)
        'q1_No': 1.40, // Enjoy teaching
        'q2_No': 1.00, // Patience with students
        'q3_No': 0.80, // Communication skills
        'q4_No': 0.50, // Inspiring others
        'q5_No': 0.30, 
        'q6_No': 0.10,
        'q7_No': 0.15, 
        'q8_No': 0.20, 
        'q9_No': 0.05, 
        'q10_No': 0.08,
        
        // General Questions (Q11-Q20) - Simulated
        'q11_No': 0.25, 'q12_No': 0.15, 'q13_No': 0.8, 'q14_No': 0.1, 'q15_Yes': 0.05, 'q16_No': 0.1, 
        'q17_No': 0.35, 'q18_Yes': -0.6, 'q19_Yes': -0.3, 'q20_Yes': 0.1, 

        // Academic/Background - Simulated
        'with_honors_Yes': -0.70, 
        'shs_strand_STEM': 0.2, 'shs_strand_HUMSS': -0.3, // HUMSS/GAS highly relevant
        'shs_strand_TVL': 0.1, 'shs_strand_GAS': -0.4, 'shs_strand_ABM': 0.2,
        'high_school_type_Private': 0.05, 'high_school_type_Science High School': -0.1,
        'gwa_scaled': -0.35
    },
    QUESTIONS: [
        { id: 'q1', text: '1. Do you genuinely enjoy teaching or mentoring others?' },
        { id: 'q2', text: '2. Do you have immense patience when dealing with children or students?' },
        { id: 'q3', text: '3. Are you skilled at explaining difficult concepts clearly to others?' },
        { id: 'q4', text: '4. Do you find inspiration in helping others learn and grow?' },
        { id: 'q5', text: '5. Are you comfortable being a public speaker or presenter in front of a class?' },
        { id: 'q6', text: '6. Do you enjoy learning the details of a specific subject matter (e.g., Math, History)?' },
        { id: 'q7', text: '7. Do you mind working within a structured academic system with rules and curricula?' },
        { id: 'q8', text: '8. Do you have strong organizational skills for lesson planning and grading?' },
        { id: 'q9', text: '9. Are you resilient to the emotional and mental stress of classroom management?' },
        { id: 'q10', text: '10. Is your primary career goal to contribute to nation-building through education?' },
    ]
};

const MODELS = {
    'CS': CS_MODEL,
    'NURSING': NURSING_MODEL,
    'TOURISM': TOURISM_MODEL,
    'CRIMINOLOGY': CRIMINOLOGY_MODEL,
    'EDUCATION': EDUCATION_MODEL
};

let CURRENT_MODEL = CS_MODEL;

function scaleGWA(gwa) {
    const min = CURRENT_MODEL.GWA_SCALE.MIN;
    const max = CURRENT_MODEL.GWA_SCALE.MAX;
    return (gwa - min) / (max - min);
}

function sigmoid(z) {
    // Avoid extreme values in exp() to prevent overflow, though unlikely with these coefficients
    const safe_z = Math.min(Math.max(z, -30), 30); 
    return 1 / (1 + Math.exp(-safe_z));
}

function predictProbability(formData) {
    let z = CURRENT_MODEL.INTERCEPT; // Start with the intercept (Beta_0)
    const coeffs = CURRENT_MODEL.COEFFICIENTS;

    // 1. Process GWA (Scaled Numerical Feature)
    const gwa = parseFloat(formData.get('gwa'));
    const gwa_scaled = scaleGWA(gwa);
    z += gwa_scaled * (coeffs['gwa_scaled'] || 0);

    // 2. Process Binary Features (Yes/No) and Categorical (OHE)
    for (const [key, coeff] of Object.entries(coeffs)) {
        // Check if it's a binary question (q1-q20)
        if (key.match(/^q(0?[1-9]|1\d|20)_(Yes|No)$/)) {
            const [q_name, q_val] = key.split('_');
            const form_value = formData.get(q_name);
            
            if (form_value && q_val === form_value) {
                z += coeff;
            }
        } 
        // Check if it's a background feature
        else if (key.match(/^(with_honors)_(Yes|No)$/)) {
            const f_val = key.slice('with_honors_'.length);
            const form_value = formData.get('with_honors');
            if (form_value && f_val === form_value) {
                z += coeff;
            }
        } 
        // Check if it's a one-hot encoded (OHE) categorical feature
        else if (key.match(/^(shs_strand|high_school_type)_/)) {
            const feature_parts = key.split('_');
            const feature_name = feature_parts.slice(0, feature_parts.length - 1).join('_'); // e.g., shs_strand
            const form_value = formData.get(feature_name);
            
            if (form_value && key.includes(form_value)) {
                z += coeff;
            }
        }
    }
    
    // Calculate the probability P(Y=1) -> Probability of Declining
    const p_decline = sigmoid(z);

    // The website displays P(Confirm) which is P(Y=0) = 1 - P(Y=1)
    const p_confirm = 1 - p_decline;

    return p_confirm;
}

// Asks the backend for a prediction; falls back to the in-browser model if the API
// is unreachable (e.g. the Render free instance is still waking up).
async function getPrediction(courseKey, formData) {
    const apiBase = window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL;
    const submitButton = document.querySelector('#predictionForm button[type="submit"]');
    if (!apiBase) return predictProbability(formData);

    const answers = {};
    for (let i = 1; i <= 20; i++) answers[`q${i}`] = formData.get(`q${i}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    if (submitButton) submitButton.disabled = true;

    try {
        const response = await fetch(`${apiBase}/api/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                course: courseKey,
                gwa: parseFloat(formData.get('gwa')),
                shs_strand: formData.get('shs_strand'),
                high_school_type: formData.get('high_school_type'),
                with_honors: formData.get('with_honors'),
                answers,
            }),
        });
        if (!response.ok) throw new Error(`API responded with ${response.status}`);
        const data = await response.json();
        return data.p_confirm;
    } catch (err) {
        console.warn('Prediction API unavailable, using local model:', err);
        return predictProbability(formData);
    } finally {
        clearTimeout(timeout);
        if (submitButton) submitButton.disabled = false;
    }
}


// --- UI ---

const GENERAL_QUESTIONS = [
    { id: 'q11', text: 'Did you choose this program because it matches your interests?' },
    { id: 'q12', text: 'Do you feel confident you can succeed in this program?' },
    { id: 'q13', text: 'Have you looked into the careers this program leads to?' },
    { id: 'q14', text: 'Do your parents or guardians support your choice?' },
    { id: 'q15', text: 'Did relatives or friends influence your choice?' },
    { id: 'q16', text: 'Do you know someone currently taking this program?' },
    { id: 'q17', text: 'Can your family afford the tuition and other expenses?' },
    { id: 'q18', text: 'Are scholarships or financial aid available for this program?' },
    { id: 'q19', text: 'Is the university near where you live?' },
    { id: 'q20', text: 'Did you also apply to other programs?' },
];

const ANSWER_NAMES = ['gwa', 'shs_strand', 'high_school_type', 'with_honors',
    ...Array.from({ length: 20 }, (_, i) => `q${i + 1}`)];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastTimer;
function showAlert(message) {
    const messageBox = document.getElementById('messageBox');
    document.getElementById('messageText').textContent = message;
    messageBox.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { messageBox.hidden = true; }, 5000);
}

function questionHTML(q, number) {
    const text = q.text.replace(/^\d+\.\s*/, '');
    return `
        <fieldset class="item item--numbered" data-name="${q.id}">
            <span class="item__n" aria-hidden="true">${number}</span>
            <legend class="item__q">${text}</legend>
            <div class="ovals">
                <label class="oval"><input type="radio" name="${q.id}" value="Yes" required><span>Yes</span></label>
                <label class="oval"><input type="radio" name="${q.id}" value="No"><span>No</span></label>
            </div>
        </fieldset>`;
}

function loadQuestions() {
    document.getElementById('programTitle').textContent = `About ${CURRENT_MODEL.TITLE.replace('Bachelor of Science in ', '')}`;
    document.getElementById('dynamicQuestions').innerHTML =
        CURRENT_MODEL.QUESTIONS.map((q, i) => questionHTML(q, i + 5)).join('');
}

function itemFor(name) {
    const field = document.querySelector(`#predictionForm [name="${name}"]`);
    return field && field.closest('.item');
}

function unansweredNames(formData) {
    return ANSWER_NAMES.filter(name => !formData.get(name));
}

function updateAnswerCount() {
    const remaining = unansweredNames(new FormData(document.getElementById('predictionForm'))).length;
    document.getElementById('answerCount').textContent =
        remaining === 0 ? 'All 24 answered.' : `${24 - remaining} of 24 answered`;
}

// Shades ovals one after another, like a pencil working down a column.
function shadeInSequence(bubbles, delay) {
    bubbles.forEach((b, i) => {
        if (reducedMotion) b.classList.add('is-shaded');
        else setTimeout(() => b.classList.add('is-shaded'), i * delay);
    });
}

function buildNameGrid() {
    const container = document.getElementById('nameBubbles');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shaded = [];
    'TAHAK'.split('').forEach(letter => {
        const col = document.createElement('div');
        col.className = 'namegrid__col';
        for (const ch of alphabet) {
            const b = document.createElement('span');
            b.className = 'nb';
            b.textContent = ch;
            col.appendChild(b);
            if (ch === letter) shaded.push(b);
        }
        container.appendChild(col);
    });
    setTimeout(() => shadeInSequence(shaded, 180), 300);
}

function displayResult(p_confirm) {
    const resultCard = document.getElementById('resultCard');
    const pct = Math.round(Math.min(Math.max(p_confirm, 0), 1) * 100);
    const program = CURRENT_MODEL.TITLE.replace('Bachelor of Science in ', '');

    let tone, heading, body;
    if (pct >= 80) {
        tone = 'high';
        heading = 'You’d very likely confirm your slot.';
        body = `Your answers line up with students who take their place in ${program}.`;
    } else if (pct >= 50) {
        tone = 'mid';
        heading = 'You’d probably confirm, with some doubts.';
        body = 'Some of your answers point toward other options. Talk them through with family or a guidance counselor before enrollment.';
    } else {
        tone = 'low';
        heading = 'You might not confirm this slot.';
        body = `Many of your answers point away from ${program}. Try another program you applied to and compare.`;
    }

    resultCard.className = `result result--${tone}`;
    document.getElementById('resultProgram').textContent = program;
    document.getElementById('resultText').innerHTML = `<p><strong>${heading}</strong>${body}</p>`;

    const bar = document.getElementById('progressFill');
    bar.innerHTML = '';
    const bubbles = Array.from({ length: 20 }, () => {
        const b = document.createElement('span');
        b.className = 'nb';
        bar.appendChild(b);
        return b;
    });

    resultCard.hidden = false;
    resultCard.focus({ preventScroll: true });
    resultCard.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

    const percentEl = document.getElementById('resultPercent');
    const filled = Math.round(pct / 5);
    if (reducedMotion) {
        percentEl.textContent = pct;
        shadeInSequence(bubbles.slice(0, filled), 0);
        return;
    }
    percentEl.textContent = 0;
    const step = 45;
    setTimeout(() => {
        shadeInSequence(bubbles.slice(0, filled), step);
        const duration = Math.max(filled * step, 1);
        const start = performance.now();
        const tick = now => {
            const t = Math.min((now - start) / duration, 1);
            percentEl.textContent = Math.round(pct * t);
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, 400);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('predictionForm');
    const formContainer = document.getElementById('formContainer');
    const resultCard = document.getElementById('resultCard');

    buildNameGrid();
    document.getElementById('generalQuestions').innerHTML =
        GENERAL_QUESTIONS.map((q, i) => questionHTML(q, i + 15)).join('');

    form.addEventListener('change', function (e) {
        if (e.target.name === 'courseType') {
            CURRENT_MODEL = MODELS[e.target.value];
            loadQuestions();
            formContainer.hidden = false;
            resultCard.hidden = true;
        }
        const item = e.target.closest('.item');
        if (item) item.classList.remove('is-missing');
        updateAnswerCount();
    });

    form.addEventListener('input', function (e) {
        if (e.target.name === 'gwa') e.target.closest('.item').classList.remove('is-missing');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const selectedCourse = formData.get('courseType');
        if (!selectedCourse) {
            showAlert('Choose a program in Part I first.');
            return;
        }

        const missing = unansweredNames(formData);
        form.querySelectorAll('.is-missing').forEach(el => el.classList.remove('is-missing'));
        if (missing.length) {
            missing.forEach(name => itemFor(name).classList.add('is-missing'));
            const first = itemFor(missing[0]);
            first.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
            first.querySelector('input').focus({ preventScroll: true });
            showAlert(missing.length === 1
                ? '1 item is still blank. It’s marked in red.'
                : `${missing.length} items are still blank. They’re marked in red.`);
            return;
        }

        const gwa = parseFloat(formData.get('gwa'));
        if (!(gwa >= BASE_GWA_SCALE.MIN && gwa <= BASE_GWA_SCALE.MAX)) {
            itemFor('gwa').classList.add('is-missing');
            document.getElementById('gwa').focus();
            showAlert(`Enter a GWA between ${BASE_GWA_SCALE.MIN} and ${BASE_GWA_SCALE.MAX}.`);
            return;
        }

        getPrediction(selectedCourse, formData).then(displayResult);
    });

    document.getElementById('tryAnother').addEventListener('click', function () {
        const course = document.getElementById('courseType');
        course.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        const checked = course.querySelector('input:checked') || course.querySelector('input');
        checked.focus({ preventScroll: true });
    });

    updateAnswerCount();
});
