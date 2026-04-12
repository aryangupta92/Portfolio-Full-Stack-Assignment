export const personalInfo = {
  name: "Aryan Gupta",
  title: "Full Stack Developer & UI/UX Enthusiast",
  subtitle: "Building digital experiences that matter.",
  email: "aryan.gupta9352@gmail.com",
  phone: "+91 93520 00000",
  location: "Jaipur, Rajasthan",
  github: "https://github.com/aryangupta92",
  linkedin: "https://www.linkedin.com/in/aryan-gupta-a161b4314/",
  twitter: "https://twitter.com/aryangupta92",
  bio: `I'm a passionate Full Stack Developer with a strong foundation in building
    scalable web applications and intelligent AI/ML systems. I thrive at the intersection
    of design and engineering — turning complex problems into elegant solutions.`,
  avatar: null,
};

export const skills = [
  { name: "React",      level: 60, category: "Frontend",  color: "#61DAFB" },
  { name: "Node.js",    level: 60, category: "Backend",   color: "#68A063" },
  { name: "Python",     level: 70, category: "Language",  color: "#FFD43B" },
  { name: "Figma",      level: 75, category: "Design",    color: "#F24E1E" },
  { name: "MongoDB",    level: 65, category: "Database",  color: "#47A248" },
  { name: "Express.js", level: 65, category: "Backend",   color: "#888888" },
  { name: "HTML/CSS",   level: 80, category: "Frontend",  color: "#E34F26" },
  { name: "JavaScript", level: 70, category: "Language",  color: "#F7DF1E" },
  { name: "Machine Learning", level: 65, category: "AI/ML", color: "#FF6F00" },
  { name: "Deep Learning",    level: 60, category: "AI/ML", color: "#9C27B0" },
  { name: "Git",        level: 72, category: "DevOps",    color: "#F05032" },
  { name: "SQL",        level: 62, category: "Database",  color: "#4169E1" },
];

export const projects = [
  {
    id: 1,
    title: "TrainSense — Delay Predictor",
    description:
      "An AI/ML model that predicts train delays across Rajasthan and its major cities using historical data, weather patterns, and rail network factors.",
    longDescription:
      "TrainSense is an intelligent train delay prediction system built specifically for the Rajasthan rail network. It ingests historical delay records, real-time weather data, and station-specific congestion patterns through a scikit-learn pipeline. Multiple regression and ensemble models were trained and benchmarked; the final model uses a Gradient Boosting approach with feature engineering tailored to Indian Railways' timetable structure. The system surfaces predictions through a clean dashboard that helps commuters plan their journeys better.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy", "XGBoost", "Matplotlib", "Flask", "React"],
    color: "#6366f1",
    github: "#",
    live: "#",
    image: "🚆",
    category: "AI / ML",
    year: "2024",
  },
  {
    id: 2,
    title: "VolatilityIQ — Stock Risk Model",
    description:
      "A novel volatility model for Indian stock market instruments, leveraging advanced statistical concepts to outperform standard GARCH baselines.",
    longDescription:
      "VolatilityIQ combines concepts from GARCH, EGARCH, and stochastic volatility models with custom Indian-market adjustments (sectoral indices, FII/DII flows) to build a superior volatility estimator. The project involved rigorous backtesting on NSE equities using 10+ years of tick data. Advanced statistical techniques — heteroskedasticity tests, rolling window calibration, Monte Carlo simulation — were applied to validate the model's edge over standard baselines. Results are visualised through interactive charts powered by Plotly.",
    tech: ["Python", "NumPy", "Pandas", "statsmodels", "SciPy", "Plotly", "GARCH", "Monte Carlo"],
    color: "#10b981",
    github: "#",
    live: "#",
    image: "📈",
    category: "Quantitative Finance / AI",
    year: "2024",
  },
  {
    id: 3,
    title: "MediBot — Doctor-Patient Chatbot",
    description:
      "A deep learning–powered conversational chatbot that simulates clinical dialogues, helping patients describe symptoms and receive preliminary guidance.",
    longDescription:
      "MediBot is a healthcare-focused conversational AI trained on anonymised doctor-patient dialogue datasets. Built on a sequence-to-sequence Transformer architecture with an attention mechanism, the model understands multi-turn medical conversations and generates contextually appropriate responses. A symptom-extraction NLP layer (built with spaCy) structures patient inputs before passing them to the generative model, while a fine-tuned BERT classifier tags intent (symptom report, query, follow-up). The front-end provides a clean chat UI with real-time streaming responses.",
    tech: ["Python", "PyTorch", "Transformers (HuggingFace)", "spaCy", "BERT", "Flask", "React", "MongoDB"],
    color: "#06b6d4",
    github: "#",
    live: "#",
    image: "🏥",
    category: "Deep Learning / NLP",
    year: "2024",
  },
  {
    id: 4,
    title: "Rent-Karo — Item Rental Platform",
    description:
      "A full-stack peer-to-peer rental marketplace — like OLX, but for renting any item. List, discover, and rent everyday goods hassle-free.",
    longDescription:
      "Rent-Karo is a full-stack web application that re-imagines the secondhand marketplace for the rental economy. Users can list any item (electronics, furniture, vehicles, tools, etc.) with photos, pricing, and availability windows. A real-time search with category and location filters makes discovery fast. The platform features JWT-based authentication, protected routes, real-time in-app messaging between renter and owner, and a booking management dashboard. The backend exposes a RESTful API built with Express.js and stores data in MongoDB, while the React frontend delivers a smooth, mobile-responsive experience.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS", "Cloudinary", "Socket.io"],
    color: "#f59e0b",
    github: "#",
    live: "#",
    image: "🏠",
    category: "Full Stack",
    year: "2024",
  },
  {
    id: 5,
    title: "UI/UX Design Portfolio",
    description:
      "A curated collection of user interface designs and interactive prototypes created with Figma, showcasing design thinking and problem-solving process.",
    longDescription:
      "This project documents the end-to-end design process behind several digital product concepts — from user research and wireframing to high-fidelity prototypes and design systems. Each case study includes user personas, journey maps, information architecture diagrams, and interactive Figma prototypes. Key focus areas include accessibility (WCAG 2.1 AA compliance), responsive design patterns, and micro-interaction design using Figma's advanced prototyping features.",
    tech: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Accessibility"],
    color: "#ec4899",
    github: "#",
    live: "#",
    image: "🎨",
    category: "UI / UX Design",
    year: "2023",
  },
];

export const experience = [
  {
    title: "Full Stack Developer",
    company: "Freelance / Self-Employed",
    duration: "2024 – Present",
    description:
      "Building full-stack web applications and AI/ML projects for personal and academic purposes. Developed Rent-Karo (a peer-to-peer rental platform), contributed to AI research projects, and continually sharpening frontend and backend skills.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Python"],
    type: "work",
  },
  {
    title: "Frontend Developer (Internship / Project Work)",
    company: "Academic & Personal Projects",
    duration: "2023 – 2024",
    description:
      "Focused on building responsive, accessible, and visually polished frontends. Adopted modern React patterns (hooks, context, lazy-loading) and translated Figma designs into pixel-perfect interfaces.",
    tech: ["React", "HTML", "CSS", "JavaScript", "Figma"],
    type: "work",
  },
  {
    title: "B.Tech — Computer Science (Core)",
    company: "JK Lakshmipat University, Jaipur",
    duration: "2022 – Present",
    description:
      "Pursuing a Bachelor of Technology in Computer Science & Engineering with a strong focus on data structures, algorithms, machine learning, and software engineering. Active member of the coding club.",
    tech: ["DSA", "Machine Learning", "DBMS", "Operating Systems", "Software Engineering"],
    type: "education",
  },
];

export const resumePages = [
  {
    page: 1,
    type: "cover",
    content: {
      name: "Aryan Gupta",
      title: "Full Stack Developer",
      subtitle: "& UI/UX Enthusiast",
      contact: ["aryan.gupta9352@gmail.com", "Jaipur, Rajasthan"],
      links: ["github.com/aryangupta92", "linkedin.com/in/aryan-gupta-a161b4314"],
    },
  },
  {
    page: 2,
    type: "summary",
    content: {
      heading: "Professional Summary",
      text: "Full Stack Developer and AI/ML enthusiast currently pursuing B.Tech in Computer Science at JK Lakshmipat University, Jaipur. Passionate about building impactful web applications and intelligent systems that solve real-world problems. Strong hands-on experience with React, Node.js, Python, and modern ML frameworks.",
      highlights: [
        "Built 5 projects across web & AI/ML domains",
        "Developed AI models for Railways & Stock Market",
        "Created a full-stack peer-to-peer rental platform",
        "Proficient in Figma UI/UX design",
      ],
    },
  },
  {
    page: 3,
    type: "experience",
    content: {
      heading: "Work Experience",
      items: experience.filter((e) => e.type === "work"),
    },
  },
  {
    page: 4,
    type: "skills",
    content: {
      heading: "Skills & Technologies",
      categories: {
        Frontend: skills.filter((s) => s.category === "Frontend"),
        Backend:  skills.filter((s) => s.category === "Backend"),
        Database: skills.filter((s) => s.category === "Database"),
        "AI/ML":  skills.filter((s) => s.category === "AI/ML"),
        Other: [...skills.filter((s) => s.category === "Language"), ...skills.filter((s) => s.category === "Design")],
      },
    },
  },
  {
    page: 5,
    type: "projects",
    content: {
      heading: "Key Projects",
      items: projects.slice(0, 3),
    },
  },
];
