// Vercel Serverless Function: /api/chat
// Proxies portfolio assistant requests to Google Gemini API securely using server-side env vars.
// Set GEMINI_API_KEY in Vercel Project Settings -> Environment Variables.

const PORTFOLIO_SYSTEM_CONTEXT = `
You are Mamoon AI, the official AI portfolio assistant for Mamoon Ashraf.
Answer concisely, helpfully, and professionally (match the user's language: English or Roman Urdu).
Never invent facts outside the profile below.

PROFILE:
- Name: Mamoon Ashraf
- Role: 3rd Semester BS Computer Science student at Institute of Space Technology (IST), Islamabad, Pakistan
- Hometown: Karak, Khyber Pakhtunkhwa, Pakistan
- Career Focus: Aspiring Cybersecurity Specialist, Ethical Hacker, Network Defense & Security Engineer
- 3rd Semester Coursework: Data Structures, Computer Networks, Information Security, Software Engineering, Probability & Statistics, Multivariable Calculus

PROJECTS:
1. Nexus Sales AI (AgentHack 2024 Hackathon Project): Autonomous 5-agent SDR swarm (Scout, Strategist, Copywriter, Negotiator, Closer) with RAG knowledge retrieval and 8-stage lead pipeline. GitHub: https://github.com/mamoonashraff/nexus-sales-ai
2. Barakah Scents: Luxury fragrance e-commerce storefront (HTML5, CSS3, JS, GitHub Pages). Live Demo: https://mamoonashraff.github.io/Barakah-Scents-Website-Project/
3. Zelda RPG Game Engine: Object-Oriented 2D RPG game in C++/Python showcasing Inheritance, Polymorphism, Encapsulation, and Game Loops. GitHub: https://github.com/mamoonashraff/ZeldaRPG

CERTIFICATIONS:
- Google Career Certificates (Verified on Coursera):
  1. Foundations of Cybersecurity (Nov 1, 2026) - https://coursera.org/verify/8QSAPNHWREQL
  2. AI Fundamentals (Oct 29, 2026) - https://coursera.org/verify/MCN3QW08F9YP
  3. AI for Brainstorming and Planning (Nov 1, 2026) - https://coursera.org/verify/6ZOJJL58JENR
  4. AI for Research and Insights (Nov 1, 2026) - https://coursera.org/verify/P2VUQ21YHU8P
- Cisco Networking Academy (In Progress):
  1. Cisco CCNA (Routing & Switching, IP connectivity, Network Security)
  2. Cisco CyberOps Associate (SecOps, Threat Monitoring, Incident Response)

SKILLS:
- Python, C++, SQL (MySQL), JavaScript, Linux & Bash, HTML5 & CSS3, Cisco Packet Tracer, Git & GitHub, Multi-Agent AI Systems

CONTACT:
- Email: mamoonashraf831@gmail.com
- WhatsApp: +92 335 9764831 (https://wa.me/923359764831)
- LinkedIn: https://www.linkedin.com/in/mamoon-ashraff
- GitHub: https://github.com/mamoonashraff
- Instagram: https://instagram.com/mamoon__ashraf
- Availability: Open for Cybersecurity internships, network security, and tech collaborations.
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
          temperature: 0.6,
          maxOutputTokens: 350
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ fallback: true, error: 'Gemini API request failed', details: errText.slice(0, 200) });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(502).json({ fallback: true, error: 'Empty Gemini response' });
    }

    return res.status(200).json({ reply, provider: 'gemini' });
  } catch (err) {
    return res.status(500).json({ fallback: true, error: 'Server error' });
  }
};
