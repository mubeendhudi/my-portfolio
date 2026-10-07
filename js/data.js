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
  photo: "assets/profile.jpeg", // replace the file in /assets to change your photo

  heroTitle: "I build Shopify storefronts and fast, responsive interfaces.",
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

  experience: [
    { title: "Frontend Developer Intern", place: "Fixelcloud", period: "2026", text: "Built responsive interfaces with HTML, CSS, JavaScript and Liquid, turned Figma designs into production code, and customized Shopify theme sections for speed and compatibility." },
    { title: "BS in Information Technology", place: "The Islamia University of Bahawalpur", period: "2022 – 2026", text: "" }
  ],

  contact: {
    email: "mubeenyousaf577@gmail.com",
    phone: "+92 303 6994048",
    linkedin: "https://www.linkedin.com/in/mubeen-yousaf/",
    github: "https://github.com/mubeendhudi",
    cv: "assets/Mubeen_Yousaf_CV.pdf" // put your CV PDF in the assets folder with this name
  }
};