window.siteContent = {
  name: "Daniel De Dios Allegue",
  brandStrong: "Daniel",
  brandLight: "De Dios Allegue",
  description: "",
  cvPdf: "assets/cv.pdf",
  portrait: {
    src: "assets/portrait.jpg",
    alt: "Portrait of Daniel De Dios Allegue"
  },
  intro: [
    "Hi, I'm Daniel 🌴! I am an incoming MPhil Advanced Computer Science at the University of Cambridge (Fitzwilliam College), where I will focus on generative modelling and AI4Science. "
  ],
  focusIntro: [
    "I am currently a research assistant at the <a href='https://trl-lab.github.io/' target='_blank' rel='noreferrer'>Table Representation Learning Lab</a> at CWI in Amsterdam, where I work on scalable and efficient architectures for Tabular Foundation Models (TFMs) supervised by <a href='https://www.madelonhulsebos.com' target='_blank' rel='noreferrer'>Dr. Madelon Hulsebos</a>.",
    "Previosly, I graduated <em>cum laude</em> with a BSc in Computer Science and a bridging programme to Applied Mathematics from Delft University of Technology. I worked on model-based reinforcement learning (MBRL), world models and kernel methods for attention mechanisms supervised by <a href='https://fransoliehoek.net/' target='_blank' rel='noreferrer'>Prof. Frans Oliehoek</a> and <a href='https://www.jinkehe.me' target='_blank' rel='noreferrer'>Dr. Jinke He</a>.",
    "On the industry side, I have interned at Google <img src='assets/google-logo.jpg' alt='Google' style='height:1.1em;vertical-align:middle;margin:0 2px;border-radius:2px;'>on the <em>Video AI Mobile Team</em> for Google Meet where I worked on audio processing and Bluetooth integration, and at Lufthansa Group <img src='assets/lufthansa.png' alt='Lufthansa Group' style='height:1.1em;vertical-align:middle;margin:0 2px;border-radius:2px;'>, where I worked on Natural Language Processing (NLP) to process complex grant documents.",
    "My current research interests include <strong>foundation models and representation learning for decision making</strong>. I am specially interested in generative modelling for structured data, <em>AI4Science</em> and protein design 🧬."
  ],
  // focusAreasIntro: "Some of my research interests and contributions:",
  // focusAreasOutro: "I am also broadly interested in <em>AI4Science</em>, protein design, and generative models for structured data.",
  // focusAreas: [
  //   {
  //     title: "Tabular Foundation Models",
  //     items: ["scalable and efficient architectures for TFMs", "representation learning for structured data"]
  //   },
  //   {
  //     title: "Reinforcement learning",
  //     items: ["model-based RL (MBRL)", "world models", "<a href='https://arxiv.org/abs/2511.06946' target='_blank' rel='noreferrer'>structured attention mechanisms for PORL</a>"]
  //   },
  //   {
  //     title: "Generative modelling",
  //     items: ["generative models for structured and tabular data", "diffusion and flow-based models"]
  //   }
  // ],
  experience: [
    {
      company: "Centrum Wiskunde & Informatica (CWI)",
      href: "https://example.com",
      logo: { src: "assets/cwi.png", alt: "CWI logo", size: "75%" },
      role: "Research Assistant",
      period: "Nov 2025 - Present",
      location: "Amsterdam, Netherlands",
      description: "Tabular Foundation Models (TFMs)"
    },
    {
      company: "Google",
      href: "https://example.com",
      logo: { src: "assets/google-logo.jpg", alt: "Google logo" },
      role: "Software Engineer Intern",
      period: "Summer 2025",
      location: "Stockholm, Sweden",
      description: "Video AI Mobile Team, Google Meet"
    },
    {
      company: "KTH Royal Institute of Technology",
      href: "https://example.com",
      logo: { src: "assets/kth.jpg", alt: "KTH logo", size: "80%" },
      role: "Exchange Student in Applied Mathematics",
      // period: "Month Year – Month Year",
      // location: "City, Country",
      // description: "Short description of your responsibilities and what you worked on."
    },
    {
      company: "Lufthansa Group",
      href: "https://example.com",
      logo: { src: "assets/lufthansa.png", alt: "Lufthansa logo" },
      role: "Software Engineer Intern",
      period: "Month Year – Month Year",
      location: "City, Country",
      description: "Short description of your responsibilities and what you worked on."
    },
    {
      company: "Team Epoch",
      href: "https://example.com",
      logo: { src: "assets/teamepoch_logo.jpg", alt: "Lufthansa logo" },
      role: "Research Engineer",
      period: "Month Year – Month Year",
      location: "City, Country",
      description: "Short description of your responsibilities and what you worked on."
    },
    {
      company: "Delft University of Technology",
      href: "https://example.com",
      logo: { src: "assets/tudelft.png", alt: "Delft University of Technology logo" },
      role: "BSc Computer Science + Applied Maths (Cum Laude)",
      // period: "Month Year – Month Year",
      // location: "City, Country",
      // description: "Short description of your responsibilities and what you worked on."
    }
  ],
  work: [
    {
      title: "Learning to Focus: Prioritizing Informative Histories with Structured Attention Mechanisms in Partially Observable Reinforcement Learning",
      meta: "Publication",
      href: "https://arxiv.org/abs/2511.06946",
      tag: "EWM @ NeurIPS",
      image: {
        src: "assets/learning-to-focus.svg",
        alt: "Diagram for Learning to Focus"
      },
      authors: [
        { name: "Daniel De Dios Allegue", highlight: true },
        { name: "Jinke He" },
        { name: "Frans A. Oliehoek" }
      ],
      venue: "Embodied World Models Workshop @ NeurIPS",
      year: "2025",
      abstract: "In partially observable environments, an agent must rely on its history of observations to infer the true state of the world. However, not all parts of the history are equally informative. We propose a structured attention mechanism that learns to prioritize informative observations in the history, enabling more efficient use of context in memory-based reinforcement learning agents. Our approach improves sample efficiency and performance across a range of partially observable benchmarks.",
      links: [
        { label: "ABS", href: "https://arxiv.org/abs/2511.06946" },
        { label: "ARXIV", href: "https://arxiv.org/abs/2511.06946" },
        { label: "PDF", href: "https://arxiv.org/pdf/2511.06946" }
      ]
    }
  ],
  links: [
    { label: "email", href: "mailto:danieldediosallegue@gmail.com", icon: "fas fa-envelope" },
    { label: "GitHub", href: "https://github.com/daniallegue", icon: "fab fa-github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/danielallegue", icon: "fab fa-linkedin" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=Y5EUuXwAAAAJ&hl=es&oi=sra", icon: "ai ai-google-scholar" }
  ]
};
