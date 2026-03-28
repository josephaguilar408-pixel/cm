// ── Screen router ────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

// ── Auth (backed by localStorage — swap for real API as needed) ──
const AUTH_KEY = 'clearmicUser';
const PAID_KEY = 'clearmicPaid';

function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch { return null; }
}
function setUser(u) { localStorage.setItem(AUTH_KEY, JSON.stringify(u)); }
function clearUser() { localStorage.removeItem(AUTH_KEY); }
function isPaid() { return localStorage.getItem(PAID_KEY) === '1'; }
function markPaid() { localStorage.setItem(PAID_KEY, '1'); }

function routeAfterLogin() {
  showScreen(isPaid() ? 'app' : 'paywall');
}

// Init: check if already signed in
if (getUser()) {
  routeAfterLogin();
}

// ── Login ────────────────────────────────────────────
document.getElementById('goto-signup').addEventListener('click', () => showScreen('signup'));
document.getElementById('goto-login').addEventListener('click', () => showScreen('login'));

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('login-error');

  // TODO: replace with your real auth API call (Supabase, Firebase, etc.)
  const saved = getUser();
  if (saved && saved.email === email && saved.password === password) {
    errEl.textContent = '';
    routeAfterLogin();
  } else {
    errEl.textContent = 'Incorrect email or password.';
  }
});

// ── Sign-up ──────────────────────────────────────────
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const errEl = document.getElementById('signup-error');

  if (password.length < 8) {
    errEl.textContent = 'Password must be at least 8 characters.';
    return;
  }

  // TODO: replace with your real sign-up API call
  setUser({ name, email, password });
  errEl.textContent = '';
  routeAfterLogin();
});

// ── Paywall ──────────────────────────────────────────
// Replace this URL with your real Stripe Payment Link
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK';

document.getElementById('checkout-btn').addEventListener('click', () => {
  window.noiseFilter.openExternal(STRIPE_PAYMENT_LINK);
});

document.getElementById('restore-btn').addEventListener('click', () => {
  // TODO: verify purchase against your backend/Stripe API
  markPaid();
  showScreen('app');
});

document.getElementById('paywall-logout').addEventListener('click', () => {
  clearUser();
  showScreen('login');
});

// ── Main app ─────────────────────────────────────────
let processRunning = false;

const toggleBtn = document.getElementById('toggleBtn');
const statusEl = document.getElementById('status');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const statusPill = document.getElementById('status-pill');

function setRunning(running, message) {
  processRunning = running;
  toggleBtn.textContent = running ? 'Stop Noise Cancellation' : 'Start Noise Cancellation';
  toggleBtn.className = 'btn btn-toggle ' + (running ? 'on' : 'off');
  statusDot.className = 'dot ' + (running ? 'on' : '');
  statusText.textContent = running ? 'ON' : 'OFF';
  statusPill.className = 'status-pill ' + (running ? 'on' : '');
  if (message) statusEl.textContent = message;
}

toggleBtn.addEventListener('click', () => {
  if (!processRunning) {
    window.noiseFilter.start();
    setRunning(true, 'Routing to virtual mic...');
  } else {
    window.noiseFilter.stop();
    setRunning(false, 'Stopped');
  }
});

document.getElementById('app-logout').addEventListener('click', () => {
  if (processRunning) {
    window.noiseFilter.stop();
    setRunning(false);
  }
  clearUser();
  showScreen('login');
});
