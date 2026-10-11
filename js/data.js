// Mamoon Ashraf's Portfolio Profile Data
const PORTFOLIO_DATA = {
  profile: {
    name: "Mamoon Ashraf",
    title: "Computer Science Student | Aspiring Cybersecurity Specialist & Security Engineer",
    hometown: "Karak, Khyber Pakhtunkhwa, Pakistan",
    university: "Institute of Space Technology (IST), Islamabad, Pakistan",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    semester: "3rd Semester (BSCS)",
    avatar: "assets/avatar.jpg",
    statusBadge: "Active Learner: Cisco CCNA & CyberOps | Open for Collaborations",
    bio: "Passionate Computer Science student at the Institute of Space Technology (IST) pursuing Cybersecurity & Network Defense. Actively studying Cisco CCNA and Cisco CyberOps Associate, exploring Ethical Hacking, Network Security, Penetration Testing, Linux Architecture, and modern Software Engineering.",
    taglines: [
      "Aspiring Cybersecurity Specialist",
      "Cisco CCNA & CyberOps Aspirant",
      "AI Hackathon Project Builder",
      "Network Security & Ethical Hacking Enthusiast",
      "3rd Semester BS CS @ Institute of Space Technology"
    ]
  },

  stats: [
    { label: "Current Semester", value: "3rd", subtext: "BS CS @ IST Pakistan" },
    { label: "Featured Projects", value: "3+", subtext: "AI Hackathon, Web & Games" },
    { label: "Core Technologies", value: "10+", subtext: "Linux, Python, C++, SQL" },
    { label: "Certifications", value: "Cisco", subtext: "In Progress (CCNA & CyberOps)" }
  ],

  education: {
    institution: "Institute of Space Technology (IST), Pakistan",
    degree: "BS Computer Science (BSCS)",
    currentSemester: "3rd Semester",
    location: "Islamabad, Pakistan",
    description: "Currently in my 3rd Semester, building a strong core in algorithms, database design, computer networks, and cybersecurity.",
    coursework: [
      "Data Structures",
      "Computer Networks",
      "Information Security",
      "Software Engineering",
      "Probability & Statistics",
      "Multivariable Calculus"
    ]
  },

  projects: [
    {
      id: "nexus-aurum",
      title: "Nexus Aurum AI",
      category: "ai",
      role: "AI Agent & Backend Engineer",
      status: "AI Hackathon Project 🏆",
      featured: true,
      image: "assets/nexus_aurum.jpg",
      description: "An autonomous AI geospatial mineral intelligence and satellite prospecting system engineered for the AI Season Hackathon. Analyzes multispectral satellite feeds and GIS telemetry to detect and score precious mineral deposits.",
      tags: ["AI Hackathon", "Python", "FastAPI", "Satellite GIS", "Remote Sensing"],
      details: {
        problem: "Traditional mineral exploration relies on expensive, slow geological expeditions that take months to survey remote, mountainous terrain.",
        solution: "Engineered an autonomous AI prospecting engine that leverages remote sensing spectral band math (Gossan & Clay alteration ratios, fault density analysis) and satellite telemetry to rank target locations with high precision prospectivity scores.",
        features: [
          "Multispectral satellite imagery band analysis (Gossan & Clay ratio algorithms)",
          "Autonomous Target Ranking Engine with AI prospectivity scores",
          "Interactive GIS mapping interface with real-time telemetry filters",
          "FastAPI backend architecture with explainable geological breakdown"
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
      { name: "Python", level: 88, badge: "Security Scripting & AI Engines" },
      { name: "C++", level: 90, badge: "OOP & Game/System Architecture" },
      { name: "SQL (MySQL)", level: 85, badge: "Relational DB Architecture" },
      { name: "JavaScript", level: 78, badge: "Interactive Web UI" },
      { name: "Linux & Bash", level: 82, badge: "Cybersecurity & OS" },
      { name: "HTML5 & CSS3", level: 92, badge: "Modern UI System" }
    ],
    frameworks: [
      { name: "Cisco CCNA & CyberOps", level: 85, badge: "Cisco Academy (In Progress)" },
      { name: "FastAPI & Python AI", level: 84, badge: "AI Agents & REST APIs" },
      { name: "Network Security & Packet Tracer", level: 82, badge: "Routing, Switching & Ops" },
      { name: "Git & GitHub", level: 88, badge: "Version Control" },
      { name: "VS Code", level: 92, badge: "Primary IDE" }
    ],
    domains: [
      "Cybersecurity & Ethical Hacking",
      "Network Security Architecture",
      "Cisco CCNA (Routing & Switching)",
      "Cisco CyberOps (Security Operations)",
      "Autonomous AI Agents & Geospatial ML",
      "Object-Oriented Programming (OOP)",
      "Linux System Administration",
      "Full-Stack Web Development"
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
      title: "Cisco CCNA (In Progress)",
      org: "Cisco Networking Academy",
      status: "In Active Pursuit",
      focus: "Cisco Certified Network Associate — Network fundamentals, IP connectivity, IP services, security fundamentals, automation and programmability."
    },
    {
      title: "Cisco CyberOps Associate (In Progress)",
      org: "Cisco Networking Academy",
      status: "In Active Pursuit",
      focus: "Cisco Certified CyberOps Associate — Security concepts, security monitoring, host-based analysis, network intrusion analysis, and security incident response."
    }
  ],

  contact: {
    email: "mamoonashraf831@gmail.com",
    location: "Karak / Islamabad (IST), Pakistan",
    github: "https://github.com/mamoonashraff",
    linkedin: "https://www.linkedin.com/in/mamoon-ashraff",
    facebook: "https://www.facebook.com/share/1Gfc7YpvxW/",
    instagram: "https://instagram.com/mamoon__ashraf",
    availability: "Open for Cybersecurity Internships, Network Security & Tech Collaborations"
  }
};
