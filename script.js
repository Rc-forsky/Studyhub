// Frontend logic: tabs, tool requests and chatbot. All AI calls go through /api/chat.
const $ = (id) => document.getElementById(id);
let mode = 'explain';
const history = []; // chat memory sent with each chatbot request

const labels = {
  explain: ['Enter a topic', 'Explain'],
  summarize: ['Paste your notes', 'Summarise'],
  quiz: ['Enter a topic or paste notes', 'Generate quiz'],
};

// Calls the backend; returns {reply} or throws an Error with a friendly message.
async function ask(payload) {
  const r = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data.reply;
}

// Tabs
document.querySelectorAll('#tabs button').forEach((b) => {
  b.onclick = () => {
    mode = b.dataset.tab;
    document.querySelectorAll('#tabs button').forEach((x) => x.classList.toggle('active', x === b));
    $('label').textContent = labels[mode][0];
    $('go').textContent = labels[mode][1];
    $('level').style.display = mode === 'explain' ? '' : 'none';
    $('out').textContent = '';
  };
});

// Explain / Summarise / Quiz
$('go').onclick = async () => {
  const text = $('input').value.trim();
  const out = $('out');
  out.className = 'out';
  if (text.length < 3) { out.className = 'out err'; out.textContent = 'Please enter at least 3 characters.'; return; }
  $('go').disabled = true;
  out.textContent = 'Thinking…';
  try {
    out.textContent = await ask({ mode, text, level: $('level').value });
  } catch (e) {
    out.className = 'out err';
    out.textContent = e.message;
  }
  $('go').disabled = false;
};

// Chatbot
function addBubble(role, text) {
  const d = document.createElement('div');
  d.className = 'bubble ' + (role === 'user' ? 'user' : 'bot');
  d.textContent = text;
  $('chat').appendChild(d);
  $('chat').scrollTop = $('chat').scrollHeight;
  return d;
}
addBubble('bot', 'Hi! I\'m StudyBuddy. Ask me anything about your studies.');

async function send() {
  const text = $('msg').value.trim();
  if (!text) return;
  $('msg').value = '';
  addBubble('user', text);
  const wait = addBubble('bot', '…');
  $('send').disabled = true;
  try {
    const reply = await ask({ mode: 'chat', text, history });
    wait.textContent = reply;
    history.push({ role: 'user', content: text }, { role: 'assistant', content: reply });
  } catch (e) {
    wait.textContent = '⚠️ ' + e.message;
  }
  $('send').disabled = false;
}
$('send').onclick = send;
$('msg').onkeydown = (e) => { if (e.key === 'Enter') send(); };
