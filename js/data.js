/* ==========================================================
   PORTFOLIO CONTENT
   Edit only this file to update your portfolio.
   - Add a project: copy one object inside `projects` and edit it.
   - Add a skill: add a string to an `items` list.
   - Leave a project `links` list empty ([]) if it has no public link.
   ========================================================== */
const PORTFOLIO = {
  name: "Mubeen Yousaf",
  role: "Frontend & Shopify Developer",
  location: "Lahore, Pakistan",
  photo: "assets/profile-176.webp", // small copy of assets/profile.jpeg (shown at 88px)
  status: "Open to remote jobs and freelance work",
  repo: "https://github.com/mubeendhudi/my-portfolio", // "View source" link in the footer

  heroTitle: "I build Shopify storefronts and fast, responsive interfaces",
  heroIntro:
    "I'm a frontend developer working with HTML, CSS, JavaScript, React and Liquid. I'm open to remote jobs and freelance projects, and I'm learning full-stack development next.",

  about: [
    "I turn Figma designs into clean, production-ready code. At Fixelcloud I customized Shopify theme sections, fixed UI bugs and tuned pages for speed and cross-browser consistency.",
    "I like readable code, reusable sections and layouts that work on every screen size. Right now I'm extending my skills beyond the frontend: Node.js, databases, Shopify apps and cloud tools."
  ],

  skills: [
    { group: "Working with", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Shopify themes", "Liquid", "Responsive layouts", "Figma to code", "Git and GitHub"] },
    { group: "Learning next", items: ["Node.js and Express", "PostgreSQL and MongoDB", "Shopify app development (Remix, GraphQL)", "AWS and Docker", "AI workflows and automation"] }
  ],

  /* Flagship project: shown in its own large section right below the hero.
     preview: a 1280x680 WebP screenshot in assets/previews/. */
  featured: {
    title: "Store Audit Checker",
    badge: "Original idea, designed and built solo",
    year: "2026",
    tagline: "A free audit tool that tells Shopify store owners what is slowing their store down and how to fix it.",
    summary:
      "Enter a Shopify store URL and the tool tests the whole store, not just the homepage: products, collections, content pages, a blog post and the cart. In a few minutes it returns a score out of 100, section scores and a prioritised list of fixes.",
    url: "https://store-audit-checker.vercel.app/",
    preview: "assets/previews/store-audit-checker.webp",
    why: [
      "Slow pages, heavy apps and missing SEO tags cost sales, but PageSpeed and Lighthouse reports are written for developers. This turns them into plain-language fixes a store owner can act on.",
      "Each fix is ranked High, Medium or Low impact, explains why it matters, shows the evidence and lists the pages it was found on.",
      "The report exports to a clean A4 PDF, ready to send to a developer or agency."
    ],
    features: [
      "Whole-store audit: reads the sitemap and samples about a dozen pages across every theme template",
      "Speed and Core Web Vitals from Google PageSpeed Insights (Lighthouse 13)",
      "Checks for render-blocking scripts and app bloat, images, SEO, mobile and accessibility",
      "Weighted scoring across six sections, with a clear pass, warn or fail for every check",
      "Safe server-side fetching: blocks private networks and DNS rebinding, with rate limits and caching",
      "Keyboard and screen-reader friendly, with automated unit tests for the checks, scoring and URL safety"
    ],
    stack: ["React 19", "Vite", "Node.js", "Express 5", "Cheerio", "PageSpeed Insights API", "Vercel"]
  },

  projects: [
    {
      title: "Custom Shopify store development",
      year: "2026",
      summary: "Custom theme sections and interactive components for e-commerce storefronts.",
      points: [
        "Wrote Liquid sections with schema settings so store owners can edit content in the theme editor.",
        "Built CSS keyframe animations, a sticky hero scroll feature and dynamic product sections."
      ],
      stack: ["Liquid", "CSS", "JavaScript"],
      links: [] // e.g. { label: "Live store", url: "https://..." }
    },
    {
      title: "AI Flower Health Advisor",
      year: "2025 – May 2026",
      summary: "Final year project. A web app that detects plant diseases from photos and suggests preventive measures.",
      points: [
        "Led the frontend and designed the workflows for image upload, detection results and advice screens.",
        "Ran manual testing and bug tracking to keep navigation smooth and layouts responsive."
      ],
      stack: ["Frontend", "UI workflows", "Testing"],
      links: [] // e.g. { label: "Source code", url: "https://github.com/..." }
    }
  ],

  /* Live project cards.
     preview: "live"                       -> shows the real site as a small preview (works for GitHub Pages)
     preview: "assets/previews/name.webp"  -> shows a screenshot (needed for Shopify, which blocks embedding; keep it a ~960px wide WebP)
     password: only for password-protected Shopify stores. Remove the line if none. */
  liveProjects: [
    {
      title: "Agency Website",
      type: "Frontend",
      summary: "Responsive agency website built with HTML, CSS and JavaScript.",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://mubeendhudi.github.io/agency-website/",
      preview: "live"
    },
    {
      title: "Naho Trading",
      type: "Frontend",
      summary: "Responsive business website for a trading company.",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://mubeendhudi.github.io/naho-trading/",
      preview: "live"
    },
    {
      title: "MYD Store",
      type: "Shopify",
      summary: "Shopify storefront with custom theme sections.",
      stack: ["Shopify", "Liquid", "CSS"],
      url: "https://myd-store-8iycb5qv.myshopify.com/",
      password: "0000",
      preview: "assets/previews/store-1.webp"
    },
    {
      title: "Shopify Store 2",
      type: "Shopify",
      summary: "Shopify storefront with custom theme sections.",
      stack: ["Shopify", "Liquid", "CSS"],
      url: "https://store-872lahl8.myshopify.com/",
      password: "0000",
      preview: "assets/previews/store-2.webp"
    }
  ],

  experience: [
    { title: "Frontend Developer Intern", place: "Fixelcloud", period: "2026", text: "Built responsive interfaces with HTML, CSS, JavaScript and Liquid, turned Figma designs into production code, and customized Shopify theme sections for speed and compatibility." },
    { title: "BS in Information Technology", place: "The Islamia University of Bahawalpur", period: "2022 – 2026", text: "" }
  ],

  contact: {
    email: "mubeenyousaf577@gmail.com",
    phone: "+92 303 6994048",
    linkedin: "https://www.linkedin.com/in/mubeen-yousaf/",
    github: "https://github.com/mubeendhudi",
    cv: "assets/Mubeen Yousaf Dev.pdf", // put your CV PDF in the assets folder with this name
    formKey: "514031c6-f51a-479a-bde9-2ad550df5b59",
    // Optional: Google Ads conversion, e.g. "AW-123456789/AbCdEfGh". Leave "" until Ads is set up.
    adsConversion: ""
  }
};

if (typeof module !== "undefined") module.exports = PORTFOLIO;
