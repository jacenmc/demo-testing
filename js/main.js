/* ============================================================
   SONDER — Main Application Script
   ============================================================ */

'use strict';

// ── Screen Navigation ────────────────────────────────────────
const screenHistory = [];

function showScreen(id) {
  const all = document.querySelectorAll('.screen');
  all.forEach(s => s.classList.remove('active'));

  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add('active');
  target.classList.remove('hidden');

  screenHistory.push(id);

  // Side effects per screen
  if (id === 'screen-home')          initHomeScreen();
  if (id === 'screen-setup')         initSetupScreen();
  if (id === 'screen-profile')       initProfileScreen();
  if (id === 'screen-user-profile')  initUserProfileScreen();
  if (id === 'screen-match-alert')   initMatchAlert();
}

// Wire back button on user profile to use history
document.getElementById('user-prof-back').addEventListener('click', () => {
  const prev = screenHistory[screenHistory.length - 2] || 'screen-home';
  showScreen(prev);
});

// ── Auth ─────────────────────────────────────────────────────
function setAuthMode(mode) {
  const signup = document.getElementById('form-signup');
  const login  = document.getElementById('form-login');
  const tabS   = document.getElementById('tab-signup');
  const tabL   = document.getElementById('tab-login');

  if (mode === 'signup') {
    signup.classList.remove('hidden');
    login.classList.add('hidden');
    tabS.classList.add('active');
    tabL.classList.remove('active');
  } else {
    login.classList.remove('hidden');
    signup.classList.add('hidden');
    tabL.classList.add('active');
    tabS.classList.remove('active');
  }
}

// ── Onboarding ───────────────────────────────────────────────
let obIndex = 0;
const OB_COUNT = 3;

function goToSlide(idx) {
  const slides = document.querySelectorAll('.ob-slide');
  slides.forEach((s, i) => {
    s.classList.remove('active', 'exit');
    if (i < idx) s.classList.add('exit');
    if (i === idx) s.classList.add('active');
  });
  const dots = document.querySelectorAll('.ob-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  obIndex = idx;

  const btn = document.getElementById('ob-btn');
  btn.textContent = idx === OB_COUNT - 1 ? 'Get started ✦' : 'Next';
}

function obNext() {
  if (obIndex < OB_COUNT - 1) {
    goToSlide(obIndex + 1);
  } else {
    showScreen('screen-auth');
  }
}

// ── Mock Data ─────────────────────────────────────────────────
const cardData = [
  {
    id: 1, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What\'s something small that brings you joy every day?',
    answer: 'The smell of coffee in the morning and the way light filters through my curtains. Also, the moment just before someone laughs at a joke — that split second of recognition.',
    user: { id: 2, name: 'Sofia M.', loc: 'Barcelona, Spain', img: 'https://i.pravatar.cc/80?img=5' }
  },
  {
    id: 2, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What makes you feel most alive?',
    answer: 'Dancing in the rain, especially when no one is watching. There\'s something liberating about moving without an audience. Also long drives with no destination.',
    user: { id: 3, name: 'Kenji T.', loc: 'Tokyo, Japan', img: 'https://i.pravatar.cc/80?img=8' }
  },
  {
    id: 3, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'Describe your perfect Sunday morning.',
    answer: 'Slow and completely unplanned. Coffee, a good book, maybe a walk before noon. The whole world feels gentler on an unhurried Sunday.',
    user: { id: 4, name: 'Amara O.', loc: 'Lagos, Nigeria', img: 'https://i.pravatar.cc/80?img=15' }
  },
  {
    id: 4, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What\'s a place that feels like home even though it isn\'t?',
    answer: 'My grandmother\'s kitchen. The smell of spices and something always simmering. I go back there in my mind whenever I feel lost.',
    user: { id: 5, name: 'Lena K.', loc: 'Warsaw, Poland', img: 'https://i.pravatar.cc/80?img=22' }
  },
  {
    id: 5, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What\'s your favourite time of day?',
    answer: 'Golden hour. That 20-minute window when everything looks lit from within. I\'ll drop everything just to be outside during it.',
    user: { id: 6, name: 'Marco A.', loc: 'Rome, Italy', img: 'https://i.pravatar.cc/80?img=33' }
  },
  {
    id: 6, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What\'s a book or film that changed how you see things?',
    answer: 'The Alchemist at 16. Made me realise that wanting something deeply enough is itself a kind of journey. I\'ve been chasing that feeling ever since.',
    user: { id: 7, name: 'Priya S.', loc: 'Mumbai, India', img: 'https://i.pravatar.cc/80?img=47' }
  },
  {
    id: 7, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What\'s something you\'re still learning to accept about yourself?',
    answer: 'That I don\'t need to have everything figured out. I\'m almost 30 and I still feel like I\'m improvising. But maybe that\'s just… life?',
    user: { id: 8, name: 'Tom R.', loc: 'Dublin, Ireland', img: 'https://i.pravatar.cc/80?img=52' }
  },
  {
    id: 8, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What would you do with a completely free day?',
    answer: 'Take a long drive with no destination. Stop at every interesting-looking café or viewpoint. No phone, just a camera. End up somewhere I\'ve never been.',
    user: { id: 9, name: 'Yasmin N.', loc: 'Cairo, Egypt', img: 'https://i.pravatar.cc/80?img=61' }
  },
  {
    id: 9, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What small ritual do you have that others might find odd?',
    answer: 'I thank plants. Not out loud, but I nod at them. My monstera gets a daily check-in. I genuinely believe it responds to being noticed.',
    user: { id: 10, name: 'Hana M.', loc: 'Seoul, South Korea', img: 'https://i.pravatar.cc/80?img=44' }
  },
  {
    id: 10, cat: '☀️', catLabel: 'Getting to Know You',
    question: 'What do you think the world needs more of right now?',
    answer: 'Patience for other people\'s stories. Everyone\'s carrying something invisible and we forget that constantly.',
    user: { id: 11, name: 'Carlos M.', loc: 'São Paulo, Brazil', img: 'https://i.pravatar.cc/80?img=68' }
  },
];

const setupQuestions = [
  { cat: '☀️', q: 'What\'s something small that brings you joy every day?' },
  { cat: '☀️', q: 'Describe your perfect Sunday morning.' },
  { cat: '☀️', q: 'What\'s a book, film or song that changed how you see things?' },
  { cat: '☀️', q: 'What do you think the world needs more of right now?' },
  { cat: '☀️', q: 'What would you do with a completely free day?' },
];

// ── Setup / Profile Building ──────────────────────────────────
let setupIndex = 0;

function initSetupScreen() {
  setupIndex = 0;
  renderSetupCard();
}

function renderSetupCard() {
  const stage = document.getElementById('setup-card-stage');
  const fill  = document.getElementById('setup-fill');
  const count = document.getElementById('setup-count');
  const ta    = document.getElementById('setup-ta');

  const q = setupQuestions[setupIndex];
  fill.style.width = `${((setupIndex + 1) / setupQuestions.length) * 100}%`;
  count.textContent = `${setupIndex + 1} / ${setupQuestions.length}`;
  ta.value = '';

  stage.innerHTML = `
    <div class="tarot-card" style="width:260px">
      <div class="tc-corner tc-tl">✦</div>
      <div class="tc-corner tc-tr">✦</div>
      <div class="tc-cat-icon">${q.cat}</div>
      <p class="tc-question">${q.q}</p>
      <div class="tc-rule"></div>
      <p class="tc-answer" style="color:var(--text-light);font-size:12px">Your answer goes here…</p>
      <div class="tc-corner tc-bl">✦</div>
      <div class="tc-corner tc-br">✦</div>
    </div>`;

  ta.addEventListener('input', () => {
    const aEl = stage.querySelector('.tc-answer');
    aEl.textContent = ta.value || 'Your answer goes here…';
    aEl.style.color = ta.value ? 'var(--text-mid)' : 'var(--text-light)';
  });
}

function setupNext() {
  if (setupIndex < setupQuestions.length - 1) {
    setupIndex++;
    renderSetupCard();
  } else {
    showScreen('screen-home');
  }
}
function setupSkip() {
  if (setupIndex < setupQuestions.length - 1) {
    setupIndex++;
    renderSetupCard();
  } else {
    showScreen('screen-home');
  }
}

// ── Card Wheel (Home) ─────────────────────────────────────────
const RADIUS     = 400;   // px — circle radius
const BOTTOM_OFF = 330;   // px — how far circle centre sits below wrapper bottom
const ANGLE_STEP = 22;    // degrees between adjacent cards
const VISIBLE    = [-3, -2, -1, 0, 1, 2, 3];

let currentCard   = 0;
let wheelAngle    = 0;
let isAnimating   = false;
let picksLeft     = 5;
let pickedCards   = new Set();
let touchStartX   = 0;
let touchStartY   = 0;
let hintShown     = false;

function initHomeScreen() {
  renderWheel();
  updateInfoPanel();
  setupWheelTouch();
}

function renderWheel() {
  const wheel = document.getElementById('card-wheel');
  wheel.innerHTML = '';
  wheel.style.transform = `rotate(0deg)`;

  VISIBLE.forEach(offset => {
    const idx  = mod(currentCard + offset, cardData.length);
    const card = cardData[idx];
    const el   = createFanCard(card, offset);
    wheel.appendChild(el);
  });
}

function createFanCard(card, offset) {
  const el = document.createElement('div');
  el.className = 'fan-card' + (offset === 0 ? ' is-center' : '');
  el.dataset.offset = offset;

  const angle = offset * ANGLE_STEP;
  const scaleV = offset === 0 ? 1 : Math.max(0.82, 1 - Math.abs(offset) * 0.06);
  const opacityV = Math.max(0.35, 1 - Math.abs(offset) * 0.2);
  const zV = 10 - Math.abs(offset);

  el.style.cssText = `
    transform: rotate(${angle}deg) translateY(-${RADIUS}px) rotate(${-angle}deg) scale(${scaleV});
    opacity: ${opacityV};
    z-index: ${zV};
  `;

  el.innerHTML = `
    <div class="fc-corner tl">✦</div>
    <div class="fc-corner tr">✦</div>
    <div class="fc-cat">${card.cat}</div>
    <p class="fc-q">${card.question}</p>
    <div class="fc-av-row">
      <img class="fc-av" src="${card.user.img}" alt="${card.user.name}" onerror="this.style.display='none'">
      <span class="fc-name">${card.user.name}</span>
    </div>
    <div class="fc-corner bl">✦</div>
    <div class="fc-corner br">✦</div>
  `;

  // Clicking a non-center card rotates wheel to it
  el.addEventListener('click', () => {
    if (offset !== 0 && !isAnimating) {
      rotateWheel(offset > 0 ? 1 : -1);
    } else if (offset === 0) {
      openCardDetail();
    }
  });

  return el;
}

function rotateWheel(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const wheel = document.getElementById('card-wheel');
  wheelAngle -= direction * ANGLE_STEP;
  wheel.style.transform = `rotate(${wheelAngle}deg)`;

  hideHint();

  setTimeout(() => {
    currentCard = mod(currentCard + direction, cardData.length);
    wheelAngle  = 0;
    wheel.style.transition = 'none';
    renderWheel();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      wheel.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    }));
    updateInfoPanel();
    isAnimating = false;
  }, 560);
}

function setupWheelTouch() {
  const wrapper = document.getElementById('wheel-wrapper');
  // Remove old listeners by cloning
  const fresh = wrapper.cloneNode(false);
  // Restore inner children
  const wheel = document.getElementById('card-wheel');
  const hint  = document.getElementById('swipe-hint');
  wrapper.parentNode.replaceChild(fresh, wrapper);
  fresh.id = 'wheel-wrapper';
  fresh.appendChild(wheel);
  fresh.appendChild(hint);

  fresh.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  fresh.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      rotateWheel(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  // Mouse drag for desktop testing
  let mouseDown = false;
  fresh.addEventListener('mousedown', e => { mouseDown = true; touchStartX = e.clientX; });
  window.addEventListener('mouseup', e => {
    if (!mouseDown) return;
    mouseDown = false;
    const dx = e.clientX - touchStartX;
    if (Math.abs(dx) > 40) rotateWheel(dx < 0 ? 1 : -1);
  });
}

function updateInfoPanel() {
  const card = cardData[currentCard];
  const picked = pickedCards.has(card.id);

  setEl('ai-q', card.question);
  setEl('ai-name', card.user.name);
  setEl('ai-loc', '📍 ' + card.user.loc);
  setEl('ai-excerpt', `"${card.answer.substring(0, 90)}…"`);

  const avatar = document.getElementById('ai-avatar');
  if (avatar) { avatar.src = card.user.img; avatar.alt = card.user.name; }

  const btn = document.getElementById('pick-btn');
  if (btn) {
    btn.innerHTML = picked ? '<span>✦</span> Picked!' : '<span>✦</span> Pick';
    btn.classList.toggle('picked', picked);
  }
}

function pickCard() {
  if (picksLeft <= 0) { showToast('No picks left today!'); return; }
  const card = cardData[currentCard];
  if (pickedCards.has(card.id)) return;

  pickedCards.add(card.id);
  picksLeft--;

  const num = document.getElementById('picks-num');
  if (num) num.textContent = picksLeft;

  const btn = document.getElementById('pick-btn');
  if (btn) { btn.innerHTML = '<span>✦</span> Picked!'; btn.classList.add('picked'); }

  // Simulate a match after picking card #1 (Sofia)
  if (card.user.id === 2 && !matchShown) {
    matchShown = true;
    setTimeout(() => triggerMatch(card.user), 1200);
  }
}

// ── Card Detail ───────────────────────────────────────────────
function openCardDetail() {
  const card = cardData[currentCard];
  setEl('dtc-q',   card.question);
  setEl('dtc-a',   `"${card.answer}"`);
  setEl('dtc-name', card.user.name);
  setEl('dtc-loc',  '📍 ' + card.user.loc);
  setEl('cd-cat',   `${card.cat} ${card.catLabel}`);
  setEl('dtc-icon', card.cat);

  const av = document.getElementById('dtc-avatar');
  if (av) { av.src = card.user.img; av.alt = card.user.name; }

  const pickBtn = document.getElementById('cda-pick');
  if (pickBtn) {
    const picked = pickedCards.has(card.id);
    pickBtn.classList.toggle('picked', picked);
    pickBtn.querySelector('span:last-child').textContent = picked ? 'Picked!' : 'Pick!';
  }

  showScreen('screen-card-detail');
}

function pickFromDetail() {
  const card = cardData[currentCard];
  if (pickedCards.has(card.id)) return;
  pickCard();
  const btn = document.getElementById('cda-pick');
  if (btn) { btn.classList.add('picked'); btn.querySelector('span:last-child').textContent = 'Picked!'; }
}

// ── Match Alert ───────────────────────────────────────────────
let matchShown = false;

function triggerMatch(user) {
  const u = user || { name: 'Sofia M.', img: 'https://i.pravatar.cc/80?img=5' };
  setEl('match-title', `You & ${u.name.split(' ')[0]} match!`);
  const av = document.getElementById('match-av');
  if (av) av.src = u.img;
  showScreen('screen-match-alert');
  initMatchAlert();
}

function initMatchAlert() {
  const overlay = document.getElementById('screen-match-alert');
  overlay.classList.remove('hidden');
}

function closeMatchAlert() {
  const overlay = document.getElementById('screen-match-alert');
  overlay.classList.add('hidden');
  overlay.classList.remove('active');
  showScreen('screen-home');
}

// ── Profile Screens ───────────────────────────────────────────
const myAnswers = [
  { q: 'What\'s something small that brings you joy?', a: 'Finding a perfect parking spot on the first try. And the smell of old books.' },
  { q: 'Describe your perfect Sunday morning.',        a: 'Slow, intentional. Coffee, no alarm, a run if I feel like it.' },
  { q: 'What makes you feel most alive?',              a: 'Being in motion — hiking, cycling, swimming. Anything that makes me aware of my body.' },
  { q: 'What would you do with a completely free day?', a: 'I\'d visit every café in my city I\'ve never been to. With a notebook.' },
];

function initProfileScreen() {
  const container = document.getElementById('my-mini-cards');
  if (!container) return;
  container.innerHTML = '';
  myAnswers.forEach(item => {
    const el = document.createElement('div');
    el.className = 'mini-card';
    el.innerHTML = `<p class="mc-q">${item.q}</p><p class="mc-a">"${item.a}"</p>`;
    container.appendChild(el);
  });
  startDailyTimer();
}

const sofiaAnswers = [
  { q: 'What\'s something small that brings you joy?',          a: '"The smell of coffee at 7am and the way light filters through curtains."' },
  { q: 'Describe your perfect Sunday morning.',                  a: '"Walking to the market before it gets busy, fresh bread, and zero plans for the afternoon."' },
  { q: 'What\'s your favourite time of day?',                    a: '"That half hour just before sunset when Barcelona turns honey-gold. I stop whatever I\'m doing."' },
  { q: 'What makes you feel most alive?',                        a: '"Dancing on a rooftop with people I\'ve just met. The city below, music above."' },
  { q: 'What would you do with a completely free day?',          a: '"Take the train somewhere I\'ve never been. Just sit, watch, and write."' },
  { q: 'What\'s a place that feels like home even if it isn\'t?', a: '"Any port city at dawn. Salt in the air, sailors coming in, the world waking up."' },
];

function initUserProfileScreen() {
  const container = document.getElementById('user-answers');
  if (!container) return;
  container.innerHTML = '';
  sofiaAnswers.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ua-card';
    el.innerHTML = `<p class="ua-q">${item.q}</p><p class="ua-a">${item.a}</p>`;
    container.appendChild(el);
  });
}

// ── Daily Timer ───────────────────────────────────────────────
let timerInterval = null;
function startDailyTimer() {
  clearInterval(timerInterval);
  const el = document.getElementById('daily-timer');
  if (!el) return;

  let seconds = 18 * 3600 + 32 * 60;
  function tick() {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    el.textContent = `Resets in ${pad(h)}:${pad(m)}:${pad(s)}`;
    if (seconds > 0) seconds--;
  }
  tick();
  timerInterval = setInterval(tick, 1000);
}
function pad(n) { return String(n).padStart(2, '0'); }

// ── Chat ──────────────────────────────────────────────────────
function sendMsg() {
  const input = document.getElementById('chat-input');
  const msgs  = document.getElementById('chat-msgs');
  const text  = input.value.trim();
  if (!text) return;

  const row = document.createElement('div');
  row.className = 'chat-row me';
  row.innerHTML = `<div class="msg-bbl">${escHtml(text)}</div>`;
  msgs.appendChild(row);
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  // Simulate a reply after a pause
  setTimeout(() => {
    const replies = [
      'That\'s such a lovely way to put it 🌿',
      'I feel exactly the same! Tell me more.',
      'Wow, I\'d never thought about it like that.',
      'Ha, I could have written that myself ☕',
      'You\'re going to make me start answering more questions!',
    ];
    const reply = document.createElement('div');
    reply.className = 'chat-row them';
    reply.innerHTML = `
      <img src="https://i.pravatar.cc/30?img=5" class="msg-av" alt="Sofia">
      <div class="msg-bbl">${replies[Math.floor(Math.random() * replies.length)]}</div>`;
    msgs.appendChild(reply);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1400 + Math.random() * 1000);
}

// Also send on Enter key
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
});

// ── Premium Modal ─────────────────────────────────────────────
const premData = {
  deep: {
    icon: '🌙', title: 'Deep Thoughts', price: '$4.99',
    desc: 'Explore questions about meaning, consciousness, and what truly matters. 30 carefully crafted questions to reveal a deeper side of yourself — and attract deeper matches.',
    qs: ['"What do you think happens after we die?"', '"When did you last feel truly free?"', '"What\'s the most important lesson loss has taught you?"'],
  },
  adventure: {
    icon: '🌿', title: 'Adventurer\'s Soul', price: '$4.99',
    desc: 'Questions about travel, risk, discovery, and the places that shaped you. Perfect for finding people who love to explore.',
    qs: ['"Which place changed how you see the world?"', '"What\'s the wildest decision you\'ve ever made?"', '"Where do you most want to go before you die?"'],
  },
  creative: {
    icon: '✨', title: 'Creative Mind', price: '$4.99',
    desc: 'Questions about art, imagination, and how you see and make things. For the makers, the dreamers, and the ones who colour outside the lines.',
    qs: ['"If your life were a film, what genre would it be?"', '"What would you create if you knew no one would judge it?"', '"Which artist\'s mind would you borrow for a day?"'],
  },
  philosophy: {
    icon: '🔮', title: 'Life Philosophy', price: '$4.99',
    desc: 'Questions about values, purpose, and the wisdom hard-won from living. The deck for finding people who think deeply.',
    qs: ['"What belief have you completely changed your mind on?"', '"What would you tell your 16-year-old self?"', '"What does a life well-lived look like to you?"'],
  },
  bundle: {
    icon: '👑', title: 'All Premium Decks', price: '$12.99/yr',
    desc: 'Unlock all four premium decks and access every dimension of connection. The most complete profile, the richest matches.',
    qs: ['"Deep Thoughts — 30 questions"', '"Adventurer\'s Soul — 30 questions"', '"Creative Mind — 30 questions"', '"Life Philosophy — 30 questions"'],
  },
};

function openPremModal(key) {
  const d = premData[key] || premData.deep;
  setEl('pm-icon', d.icon);
  setEl('pm-title', d.title);
  setEl('pm-desc', d.desc);
  setEl('pm-unlock-btn', `Unlock for ${d.price}`);
  const list = document.getElementById('pm-qlist');
  list.innerHTML = d.qs.map(q => `<div class="pm-qi">${q}</div>`).join('');
  document.getElementById('prem-modal').classList.remove('hidden');
}

function closePremModal() {
  document.getElementById('prem-modal').classList.add('hidden');
}

// Close modal on backdrop click
document.getElementById('prem-modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closePremModal();
});

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.getElementById('sonder-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sonder-toast';
    toast.style.cssText = `
      position:absolute; bottom:90px; left:50%; transform:translateX(-50%);
      background:rgba(61,43,31,0.9); color:#FDF6EE;
      padding:10px 20px; border-radius:24px;
      font-size:13px; white-space:nowrap;
      z-index:9999; pointer-events:none;
      transition: opacity 0.3s;
    `;
    document.getElementById('app').appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

// ── Utilities ─────────────────────────────────────────────────
function mod(n, m) { return ((n % m) + m) % m; }
function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function hideHint() {
  if (hintShown) return;
  hintShown = true;
  const hint = document.getElementById('swipe-hint');
  if (hint) { hint.style.opacity = '0'; setTimeout(() => hint.classList.add('hidden-hint'), 1000); }
}

// ── Init ──────────────────────────────────────────────────────
(function init() {
  // Activate first slide on onboarding
  goToSlide(0);

  // Set default auth mode
  setAuthMode('signup');

  // Show splash
  showScreen('screen-splash');
})();
