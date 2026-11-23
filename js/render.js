/* Turns PORTFOLIO (js/data.js) into HTML. Shared by the browser (main.js) and by
   scripts/prerender.js, which writes the same HTML into index.html so search engines
   and link previews see the full page without running JavaScript. */
const Render = (() => {
  const SITE = "https://mubeenyousaf.site/";

  const esc = (s) => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

  const chips = (items, extra = "") => items.map((i) => `<li class="chip ${extra}">${esc(i)}</li>`).join("");

  /* Skills: the first group is what I use now (solid chips), later groups are in progress (dashed chips). */
  const skills = (P) =>
    P.skills.map((s, i) => `
    <div class="skill-group">
      <h3>${esc(s.group)}</h3>
      <ul class="chips">${chips(s.items, i ? "is-next" : "")}</ul>
    </div>`).join("");

  const projects = (P) =>
    P.projects.map((p) => `
    <article class="project">
      <div class="project-head">
        <h3>${esc(p.title)}</h3>
        <span class="meta">${esc(p.year)}</span>
      </div>
      <div class="project-body">
        <p>${esc(p.summary)}</p>
        ${list(p.points)}
        <ul class="chips">${chips(p.stack, "small")}</ul>
        ${p.links.map((l) => `<a class="text-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join(" ")}
      </div>
    </article>`).join("");

  /* Flagship project: a large screenshot in a browser frame, then why it matters, features and stack. */
  const featured = (P) => {
    const f = P.featured;
    const host = f.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `
    <article class="flagship">
      <a class="flagship-shot" href="${esc(f.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(f.title)} in a new tab">
        <span class="browser-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="url">${esc(host)}</span></span>
        <img src="${esc(f.preview)}" alt="${esc(f.title)} report: overall score, section scores and a prioritised fix list for a Shopify store" width="1280" height="680" loading="lazy" decoding="async">
      </a>
      <div class="flagship-intro">
        <p class="flagship-badge">${esc(f.badge)}</p>
        <div class="row"><h3>${esc(f.title)}</h3><span class="meta">${esc(f.year)}</span></div>
        <p class="flagship-tagline">${esc(f.tagline)}</p>
        <p>${esc(f.summary)}</p>
        <ul class="chips">${chips(f.stack, "small")}</ul>
        <div class="actions"><a class="btn btn-primary" href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">Try it live</a></div>
      </div>
      <div class="flagship-detail">
        <div>
          <h4>Why store owners need it</h4>
          ${list(f.why)}
        </div>
        <div>
          <h4>Key features</h4>
          ${list(f.features)}
        </div>
      </div>
    </article>`;
  };

  /* Live project cards, drawn as a small browser window.
     "live" previews embed the real site in an iframe with a screen-size switch; anything else is a screenshot path. */
  const DEVICES = { mobile: [375, 667], tablet: [768, 1024], desktop: [1280, 800] };

  const live = (P) =>
    P.liveProjects.map((p) => {
      const isLive = p.preview === "live";
      const media = isLive
        ? `<iframe src="${esc(p.url)}" title="${esc(p.title)} preview" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>`
        : `<img class="shot" src="${esc(p.preview)}" alt="Screenshot of the ${esc(p.title)} homepage" width="960" height="457" loading="lazy" decoding="async">`;
      const sizes = isLive
        ? `<div class="sizes" role="group" aria-label="Preview screen size for ${esc(p.title)}">
          ${Object.keys(DEVICES).map((d) =>
            `<button type="button" data-device="${d}" aria-pressed="${d === "desktop"}">${d[0].toUpperCase() + d.slice(1)}</button>`).join("")}
        </div>`
        : `<span class="meta">Screenshot</span>`;
      return `
    <article class="live-card">
      <div class="browser-bar">
        <span class="url">${esc(p.url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</span>
        ${sizes}
      </div>
      <a class="preview" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(p.title)} in a new tab">
        <div class="frame" data-device="desktop">${media}</div>
      </a>
      <div class="live-info">
        <div class="row"><h3>${esc(p.title)}</h3><span class="chip small">${esc(p.type)}</span></div>
        <p>${esc(p.summary)}</p>
        <ul class="chips">${chips(p.stack, "small")}</ul>
        ${p.password ? `<p class="meta">Store password: <code>${esc(p.password)}</code></p>` : ""}
        <div class="actions"><a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Open live site</a></div>
      </div>
    </article>`;
    }).join("");

  const experience = (P) =>
    P.experience.map((e) => `
    <li>
      <span class="meta">${esc(e.period)}</span>
      <h3>${esc(e.title)}</h3>
      <p class="meta">${esc(e.place)}</p>
      ${e.text ? `<p>${esc(e.text)}</p>` : ""}
    </li>`).join("");

  const contact = (P) => {
    const c = P.contact;
    return `<div class="contact-info">
      <p>Have a project or a role in mind? Send me a message.</p>
      <address>
      <ul class="contact-list">
        <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
        <li><a href="tel:${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a></li>
        <li><a href="${esc(c.linkedin)}" target="_blank" rel="noopener me">LinkedIn</a></li>
        <li><a href="${esc(c.github)}" target="_blank" rel="noopener me">GitHub</a></li>
      </ul>
      </address>
    </div>
    <form class="contact-form" id="contact-form">
      <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="field">
        <label for="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" autocomplete="name" placeholder="Your name" required maxlength="80">
      </div>
      <div class="field">
        <label for="cf-service">Service</label>
        <select id="cf-service" name="service" required>
          <option value="" disabled selected>Select a service</option>
          <option>Web Development</option>
          <option>Shopify Development</option>
          <option>Other</option>
        </select>
      </div>
      <div class="field">
        <label for="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="120">
      </div>
      <div class="field">
        <label for="cf-phone">Phone <span class="meta">(optional)</span></label>
        <input id="cf-phone" name="phone" type="tel" autocomplete="tel" placeholder="+92 300 1234567" maxlength="20">
      </div>
      <button class="btn btn-primary" id="cf-submit" type="submit">Send message</button>
      <p class="form-status" id="cf-status" role="status" aria-live="polite"></p>
    </form>`;
  };

  /* Element id -> inner HTML for every content slot on the page. */
  const sections = (P, year = new Date().getFullYear()) => ({
    "brand": esc(P.name),
    "status-text": esc(P.status),
    "hero-title": esc(P.heroTitle),
    "hero-intro": esc(P.heroIntro),
    "byline-name": esc(P.name),
    "byline-meta": esc(`${P.role}, ${P.location}`),
    "about-body": P.about.map((t) => `<p>${esc(t)}</p>`).join(""),
    "skills-body": skills(P),
    "featured-body": featured(P),
    "projects-body": projects(P),
    "live-body": live(P),
    "experience-body": experience(P),
    "contact-body": contact(P),
    "footer-text": esc(`© ${year} ${P.name}. ${P.role}, ${P.location}.`),
    "footer-built": `Built with HTML, CSS and JavaScript, no framework and no build step. <a href="${esc(P.repo)}" target="_blank" rel="noopener">View the source on GitHub</a>`
  });

  /* Schema.org structured data (JSON-LD) describing the person, the site and this profile page. */
  const jsonLd = (P) => {
    const c = P.contact;
    const [city, country] = P.location.split(",").map((s) => s.trim());
    const school = P.experience.find((e) => /^(BS|BSc|MS|MSc|BA|MA|PhD)\b/.test(e.title));
    const person = {
      "@type": "Person",
      "@id": `${SITE}#person`,
      name: P.name,
      jobTitle: P.role,
      description: P.heroIntro,
      url: SITE,
      image: { "@type": "ImageObject", url: `${SITE}assets/profile-400.jpg`, width: 400, height: 400 },
      email: `mailto:${c.email}`,
      telephone: c.phone.replace(/\s/g, ""),
      address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country === "Pakistan" ? "PK" : country },
      sameAs: [c.linkedin, c.github],
      knowsAbout: P.skills[0].items,
      knowsLanguage: ["en", "ur"]
    };
    if (school) person.alumniOf = { "@type": "CollegeOrUniversity", name: school.place };

    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE}#website`,
          url: SITE,
          name: `${P.name} – ${P.role}`,
          inLanguage: "en",
          publisher: { "@id": `${SITE}#person` }
        },
        {
          "@type": "ProfilePage",
          "@id": `${SITE}#profilepage`,
          url: SITE,
          name: `${P.name} | ${P.role}`,
          isPartOf: { "@id": `${SITE}#website` },
          about: { "@id": `${SITE}#person` },
          mainEntity: { "@id": `${SITE}#person` },
          primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}assets/og-image.jpg`, width: 1200, height: 630 },
          inLanguage: "en"
        },
        person,
        {
          "@type": "WebApplication",
          "@id": `${SITE}#flagship`,
          name: P.featured.title,
          description: P.featured.tagline,
          url: P.featured.url,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any (web browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          creator: { "@id": `${SITE}#person` }
        },
        {
          "@type": "ItemList",
          "@id": `${SITE}#projects`,
          name: "Live projects",
          itemListElement: P.liveProjects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "CreativeWork", name: p.title, description: p.summary, url: p.url, creator: { "@id": `${SITE}#person` } }
          }))
        }
      ]
    };
    return JSON.stringify(graph, null, 2).replace(/</g, "\\u003c");
  };

  return { DEVICES, sections, jsonLd, esc };
})();

if (typeof module !== "undefined") module.exports = Render;
