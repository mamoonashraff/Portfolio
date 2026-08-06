// Mamoon Ashraf's Portfolio Profile Data
const PORTFOLIO_DATA = {
  profile: {
    name: "Mamoon Ashraf",
    title: "Computer Science Student | Aspiring Cybersecurity Specialist & Security Engineer",
    hometown: "Karak, Khyber Pakhtunkhwa, Pakistan",
    university: "Institute of Space Technology (IST), Islamabad, Pakistan",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    semester: "2nd Semester (Completed 1st Year)",
    avatar: "assets/avatar.jpg",
    statusBadge: "Available for Cybersecurity & Web/AI Collaborations",
    bio: "Passionate Computer Science student at the Institute of Space Technology (IST) with a relentless drive for cybersecurity innovation. Founder of Rozgar.ai (In Active Development), exploring Ethical Hacking, Network Security, Penetration Testing, Linux Architecture, and modern Web & Mobile software.",
    taglines: [
      "Aspiring Cybersecurity Specialist",
      "Ethical Hacking & Network Security Enthusiast",
      "Founder @ Rozgar.ai (In Active Development)",
      "BS CS Student @ Institute of Space Technology"
    ]
  },

  stats: [
    { label: "Completed Semester", value: "2nd", subtext: "BS CS @ IST Pakistan" },
    { label: "Featured Projects", value: "3+", subtext: "AI, Web & OOP Games" },
    { label: "Core Technologies", value: "10+", subtext: "Linux, Python, C++, SQL" },
    { label: "Certifications", value: "Cisco", subtext: "In Progress (Cyber, Net & Py)" }
  ],

  education: {
    institution: "Institute of Space Technology (IST), Pakistan",
    degree: "BS Computer Science (BSCS)",
    currentSemester: "2nd Semester",
    location: "Islamabad, Pakistan",
    description: "Building a rigorous academic foundation in programming, cybersecurity fundamentals, database architecture, and computer systems.",
    coursework: [
      "Object-Oriented Programming (OOP)",
      "Database Systems & Relational Design",
      "Programming Fundamentals (C++)",
      "Calculus & Analytical Geometry",
      "Data Structures & Algorithms",
      "Digital Logic Design (DLD)"
    ]
  },

  projects: [
    {
      id: "rozgar-ai",
      title: "Rozgar.ai",
      category: "ai-mobile",
      role: "Founder & Lead Developer",
      status: "In Active Development 🚀",
      featured: true,
      image: "assets/rozgar_ai.jpg",
      description: "An AI-powered operating system and fraud analyzer platform currently in active development, designed to empower local Pakistani freelancers against fraudulent clients and work scams.",
      tags: ["In Active Dev", "Flutter", "Firebase", "Gemini API", "AI Fraud Analysis"],
      details: {
        problem: "Local freelancers frequently face payment scams, fake client postings, and contract disputes without protection.",
        solution: "Rozgar.ai is currently being built to leverage Google Gemini AI algorithms and Flutter mobile architecture to analyze job proposals, verify client history, and provide automated contract safeguards.",
        features: [
          "AI Fraud Analyzer powered by Gemini API (Building)",
          "Freelancer OS Dashboard for workflow management (In Progress)",
          "Cross-Platform Mobile App for iOS & Android (In Active Dev)",
          "Real-time Firebase backend integration"
        ],
        github: "https://github.com/mamoonashraff",
        demo: "#"
      }
    },
    {
      id: "barakah-scents",
      title: "Barakah Scents",
      category: "web",
      role: "Frontend Developer (Team Collaboration)",
      status: "Completed & Hosted",
      featured: true,
      image: "assets/barakah_scents.jpg",
      description: "A luxury front-end e-commerce website designed for a fragrance brand featuring responsive navigation, product galleries, and dynamic UI elements.",
      tags: ["HTML5", "CSS3", "JavaScript", "GitHub Pages", "UI/UX"],
      details: {
        problem: "Creating an elegant online store presence for a local luxury fragrance brand with high visual appeal.",
        solution: "Engineered a fast, responsive, gold-and-obsidian themed storefront with custom CSS grid layouts, smooth product cards, and seamless UI transitions.",
        features: [
          "Custom luxury dark glassmorphism layout",
          "Interactive fragrance catalog & filter tabs",
          "Fully responsive mobile and desktop layout",
          "Deployed on GitHub Pages"
        ],
        github: "https://github.com/mamoonashraff/Barakah-Scents-Website-Project",
        demo: "https://mamoonashraff.github.io/Barakah-Scents-Website-Project/"
      }
    },
    {
      id: "zelda-rpg",
      title: "Zelda RPG Game Engine",
      category: "database",
      role: "OOP Developer & Game Architect",
      status: "Completed OOP Project",
      featured: true,
      image: "assets/zelda_rpg.jpg",
      description: "An Object-Oriented 2D RPG game built to demonstrate advanced OOP concepts, custom entity state management, player mechanics, collision handling, and game loop architecture.",
      tags: ["C++ / Python", "OOP Concepts", "Polymorphism", "Inheritance", "Game Loop"],
      details: {
        problem: "Designing a modular game engine that handles player movement, enemy AI, inventory management, and collision detection cleanly without code duplication.",
        solution: "Implemented Object-Oriented Principles including Polymorphism for entity classes (Player, Enemies, Items), Encapsulation for player stats, Inheritance for game objects, and a modular state machine game loop.",
        features: [
          "Modular Entity Hierarchy (Player, Enemy, NPC, Item classes)",
          "Polymorphic combat & collision detection mechanics",
          "Inventory, Health, & Stats management system",
          "Custom Game Loop & State Handler"
        ],
        github: "https://github.com/mamoonashraff/ZeldaRPG",
        demo: "#"
      }
    }
  ],

  skills: {
    programming: [
      { name: "Python", level: 88, badge: "Security Scripting & Pygame" },
      { name: "C++", level: 90, badge: "OOP & Game/System Architecture" },
      { name: "SQL (MySQL)", level: 85, badge: "Relational DB Architecture" },
      { name: "JavaScript", level: 78, badge: "Interactive Web UI" },
      { name: "Linux & Bash", level: 82, badge: "Cybersecurity & OS" },
      { name: "HTML5 & CSS3", level: 92, badge: "Modern UI System" }
    ],
    frameworks: [
      { name: "Flutter", level: 80, badge: "Cross-Platform Apps" },
      { name: "Firebase", level: 82, badge: "Real-time Cloud Backend" },
      { name: "Git & GitHub", level: 88, badge: "Version Control" },
      { name: "Networking & Security Tools", level: 85, badge: "Cisco In-Progress" },
      { name: "VS Code", level: 92, badge: "Primary IDE" }
    ],
    domains: [
      "Cybersecurity & Ethical Hacking",
      "Object-Oriented Programming (OOP)",
      "Network Security Architecture",
      "Linux System Administration",
      "Application Vulnerability Analysis",
      "Artificial Intelligence (AI)",
      "Full-Stack Web Development",
      "Cross-Platform Mobile Dev"
    ]
  },

  creativeInterests: [
    {
      title: "Ethical Hacking & Security",
      desc: "Active learner focusing on Linux environments, networking protocols, system hardening, and security architecture."
    },
    {
      title: "Digital Content Creation",
      desc: "Script editing, video production (CapCut Desktop), thumbnail design, and audience growth strategies."
    },
    {
      title: "Fine Art & Structural Drawing",
      desc: "Practicing structural portrait drawing, proportions sketching, and classical pencil illustration."
    }
  ],

  certifications: [
    {
      title: "Cisco Certifications (In Progress)",
      org: "Cisco Networking Academy",
      status: "In Active Pursuit",
      focus: "Currently in active pursuit of professional certifications in Cybersecurity Essentials, Computer Networking Fundamentals, and Python Security Scripting."
    }
  ],

  contact: {
    email: "mamoonashraf831@gmail.com",
    location: "Karak / Islamabad (IST), Pakistan",
    github: "https://github.com/mamoonashraff",
    linkedin: "https://www.linkedin.com/in/mamoon-ashraff",
    facebook: "https://www.facebook.com/share/1Gfc7YpvxW/",
    instagram: "https://instagram.com/mamoon__ashraf",
    availability: "Open for Cybersecurity Internships, AI Collaborations & Research"
  }
};
