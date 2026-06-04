const chapters = [
  {
    title: 'Bootcamp',
    desc: 'Understand the rules, capital, risk, and game loop.',
    content: [
      'Options are affected by price, time, volatility, and expiry.',
      'Your score rewards process quality, not random profit.',
      'Use the labs below every chapter: Market Replay, Payoff Graph, Strategy Builder, Expiry Simulator, Mentor.'
    ],
    sim: 'Risk rule: Capital ₹10,00,000. Risk 2% max = ₹20,000. If max loss is larger, reduce size.',
    mission: 'Write one trading rule you will never break.'
  },
  {
    title: 'Calls & Puts',
    desc: 'Direction, rights, premium, breakeven, buyer/seller logic.',
    content: [
      'Call = upside instrument. Put = downside instrument.',
      'Buyer pays premium and needs movement. Seller receives premium and carries obligation.',
      'Correct direction can still lose if move does not cross breakeven.'
    ],
    sim: 'NIFTY 25,000. 25,000 CE ₹100. Breakeven 25,100. Close 25,060 = direction right, trade still loses ₹40.',
    mission: 'Choose Call, Put, or Avoid for bullish, bearish, and unclear scenarios.'
  },
  {
    title: 'Moneyness',
    desc: 'ATM, ITM, OTM and strike selection.',
    content: [
      'For calls: ITM strike is below spot, OTM is above spot.',
      'For puts: ITM strike is above spot, OTM is below spot.',
      'ATM usually has high time value and active Greeks.'
    ],
    sim: 'Spot 25,000 → 24,800 CE ITM, 25,000 CE ATM, 25,300 CE OTM. For puts, reverse the logic.',
    mission: 'Classify 6 strikes and pick conservative/balanced/aggressive strikes.'
  },
  {
    title: 'Premium Engine',
    desc: 'Intrinsic value, time value, breakeven, lot size.',
    content: [
      'Premium = intrinsic value + time value.',
      'Long call breakeven = strike + premium. Long put breakeven = strike - premium.',
      'Lot size turns points into rupees.'
    ],
    sim: '24,800 CE at ₹260, spot 25,000 → intrinsic ₹200, time value ₹60, breakeven 25,060.',
    mission: 'Calculate intrinsic, time value, breakeven, and lot cost.'
  },
  {
    title: 'Option Chain',
    desc: 'OI, volume, bid/ask, liquidity, support/resistance.',
    content: [
      'Volume is today activity. OI is open contracts.',
      'High CE OI can indicate resistance; high PE OI can indicate support.',
      'Wide bid/ask spread means slippage risk.'
    ],
    sim: '25,500 CE highest OI = resistance clue. 24,500 PE highest OI = support clue. Low volume + wide spread = avoid.',
    mission: 'Find liquid strikes, avoid-zone, support, and resistance.'
  },
  {
    title: 'IV & Vega',
    desc: 'IV expansion, IV crush, event premium, vega.',
    content: [
      'High IV makes options expensive.',
      'After events, IV crush can damage long options.',
      'Vega is sensitivity to IV changes.'
    ],
    sim: 'Before event CE ₹220. Event passes, spot +80, CE ₹150. Direction right but IV crush still hurts.',
    mission: 'Decide if pre-event buying is worth the priced-in move.'
  },
  {
    title: 'Greeks Lab',
    desc: 'Delta, Gamma, Theta, Vega and portfolio risk.',
    content: [
      'Delta is directional speed.',
      'Gamma changes delta, especially near expiry.',
      'Theta is time decay. Vega is volatility sensitivity.'
    ],
    sim: 'Underlying +100 → delta .20 option +20, delta .50 option +50, delta .90 option +90. Near expiry, gamma can change these quickly.',
    mission: 'Match each Greek to a real trade risk.'
  },
  {
    title: 'Payoff Graph Arena',
    desc: 'See max profit, max loss, breakeven, and risk zones.',
    content: [
      'Payoff graphs prevent blind trades.',
      'Long options have limited loss. Short premium strategies need defined risk.',
      'Before entry, know max loss and adjustment plan.'
    ],
    sim: 'Long call: limited premium loss, upside after breakeven. Iron condor: profit in range, defined loss outside wings.',
    mission: 'Use the payoff graph below and explain the risk shape.'
  },
  {
    title: 'Iron Condor',
    desc: 'Range-bound defined-risk theta strategy.',
    content: [
      'Iron Condor sells OTM call spread and OTM put spread.',
      'Works best in range, stable/falling IV, and controlled event risk.',
      'Risk = wing width - credit.'
    ],
    sim: 'Sell 25,500 CE, buy 25,800 CE; sell 24,500 PE, buy 24,200 PE. Credit 80, width 300, max loss 220.',
    mission: 'Build a condor and define adjustment zones.'
  },
  {
    title: 'Calendar & DC',
    desc: 'Calendar, Double Calendar, stretched/skew/diagonal variations.',
    content: [
      'Calendar sells near expiry and buys far expiry.',
      'Double Calendar creates a wider tent using call and put calendars.',
      'Stretched/Skew/Diagonal add width or directional bias.'
    ],
    sim: 'Front sold 90 → 30, back bought 160 → 145. Net improves if spot stays near tent and IV behaves.',
    mission: 'Choose DC, stretched DC, skew DC, diagonal, IC, or avoid.'
  },
  {
    title: 'Expiry Simulator',
    desc: 'Gamma spikes, theta collapse, panic adjustments.',
    content: [
      'Near expiry, gamma risk becomes intense.',
      'Theta can collapse option premium quickly.',
      'Short gamma positions need fast risk control.'
    ],
    sim: 'Spot 25000 → 25040 → 24980 → 25090. Delta .50 → .76 → .28 → .91. P&L swings fast.',
    mission: 'Survive three whipsaws: hold, hedge, reduce, or exit.'
  },
  {
    title: 'Final Boss',
    desc: 'Combine regime, option chain, IV, Greeks, strategy, and risk.',
    content: [
      'No strategy is always best.',
      'Market regime chooses the candidate. Risk decides position size.',
      'Avoiding unclear conditions is a valid win.'
    ],
    sim: 'Range + high IV + no event = IC candidate. Range + IV stable/rising = DC candidate. Wide range = stretched DC. Event tomorrow = avoid/reduce.',
    mission: 'Write a final trade plan: setup, strategy, max loss, adjustment, exit.'
  }
];

const $ = id => document.getElementById(id);

function loadState() {
  try {
    return JSON.parse(localStorage.getItem('ovw_game_v3') || 'null');
  } catch (e) {
    return null;
  }
}

let state = loadState() || {
  chapter: 0,
  xp: 0,
  capital: 1000000,
  badges: [],
  completed: {},
  journal: [],
  market: { spot: 25000, iv: 18, day: 0, regime: 'range' },
  strategy: 'longCall'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function money(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

function save() {
  try {
    localStorage.setItem('ovw_game_v3', JSON.stringify(state));
  } catch (e) {
    // Storage quota exceeded or unavailable (e.g., private browsing)
  }
  renderStats();
}

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;left:50%;bottom:86px;transform:translateX(-50%);background:#111b36;border:1px solid rgba(255,255,255,.15);padding:10px 14px;border-radius:999px;z-index:50';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1600);
}

function renderStats() {
  $('capital').textContent = money(state.capital);
  $('xp').textContent = state.xp;
  $('badgeCount').textContent = state.badges.length;
  $('rank').textContent =
    state.xp > 2500 ? 'Volatility Master' :
    state.xp > 1500 ? 'Strategy Captain' :
    state.xp > 800  ? 'Greek Explorer' :
    state.xp > 300  ? 'Market Learner' :
    'Retail Rookie';
  const pct = Math.round(Object.keys(state.completed).length / chapters.length * 100);
  $('progressBar').style.width = pct + '%';
  $('progressText').textContent = pct + '% completed';
}

function renderNav() {
  $('nav').innerHTML = chapters.map((c, i) =>
    `<button class='${i === state.chapter ? 'active' : ''}' onclick='gotoChapter(${i})' type='button'>${i + 1}. ${c.title}</button>`
  ).join('');
}

window.gotoChapter = i => {
  state.chapter = i;
  save();
  renderGame();
};

// Simplified Black-Scholes approximation for educational display.
// 0.42 is an empirical scaling factor tuned for NIFTY IV context.
// The m*8 term reduces time value for deep ITM/OTM strikes.
function optionPrice(type, spot = state.market.spot, strike = 25000, days = 7, iv = state.market.iv) {
  const intrinsic = type === 'call'
    ? Math.max(0, spot - strike)
    : Math.max(0, strike - spot);
  const time = Math.max(5, (iv / 100) * spot * Math.sqrt(Math.max(days, 1) / 365) * 0.42);
  const m = Math.abs(spot - strike) / 100;
  return Math.round(intrinsic + Math.max(0, time - m * 8));
}

// Payoff at expiry for each strategy. Premiums are fixed illustrative values.
function payoff(strategy, spot) {
  const k = 25000;
  if (strategy === 'longCall')   return Math.max(0, spot - k) - 120;
  if (strategy === 'longPut')    return Math.max(0, k - spot) - 110;
  if (strategy === 'bullSpread') return Math.min(Math.max(spot - k, 0), 300) - 80;
  if (strategy === 'ironCondor') {
    const credit   = 80;
    const lossCall = Math.min(Math.max(spot - 25500, 0), 300);
    const lossPut  = Math.min(Math.max(24500 - spot, 0), 300);
    return credit - lossCall - lossPut;
  }
  if (strategy === 'calendar') {
    return Math.round(
      170
      - Math.abs(spot - 25000) * 0.35
      - Math.max(0, state.market.day * 8)
      + (state.market.iv - 18) * 5
    );
  }
  return 0;
}

function drawPayoff() {
  const cv = $('payoffCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  cv.width = cv.clientWidth;
  cv.height = Math.max(220, cv.clientHeight || 240);
  ctx.clearRect(0, 0, cv.width, cv.height);

  ctx.strokeStyle = 'rgba(255,255,255,.25)';
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(cv.width, 120);
  ctx.stroke();

  ctx.strokeStyle = '#65f0c5';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < cv.width; i++) {
    const spot = 24000 + (i / cv.width) * 2000;
    const y = 120 - payoff(state.strategy, spot) * 0.35;
    if (i === 0) ctx.moveTo(i, y);
    else ctx.lineTo(i, y);
  }
  ctx.stroke();

  ctx.fillStyle = '#fff';
  ctx.font = '13px system-ui';
  ctx.fillText(`Strategy: ${state.strategy} | Spot: ${state.market.spot} | IV: ${state.market.iv}%`, 12, 22);

  const x = (state.market.spot - 24000) / 2000 * cv.width;
  ctx.strokeStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, cv.height);
  ctx.stroke();
}

function marketStep() {
  const regimes = {
    range:   [-60, -30,  20,  45, -25,  35],
    trend:   [ 60,  80, -20, 100,  50, -10],
    choppy:  [120, -160,  90, -110, 150, -80],
    event:   [-220, 260, -120, 180,  40, -90]
  };
  const arr = regimes[state.market.regime] || regimes.range;
  const move = arr[state.market.day % arr.length];
  state.market.spot += move;
  state.market.day++;

  if (state.market.regime === 'event')       state.market.iv += state.market.day % 2 ? 4 : -6;
  else if (state.market.regime === 'range')  state.market.iv = Math.max(12, state.market.iv - 1);
  else if (state.market.regime === 'choppy') state.market.iv += 1;

  state.xp += 10;
  save();
  renderLabs();
}

function resetMarket() {
  state.market = { spot: 25000, iv: 18, day: 0, regime: $('regimeSel')?.value || 'range' };
  save();
  renderLabs();
}

function mentorHint() {
  const m = state.market;
  let hint = '';
  if (m.regime === 'event')                   hint = 'Mentor: Event regime. Reduce size, avoid naked short gamma, expect IV shock.';
  else if (m.regime === 'range' && m.iv > 17) hint = 'Mentor: Range + decent IV. Iron Condor candidate, but check event risk and wings.';
  else if (m.regime === 'range')              hint = 'Mentor: Range + lower IV. Calendar/DC may be better than short vol if IV can hold.';
  else if (m.regime === 'trend')              hint = 'Mentor: Trending regime. Avoid neutral tents unless stretched/skewed; consider directional spreads.';
  else                                        hint = 'Mentor: Choppy market. Whipsaw risk; reduce size and avoid over-adjusting.';
  $('mentorBox').textContent = hint;
  state.xp += 15;
  save();
}

function buildStrategy() {
  const s = $('strategySel').value;
  state.strategy = s;
  const p = payoff(s, state.market.spot);
  const riskNote = s === 'ironCondor' ? 'Defined risk, short gamma'
    : s === 'calendar' ? 'Tent risk + vega exposure'
    : 'Directional premium risk';
  $('strategyBox').textContent =
    `Selected ${s}\nCurrent theoretical expiry P&L at spot ${state.market.spot}: ${Math.round(p)} points\n` +
    `Call price ${optionPrice('call')} | Put price ${optionPrice('put')}\nRisk note: ${riskNote}`;
  state.xp += 20;
  save();
  drawPayoff();
}

function expiryShock(action) {
  const scoreMap = { hold: -120, hedge: 60, reduce: 90, exit: 70 };
  const score = scoreMap[action] || 0;
  state.capital += score * 100;
  state.xp += Math.max(10, score > 0 ? 50 : 10);
  $('expiryBox').textContent =
    `Expiry whipsaw: Spot ${state.market.spot} → ${state.market.spot + 140} → ${state.market.spot - 90}\n` +
    `Action: ${action}\nResult: ${score > 0 ? 'Good risk control' : 'High damage from gamma'} (${money(score * 100)})`;
  save();
}

function renderLabs() {
  const lab = $('labs');
  if (!lab) return;
  lab.innerHTML = `
    <h3>🧪 Gameplay Labs</h3>
    <div class='grid'>
      <div class='box'>
        <b>Market Replay Engine</b>
        <p>Regime creates spot and IV movement.</p>
        <select id='regimeSel' aria-label='Select market regime'>
          <option value='range'>Range</option>
          <option value='trend'>Trend</option>
          <option value='choppy'>Choppy</option>
          <option value='event'>Event Shock</option>
        </select>
        <div class='actionGroup'>
          <button class='btn' onclick='resetMarket()' type='button'>Set Regime</button>
          <button class='btn good' onclick='marketStep()' type='button'>Next Candle</button>
        </div>
        <div class='terminal' aria-live='polite'>Day ${state.market.day}
Spot ${state.market.spot}
IV ${state.market.iv}%
Regime ${state.market.regime}</div>
      </div>
      <div class='box'>
        <b>Strategy Builder</b>
        <p>Select a strategy and see risk.</p>
        <select id='strategySel' aria-label='Select trading strategy'>
          <option value='longCall'>Long Call</option>
          <option value='longPut'>Long Put</option>
          <option value='bullSpread'>Bull Call Spread</option>
          <option value='ironCondor'>Iron Condor</option>
          <option value='calendar'>Calendar / DC</option>
        </select>
        <div class='actionGroup'>
          <button class='btn' onclick='buildStrategy()' type='button'>Build</button>
        </div>
        <div class='terminal' id='strategyBox' aria-live='polite'>Choose a strategy.</div>
      </div>
      <div class='box'>
        <b>Expiry Day Simulator</b>
        <p>Respond to gamma whipsaw.</p>
        <div class='actionGroup'>
          <button class='btn secondary' onclick="expiryShock('hold')"   type='button' aria-label='Hold the position'>Hold</button>
          <button class='btn secondary' onclick="expiryShock('hedge')"  type='button' aria-label='Hedge the position'>Hedge</button>
          <button class='btn secondary' onclick="expiryShock('reduce')" type='button' aria-label='Reduce position size'>Reduce</button>
          <button class='btn secondary' onclick="expiryShock('exit')"   type='button' aria-label='Exit the position'>Exit</button>
        </div>
        <div class='terminal' id='expiryBox' aria-live='polite'>Choose action.</div>
      </div>
      <div class='box'>
        <b>AI Mentor Hint</b>
        <p>Get regime-based guidance.</p>
        <div class='actionGroup'>
          <button class='btn warn' onclick='mentorHint()' type='button' aria-label='Ask mentor for guidance'>Ask Mentor</button>
        </div>
        <div class='terminal' id='mentorBox' aria-live='polite'>Mentor waiting.</div>
      </div>
    </div>
    <h3>📈 Interactive Payoff Graph</h3>
    <canvas id='payoffCanvas' role='img' aria-label='Strategy payoff graph showing profit and loss across spot prices'
      style='width:100%;height:240px;background:#071024;border:1px solid rgba(255,255,255,.15);border-radius:18px'></canvas>`;

  const rs = $('regimeSel');
  if (rs) rs.value = state.market.regime;
  const ss = $('strategySel');
  if (ss) ss.value = state.strategy;
  setTimeout(drawPayoff, 30);
}

function renderGame() {
  renderNav();
  const c = chapters[state.chapter];
  $('game').innerHTML = `
    <div class='sectionTitle'>
      <h2>${state.chapter + 1}. ${c.title}</h2>
      <div>
        <span class='tag'>Mission</span>
        <span class='tag'>Simulation</span>
        <span class='tag'>Labs</span>
        <span class='tag'>Journal</span>
      </div>
    </div>
    <p>${c.desc}</p>
    <h3>📘 Field Manual</h3>
    <div class='grid'>${c.content.map(x => `<div class='box'>${x}</div>`).join('')}</div>
    <h3>🎛️ Chapter Simulation</h3>
    <div class='terminal'>${c.sim}</div>
    <h3>🎯 Mission</h3>
    <div class='scenario'>${c.mission}</div>
    <div class='inputRow'>
      <input id='answerBox' placeholder='Write your trade note or answer...'
        aria-label='Trade note input' maxlength='2000' />
      <button class='btn good' onclick='submitAnswer()' type='button'>Submit Note</button>
    </div>
    <div id='feedback' aria-live='polite'></div>
    <div id='labs'></div>
    <hr style='border-color:rgba(255,255,255,.08);margin:18px 0'>
    <div class='actionGroup'>
      <button class='btn' onclick='completeChapter()' type='button'>Mark Chapter Complete</button>
      <button class='btn secondary' onclick='showJournal()' type='button'>Show Journal</button>
    </div>
    <div id='journalBox'></div>`;
  renderLabs();
}

window.submitAnswer = function () {
  const v = $('answerBox').value.trim();
  if (v.length < 15) {
    $('feedback').innerHTML = '<div class="result">Write a longer answer.</div>';
    return;
  }
  state.journal.push({
    chapter:  chapters[state.chapter].title,
    note:     v,
    spot:     state.market.spot,
    iv:       state.market.iv,
    strategy: state.strategy,
    date:     new Date().toLocaleString()
  });
  state.xp += 35;
  state.capital += 2000;
  save();
  $('feedback').innerHTML = '<div class="result">✅ Trade note saved. XP awarded.</div>';
};

window.showJournal = function () {
  const entries = state.journal.slice(-8).reverse();
  $('journalBox').innerHTML = '<h3>📓 Recent Trade Journal</h3>' + (
    !entries.length
      ? '<p>No notes yet.</p>'
      : entries.map(x =>
          `<div class='result'>
            <b>${escapeHtml(x.chapter)}</b>
            <p>${escapeHtml(x.note)}</p>
            <p class='mini'>Spot ${x.spot}, IV ${x.iv}%, Strategy ${escapeHtml(x.strategy)}, ${escapeHtml(x.date)}</p>
          </div>`
        ).join('')
  );
};

window.completeChapter = function () {
  state.completed[state.chapter] = true;
  state.xp += 150;
  state.capital += 15000;
  if (!state.badges.includes(chapters[state.chapter].title)) {
    state.badges.push(chapters[state.chapter].title);
  }
  save();
  toast('Chapter completed');
  renderGame();
};

window.addEventListener('load', () => {
  renderStats();
  renderGame();
  $('startBtn').onclick = () => renderGame();
  $('tourBtn').onclick  = () => window.scrollTo({ top: $('nav').offsetTop, behavior: 'smooth' });
  $('resetBtn').onclick = () => { localStorage.removeItem('ovw_game_v3'); location.reload(); };
  $('prevBtn').onclick  = () => { state.chapter = Math.max(0, state.chapter - 1); save(); renderGame(); };
  $('nextBtn').onclick  = () => { state.chapter = Math.min(chapters.length - 1, state.chapter + 1); save(); renderGame(); };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => { $('offlineStatus').textContent = 'Offline support active'; })
      .catch(() => { $('offlineStatus').textContent = 'Offline support unavailable'; });
  } else {
    $('offlineStatus').textContent = 'PWA not supported';
  }
});
