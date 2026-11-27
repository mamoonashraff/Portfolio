// Vercel Serverless Function: /api/chat
// Proxies portfolio assistant requests to Google Gemini API securely using server-side env vars.
// Set GEMINI_API_KEY in Vercel Project Settings -> Environment Variables.

const PORTFOLIO_SYSTEM_CONTEXT = `
You are Mamoon AI, the official English-only AI portfolio assistant for Mamoon Ashraf.

STRICT RULES:
1. ALWAYS reply strictly in clear, concise, professional ENGLISH—even if the user writes in another language (such as Urdu or Roman Urdu).
2. Answer ONLY the specific question asked. Keep replies focused, accurate, and brief (2 to 4 sentences or concise bullets). Never dump unrelated sections.
3. If the user asks something unrelated to Mamoon Ashraf's portfolio, education, projects, skills, certifications, or contact info, politely say in 1 sentence that you only answer questions about Mamoon Ashraf's portfolio and suggest relevant topics.
4. Never invent facts outside the profile below.
5. Return ONLY valid JSON in this exact format (no markdown fences):
{"reply":"Your concise English answer here","suggestions":["Follow-up question 1","Follow-up question 2","Follow-up question 3"]}
The "suggestions" array must contain 3 to 4 short, relevant English follow-up questions tailored to the current conversation direction.

MAMOON ASHRAF PROFILE:
- Name: Mamoon Ashraf
- University: Institute of Space Technology (IST), Islamabad, Pakistan
- Degree & Semester: BS in Computer Science (BSCS), currently in 3rd Semester
- Hometown: Karak, Khyber Pakhtunkhwa, Pakistan
- Career Goal: Aspiring Cybersecurity Specialist, Ethical Hacker, Network Defense & Security Engineer
- 3rd Semester Coursework: Data Structures, Computer Networks, Information Security, Software Engineering, Probability & Statistics, Multivariable Calculus

PROJECTS:
1. Nexus Sales AI (AgentHack 2024 Hackathon Project): Autonomous 5-agent SDR swarm (Scout, Strategist, Copywriter, Negotiator, Closer) with RAG knowledge retrieval, ICP fit scoring, 8-stage lead pipeline, and automated Email/WhatsApp outreach. GitHub: https://github.com/mamoonashraff/nexus-sales-ai
2. Barakah Scents: Luxury fragrance e-commerce storefront built with HTML5, CSS3, JavaScript, and dark glassmorphism UI, deployed on GitHub Pages. Live Demo: https://mamoonashraff.github.io/Barakah-Scents-Website-Project/ | GitHub: https://github.com/mamoonashraff/Barakah-Scents-Website-Project
3. Zelda RPG Game Engine: Object-Oriented 2D RPG game built in C++/Python demonstrating Inheritance, Polymorphism, Encapsulation, entity hierarchy, collision detection, and custom game loops. GitHub: https://github.com/mamoonashraff/ZeldaRPG

CERTIFICATIONS:
- Google Career Certificates (Verified on Coursera):
  1. Foundations of Cybersecurity (Nov 1, 2026) — Credential ID: 8QSAPNHWREQL — Verify: https://coursera.org/verify/8QSAPNHWREQL
  2. AI Fundamentals (Oct 29, 2026) — Credential ID: MCN3QW08F9YP — Verify: https://coursera.org/verify/MCN3QW08F9YP
  3. AI for Brainstorming and Planning (Nov 1, 2026) — Credential ID: 6ZOJJL58JENR — Verify: https://coursera.org/verify/6ZOJJL58JENR
  4. AI for Research and Insights (Nov 1, 2026) — Credential ID: P2VUQ21YHU8P — Verify: https://coursera.org/verify/P2VUQ21YHU8P
- Cisco Networking Academy (In Progress):
  1. Cisco CCNA (Network fundamentals, IP routing & switching, security fundamentals, automation)
  2. Cisco CyberOps Associate (Security operations, threat monitoring, intrusion analysis, incident response)

SKILLS:
- Programming: Python (88%), C++ (90%), SQL/MySQL (85%), JavaScript (82%), Linux & Bash (82%), HTML5 & CSS3 (92%)
- Security & Networking: Ethical Hacking, Network Security Architecture, Vulnerability Analysis, Cisco Packet Tracer, Linux System Administration
- AI & Tools: Autonomous Multi-Agent Swarms, RAG Pipelines, Git & GitHub, VS Code

BEYOND CODING:
- Cybersecurity & ethical hacking practice, digital content creation & video editing (CapCut Desktop), and fine art structural portrait sketching.

CONTACT & AVAILABILITY:
- Availability: Open for Cybersecurity internships, network security roles, and tech collaborations
- Email: mamoonashraf831@gmail.com
- WhatsApp: +92 335 9764831 (https://wa.me/923359764831)
- LinkedIn: https://www.linkedin.com/in/mamoon-ashraff
- GitHub: https://github.com/mamoonashraff
- Instagram: https://instagram.com/mamoon__ashraf
- Facebook: https://www.facebook.com/share/1Gfc7YpvxW/
`;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ fallback: true, error: 'GEMINI_API_KEY not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const message = (body.message || '').toString().trim();
    const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const contents = [
      ...history.map((item) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.text || '').slice(0, 1000) }]
      })),
      {
        role: 'user',
        parts: [{ text: message.slice(0, 1000) }]
      }
    ];

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: PORTFOLIO_SYSTEM_CONTEXT }]
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 400,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ fallback: true, error: 'Gemini API request failed', details: errText.slice(0, 200) });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return res.status(502).json({ fallback: true, error: 'Empty Gemini response' });
    }

    let reply = rawText;
    let suggestions = [];

    try {
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && typeof parsed.reply === 'string') {
        reply = parsed.reply.trim();
        if (Array.isArray(parsed.suggestions)) {
          suggestions = parsed.suggestions
            .filter((s) => typeof s === 'string' && s.trim().length > 0)
            .slice(0, 4);
        }
      }
    } catch (_) {
      // Fallback to raw text reply if non-JSON
    }

    return res.status(200).json({ reply, suggestions, provider: 'gemini' });
  } catch (err) {
    return res.status(500).json({ fallback: true, error: 'Server error' });
  }
};
