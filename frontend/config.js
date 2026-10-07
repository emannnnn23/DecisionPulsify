// Backend API base URL (no trailing slash).
// Update PRODUCTION_API_URL to your Render service URL after deploying the backend.
(function () {
    const PRODUCTION_API_URL = 'https://decisionpulse-api.onrender.com';
    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    window.APP_CONFIG = {
        API_BASE_URL: isLocal ? 'http://localhost:8000' : PRODUCTION_API_URL,
    };
})();
