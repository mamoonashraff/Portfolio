// Hybrid English-Only AI Portfolio Assistant for Mamoon Ashraf
// Mode 1: Live Gemini API via Vercel Serverless Function (/api/chat)
// Mode 2: Smart Context-Aware Built-in Portfolio AI (100% Free, works on GitHub Pages & static hosting)

function initPortfolioAssistant() {
  const launcher = document.getElementById('ai-chat-launcher');
  const widget = document.getElementById('ai-chat-widget');
  const closeBtn = document.getElementById('ai-chat-close');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const messagesEl = document.getElementById('ai-chat-messages');
  const chipsContainer = document.getElementById('ai-quick-chips');
  const modeBadge = document.getElementById('ai-mode-badge');

  if (!launcher || !widget || !form || !input || !messagesEl || !chipsContainer) return;

  const chatHistory = [];
  let apiUnavailable = false;
  let isWaiting = false;

  const INITIAL_SUGGESTIONS = [
    "Who is Mamoon Ashraf?",
    "Show his projects",
    "What certifications does he have?",
    "How can I contact him?"
  ];

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
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    safe = safe.replace(/\n/g, '<br>');
    return safe;
  }

  function appendMessage(role, content) {
    const bubble = document.createElement('div');
    bubble.className = `ai-msg ai-msg-${role}`;
    bubble.innerHTML = formatReplyHtml(content);
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

  function renderSuggestions(suggestions, includeWhatsAppAction = false) {
    const items = Array.isArray(suggestions) && suggestions.length > 0
      ? suggestions.slice(0, includeWhatsAppAction ? 3 : 4)
      : INITIAL_SUGGESTIONS;

    chipsContainer.innerHTML = '';

    items.forEach((question) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ai-quick-chip';
      btn.textContent = question;
      btn.addEventListener('click', () => askAssistant(question));
      chipsContainer.appendChild(btn);
    });

    if (includeWhatsAppAction) {
      const waLink = document.createElement('a');
      waLink.href = 'https://wa.me/923359764831';
      waLink.target = '_blank';
      waLink.rel = 'noopener noreferrer';
      waLink.className = 'ai-quick-chip ai-chip-wa';
      waLink.innerHTML = '<i class="fab fa-whatsapp"></i> Chat on WhatsApp';
      chipsContainer.appendChild(waLink);
    }
  }

  // Context-Aware, English-Only Built-in Portfolio AI
  function generateLocalSmartReply(query) {
    const q = query.toLowerCase().trim();

    // 1. Greetings
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|salam|assalam|aoa|yo)\b/.test(q) && q.split(/\s+/).length <= 4) {
      return {
        reply: "Hello! I'm Mamoon's AI Assistant. You can ask me about his projects, Google & Cisco certifications, cybersecurity skills, education at IST, or contact details.",
        suggestions: INITIAL_SUGGESTIONS
      };
    }

    // 2. Specific Project: Nexus Sales AI
    if (/(nexus|sales\s*ai|sdr|swarm|agenthack|5\s*agents?|five\s*agents?|rag)/.test(q)) {
      if (/(5\s*agents?|five\s*agents?|how\s+do|work|personas|architecture)/.test(q)) {
        return {
          reply: "**Nexus Sales AI** orchestrates 5 specialized AI agents:\n• **Scout Agent**: Discovers companies and researches hiring, tech stack, and funding signals.\n• **Strategist Agent**: Scores ICP fit (0–100%) and maps RAG services to pain points.\n• **Copywriter Agent**: Crafts personalized Email & WhatsApp outreach.\n• **Negotiator Agent**: Classifies replies across 8 intents using objection battlecards.\n• **Closer Agent**: Schedules meetings and prepares pre-meeting briefings.",
          suggestions: [
            "What tech stack powers Nexus Sales AI?",
            "Show his other projects",
            "What AI certifications does he have?",
            "How can I contact Mamoon?"
          ]
        };
      }
      return {
        reply: "**Nexus Sales AI** is Mamoon's **AgentHack 2024** hackathon project—an autonomous 5-agent SDR swarm (**Scout, Strategist, Copywriter, Negotiator, Closer**) with RAG knowledge retrieval and an 8-stage lead pipeline.\nRepository: https://github.com/mamoonashraff/nexus-sales-ai",
        suggestions: [
          "How do the 5 agents in Nexus Sales AI work?",
          "Tell me about Barakah Scents",
          "Tell me about Zelda RPG",
          "What are his AI certifications?"
        ]
      };
    }

    // 3. Specific Project: Barakah Scents
    if (/(barakah|scents|fragrance|perfume|ecommerce|e-commerce|store)/.test(q)) {
      return {
        reply: "**Barakah Scents** is a luxury fragrance e-commerce web application developed with **HTML5, CSS3, and JavaScript**, featuring a dark glassmorphism UI, responsive product galleries, and category filters.\n• Live Demo: https://mamoonashraff.github.io/Barakah-Scents-Website-Project/\n• Repository: https://github.com/mamoonashraff/Barakah-Scents-Website-Project",
        suggestions: [
          "Tell me about Nexus Sales AI",
          "Tell me about Zelda RPG",
          "What web skills does Mamoon have?",
          "How can I contact Mamoon?"
        ]
      };
    }

    // 4. Specific Project: Zelda RPG
    if (/(zelda|rpg|game|oop\s*project)/.test(q)) {
      return {
        reply: "**Zelda RPG Game Engine** is an Object-Oriented 2D RPG project built in **C++ / Python** showcasing **Inheritance, Polymorphism, Encapsulation**, modular entity hierarchies (Player, Enemy, NPC, Items), collision detection, and a custom game loop.\nRepository: https://github.com/mamoonashraff/ZeldaRPG",
        suggestions: [
          "Tell me about Nexus Sales AI",
          "Tell me about Barakah Scents",
          "What programming languages does he know?",
          "What is his 3rd semester coursework?"
        ]
      };
    }

    // 5. All Projects Overview
    if (/(project|portfolio|work|built|build|hackathon|apps?)/.test(q)) {
      return {
        reply: "Mamoon has **3 featured projects**:\n• **Nexus Sales AI** (AgentHack 2024) — Autonomous 5-agent SDR swarm with RAG.\n• **Barakah Scents** — Luxury fragrance e-commerce web app hosted on GitHub Pages.\n• **Zelda RPG Game Engine** — Object-Oriented 2D RPG engine in C++/Python.",
        suggestions: [
          "Tell me about Nexus Sales AI",
          "Tell me about Barakah Scents",
          "Tell me about Zelda RPG",
          "What technologies does he use?"
        ]
      };
    }

    // 6. Specific Certifications: Google / Coursera
    if (/(google|coursera|verify|verified|credential|ai\s*fundamentals|foundations\s*of\s*cybersecurity|brainstorming|research)/.test(q)) {
      return {
        reply: "Mamoon holds **4 verified Google Career Certificates** via Coursera:\n• **Foundations of Cybersecurity** (Nov 1, 2026) — https://coursera.org/verify/8QSAPNHWREQL\n• **AI Fundamentals** (Oct 29, 2026) — https://coursera.org/verify/MCN3QW08F9YP\n• **AI for Brainstorming and Planning** (Nov 1, 2026) — https://coursera.org/verify/6ZOJJL58JENR\n• **AI for Research and Insights** (Nov 1, 2026) — https://coursera.org/verify/P2VUQ21YHU8P",
        suggestions: [
          "Tell me about his Cisco CCNA & CyberOps",
          "What are his cybersecurity skills?",
          "Show his AI hackathon project",
          "How can I hire or contact Mamoon?"
        ]
      };
    }

    // 7. Specific Certifications: Cisco CCNA & CyberOps
    if (/(cisco|ccna|cyberops|netacad|packet\s*tracer)/.test(q)) {
      return {
        reply: "Mamoon is actively pursuing two **Cisco Networking Academy** tracks:\n• **Cisco CCNA** — Network fundamentals, IP routing & switching, IP services, security fundamentals, and automation.\n• **Cisco CyberOps Associate** — Security operations, threat monitoring, host & network intrusion analysis, and incident response.",
        suggestions: [
          "Show his verified Google certificates",
          "What are his cybersecurity skills?",
          "What is he studying at IST?",
          "Is he open for internships?"
        ]
      };
    }

    // 8. General Certifications
    if (/(cert|certificate|certification|qualification|credentials?)/.test(q)) {
      return {
        reply: "Mamoon has **4 verified Google Certificates** (Foundations of Cybersecurity, AI Fundamentals, AI for Brainstorming & Planning, AI for Research & Insights) and is actively pursuing **Cisco CCNA** and **Cisco CyberOps Associate**. You can view official PDFs and Coursera verification links in the **Certifications** section.",
        suggestions: [
          "Verify his Google certificates",
          "Tell me about Cisco CCNA & CyberOps",
          "What are his cybersecurity skills?",
          "Show his projects"
        ]
      };
    }

    // 9. Specific Skills: Cybersecurity & Networking
    if (/(cyber|security|ethical\s*hacking|network|linux|pentest|vulnerability)/.test(q)) {
      return {
        reply: "Mamoon is focused on **Cybersecurity & Network Defense**:\n• **Core Areas**: Ethical Hacking, Network Security Architecture, Vulnerability Analysis, Linux & Bash Administration, and Security Operations.\n• **Academic & Certs**: Studying Computer Networks & Information Security at IST, Google Foundations of Cybersecurity certified, and pursuing Cisco CCNA & CyberOps.",
        suggestions: [
          "Show his Google & Cisco certifications",
          "What programming languages does he know?",
          "What is his 3rd semester coursework?",
          "Is he open for cybersecurity internships?"
        ]
      };
    }

    // 10. Specific Skills: Programming Languages & Web
    if (/(language|programming|python|c\+\+|sql|mysql|javascript|html|css|tech\s*stack|skills?|tools?)/.test(q)) {
      return {
        reply: "Mamoon's technical stack includes:\n• **Languages**: Python (88%), C++ (90%), SQL/MySQL (85%), JavaScript (82%), Linux & Bash (82%), HTML5 & CSS3 (92%).\n• **Domains & Tools**: Cybersecurity & Networking (Cisco Packet Tracer), Autonomous Multi-Agent AI Swarms, OOP, Git & GitHub, and VS Code.",
        suggestions: [
          "Tell me about his cybersecurity focus",
          "See projects built with these skills",
          "What certifications does he have?",
          "How can I contact Mamoon?"
        ]
      };
    }

    // 11. Coursework / Subjects
    if (/(coursework|subjects?|courses?\s+at\s+ist|3rd\s*semester|third\s*semester)/.test(q)) {
      return {
        reply: "Mamoon's **3rd Semester BSCS coursework** at IST focuses on core Computer Science and Mathematics:\n• **Computer Science**: Data Structures, Computer Networks, Information Security, Software Engineering.\n• **Mathematics**: Probability & Statistics, Multivariable Calculus.",
        suggestions: [
          "Tell me more about his university",
          "What certifications is he pursuing?",
          "Show his featured projects",
          "How can I contact Mamoon?"
        ]
      };
    }

    // 12. Education / University / Location
    if (/(education|university|uni|ist|degree|bscs|study|studying|student|karak|islamabad|pakistan|where\s+is\s+he\s+from|location)/.test(q)) {
      return {
        reply: "Mamoon Ashraf is a **3rd Semester BS Computer Science (BSCS)** student at the **Institute of Space Technology (IST), Islamabad, Pakistan**, originally from **Karak, Khyber Pakhtunkhwa**.",
        suggestions: [
          "What is his 3rd semester coursework?",
          "What certifications does he have?",
          "Show his featured projects",
          "Is he available for internships?"
        ]
      };
    }

    // 13. Beyond Coding / Hobbies
    if (/(hobby|hobbies|interest|beyond\s*coding|art|drawing|video|content|capcut)/.test(q)) {
      return {
        reply: "Beyond coding, Mamoon explores **Cybersecurity & ethical hacking labs**, **Digital Content Creation** (video editing with CapCut Desktop, scripting, thumbnails), and **Fine Art** (structural portrait sketching & pencil illustration).",
        suggestions: [
          "Tell me about his cybersecurity skills",
          "Show his featured projects",
          "What certifications does he have?",
          "How can I contact Mamoon?"
        ]
      };
    }

    // 14. WhatsApp Specific
    if (/(whatsapp|phone|number|call|text\s*him)/.test(q)) {
      return {
        reply: "You can message Mamoon directly on **WhatsApp** at **+92 335 9764831**:\nhttps://wa.me/923359764831\n\nYou can also use the **Send on WhatsApp** button in the Contact section.",
        suggestions: [
          "What is his email address?",
          "Show his LinkedIn & GitHub",
          "Is he open for internships?"
        ],
        includeWhatsApp: true
      };
    }

    // 15. Socials: LinkedIn, GitHub, Instagram, Facebook
    if (/(linkedin|github|instagram|facebook|social)/.test(q)) {
      return {
        reply: "Here are Mamoon's official social & developer profiles:\n• **LinkedIn**: https://www.linkedin.com/in/mamoon-ashraff\n• **GitHub**: https://github.com/mamoonashraff\n• **Instagram**: https://instagram.com/mamoon__ashraf\n• **Facebook**: https://www.facebook.com/share/1Gfc7YpvxW/",
        suggestions: [
          "What is his email & WhatsApp?",
          "Show his GitHub projects",
          "View his certifications"
        ],
        includeWhatsApp: true
      };
    }

    // 16. Contact / Email / Hiring / Internships
    if (/(contact|email|mail|hire|intern|internship|collab|collaborate|available|availability|reach)/.test(q)) {
      return {
        reply: "Mamoon is open for **Cybersecurity internships, network security roles, and tech collaborations**.\n• **Email**: mamoonashraf831@gmail.com\n• **WhatsApp**: +92 335 9764831 (https://wa.me/923359764831)\n• **LinkedIn**: https://www.linkedin.com/in/mamoon-ashraff\nYou can also send him a direct message using the Contact form below.",
        suggestions: [
          "Show his GitHub & social profiles",
          "What certifications does he have?",
          "Show his featured projects"
        ],
        includeWhatsApp: true
      };
    }

    // 17. About / Intro / Who is Mamoon
    if (/(who\s+is|about\s+mamoon|introduce|intro|tell\s+me\s+about\s+mamoon|background|bio|summary|profile)/.test(q)) {
      return {
        reply: "**Mamoon Ashraf** is a **3rd Semester BSCS student** at the **Institute of Space Technology (IST), Islamabad** (hometown: Karak, KPK). He is an aspiring **Cybersecurity Specialist & Security Engineer**, holds **4 verified Google Certificates** in Cybersecurity & AI, is pursuing **Cisco CCNA & CyberOps**, and built **Nexus Sales AI** for AgentHack 2024.",
        suggestions: [
          "Show his featured projects",
          "What certifications does he have?",
          "What are his technical skills?",
          "How can I contact him?"
        ]
      };
    }

    // 18. Strict Irrelevant / Off-Topic Guard (Never give irrelevant dumps!)
    return {
      reply: "I can only answer questions related to **Mamoon Ashraf's portfolio**—such as his projects, Google & Cisco certifications, cybersecurity & programming skills, IST education, or contact details. Please choose a suggested question below or ask something specific about Mamoon.",
      suggestions: INITIAL_SUGGESTIONS
    };
  }

  async function askAssistant(userText) {
    if (!userText || isWaiting) return;
    isWaiting = true;

    appendMessage('user', userText);
    chatHistory.push({ role: 'user', text: userText });

    const typingNode = showTypingIndicator();
    let reply = null;
    let nextSuggestions = null;
    let includeWhatsApp = false;

    // Try Vercel Gemini Serverless Function first
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
            if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
              nextSuggestions = data.suggestions;
            }
            includeWhatsApp = /(whatsapp|contact|hire|email|reach)/i.test(userText + ' ' + reply);
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

    // Fallback to Built-in Smart Context-Aware AI
    if (!reply) {
      await new Promise((r) => setTimeout(r, 380));
      const local = generateLocalSmartReply(userText);
      reply = local.reply;
      nextSuggestions = local.suggestions;
      includeWhatsApp = Boolean(local.includeWhatsApp);
      if (modeBadge) {
        modeBadge.innerHTML = '<i class="fas fa-bolt"></i> Smart AI';
      }
    } else if (!nextSuggestions) {
      // Derive contextual follow-ups if Gemini didn't include suggestions
      nextSuggestions = generateLocalSmartReply(userText).suggestions;
    }

    typingNode.remove();
    appendMessage('bot', reply);
    chatHistory.push({ role: 'model', text: reply });
    renderSuggestions(nextSuggestions, includeWhatsApp);
    isWaiting = false;
  }

  // Render initial 4 starter suggestions on load
  renderSuggestions(INITIAL_SUGGESTIONS, false);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    askAssistant(text);
  });
}
