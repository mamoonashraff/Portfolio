// Hybrid AI Portfolio Assistant for Mamoon Ashraf
// Mode 1: Live Gemini API via Vercel Serverless Function (/api/chat)
// Mode 2: Smart Built-in Portfolio AI Fallback (100% Free, works on GitHub Pages & offline/static)

function initPortfolioAssistant() {
  const launcher = document.getElementById('ai-chat-launcher');
  const widget = document.getElementById('ai-chat-widget');
  const closeBtn = document.getElementById('ai-chat-close');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const messagesEl = document.getElementById('ai-chat-messages');
  const modeBadge = document.getElementById('ai-mode-badge');
  const quickBtns = document.querySelectorAll('.ai-quick-chip');

  if (!launcher || !widget || !form || !input || !messagesEl) return;

  const chatHistory = [];
  let apiUnavailable = false;
  let isWaiting = false;

  function toggleChat(forceOpen) {
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !widget.classList.contains('open');
    widget.classList.toggle('open', shouldOpen);
    launcher.classList.toggle('active', shouldOpen);
    if (shouldOpen) {
      setTimeout(() => input.focus(), 200);
    }
  }

  launcher.addEventListener('click', () => toggleChat());
  if (closeBtn) closeBtn.addEventListener('click', () => toggleChat(false));

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatReplyHtml(text) {
    let safe = escapeHtml(text);
    // Bold **text**
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Auto-link URLs
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    // Newlines
    safe = safe.replace(/\n/g, '<br>');
    return safe;
  }

  function appendMessage(role, content, isHtml = false) {
    const bubble = document.createElement('div');
    bubble.className = `ai-msg ai-msg-${role}`;
    if (isHtml) {
      bubble.innerHTML = content;
    } else {
      bubble.innerHTML = formatReplyHtml(content);
    }
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'ai-msg ai-msg-bot ai-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  // Built-in Smart Portfolio AI Knowledge Engine
  function generateLocalSmartReply(query) {
    const q = query.toLowerCase().trim();
    const d = typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : null;

    if (/^(hi|hello|hey|salam|assalam|aoa|yo)\b/.test(q)) {
      return `Assalam-o-Alaikum! 👋 Main **Mamoon AI** hoon. Aap mujh se Mamoon Ashraf ke **Projects**, **Google & Cisco Certifications**, **Skills**, **IST Education**, ya **Contact / WhatsApp** ke baare mein kuch bhi pooch sakte hain!`;
    }

    if (/(cert|google|coursera|cisco|ccna|cyberops|course|badge)/.test(q)) {
      const completed = d ? d.certifications.filter(c => c.status === 'Completed') : [];
      const list = completed.map(c => `• **${c.title}** (${c.org}, ${c.date})`).join('\n');
      return `Mamoon ke paas **4 Verified Google Career Certificates (Coursera)** hain:\n${list}\n\nSaath hi woh **Cisco CCNA** aur **Cisco CyberOps Associate** pursue kar rahe hain. Aap **Certifications** section mein har certificate ka PDF dekh sakte hain aur Coursera par verify kar sakte hain!`;
    }

    if (/(project|work|nexus|sales|barakah|zelda|rpg|hackathon|github)/.test(q)) {
      return `Mamoon ke **3 Featured Projects** hain:\n• **Nexus Sales AI** 🏆 — AgentHack 2024 ka 5-agent autonomous SDR swarm (Scout, Strategist, Copywriter, Negotiator, Closer) with RAG.\n• **Barakah Scents** — Luxury fragrance e-commerce website (Live: https://mamoonashraff.github.io/Barakah-Scents-Website-Project/ )\n• **Zelda RPG Game Engine** — Object-Oriented 2D RPG game in C++/Python ( https://github.com/mamoonashraff/ZeldaRPG )`;
    }

    if (/(skill|tech|python|c\+\+|linux|sql|javascript|security|cyber|hack|network)/.test(q)) {
      return `Mamoon ka core focus **Cybersecurity, Network Defense & AI Engineering** hai:\n• **Languages**: Python, C++, SQL (MySQL), JavaScript, Linux & Bash, HTML5/CSS3\n• **Security & Networking**: Ethical Hacking, Network Security, Cisco CCNA & CyberOps, Packet Tracer, Vulnerability Analysis\n• **AI & Dev**: Multi-Agent AI Swarms, RAG Pipelines, Git & GitHub`;
    }

    if (/(edu|ist|uni|university|semester|degree|bscs|study|coursework|karak)/.test(q)) {
      return `Mamoon **Institute of Space Technology (IST), Islamabad** mein **BS Computer Science (3rd Semester)** ke student hain (hometown: **Karak, KPK**).\n\n**3rd Semester Coursework**: Data Structures, Computer Networks, Information Security, Software Engineering, Probability & Statistics, aur Multivariable Calculus.`;
    }

    if (/(whatsapp|phone|number|call|chat|dm)/.test(q)) {
      return `Aap Mamoon ko directly **WhatsApp** par message kar sakte hain:\n📱 **+92 335 9764831**\n💬 Direct Chat: https://wa.me/923359764831`;
    }

    if (/(contact|email|mail|hire|intern|collab|reach|linkedin|insta)/.test(q)) {
      return `Mamoon **Cybersecurity internships, network security, aur tech collaborations** ke liye available hain!\n• ✉️ **Email**: mamoonashraf831@gmail.com\n• 💬 **WhatsApp**: https://wa.me/923359764831\n• 💼 **LinkedIn**: https://www.linkedin.com/in/mamoon-ashraff\n• 🐙 **GitHub**: https://github.com/mamoonashraff`;
    }

    if (/(who|about|mamoon|intro|introduce|batao)/.test(q)) {
      return `**Mamoon Ashraf** ek passionate **3rd Semester BSCS student** hain at **Institute of Space Technology (IST), Islamabad** (from Karak, KPK). Woh **Google Certified** (Cybersecurity & AI) hain, **Cisco CCNA & CyberOps** pursue kar rahe hain, aur **Nexus Sales AI** (AgentHack 2024) ke builder hain!`;
    }

    return `Thanks for asking! Main Mamoon Ashraf ke portfolio ke baare mein help kar sakta hoon:\n• 🛡️ **Certifications**: 4 Verified Google Certificates + Cisco CCNA & CyberOps\n• 🚀 **Projects**: Nexus Sales AI, Barakah Scents, Zelda RPG\n• 🎓 **Education**: 3rd Semester BSCS @ IST Islamabad\n• 💬 **Direct Contact**: mamoonashraf831@gmail.com | WhatsApp: https://wa.me/923359764831`;
  }

  async function askAssistant(userText) {
    if (!userText || isWaiting) return;
    isWaiting = true;

    appendMessage('user', userText);
    chatHistory.push({ role: 'user', text: userText });

    const typingNode = showTypingIndicator();
    let reply = null;

    // Try Vercel Gemini Serverless Function first (unless already known unavailable on static hosting)
    if (!apiUnavailable && window.location.protocol.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            history: chatHistory.slice(-6)
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            reply = data.reply;
            if (modeBadge) {
              modeBadge.innerHTML = '<i class="fas fa-sparkles"></i> Gemini Live';
            }
          }
        } else if (res.status === 404 || res.status === 405 || res.status === 503) {
          apiUnavailable = true;
        }
      } catch (err) {
        apiUnavailable = true;
      }
    }

    // Fallback to Built-in Smart Portfolio AI
    if (!reply) {
      await new Promise((r) => setTimeout(r, 420));
      reply = generateLocalSmartReply(userText);
      if (modeBadge) {
        modeBadge.innerHTML = '<i class="fas fa-bolt"></i> Smart AI';
      }
    }

    typingNode.remove();
    appendMessage('bot', reply);
    chatHistory.push({ role: 'model', text: reply });
    isWaiting = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    askAssistant(text);
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-prompt');
      if (q) askAssistant(q);
    });
  });
}
