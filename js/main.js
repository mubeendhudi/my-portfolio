/* Builds the page from PORTFOLIO (see js/data.js). No need to edit this file for content changes. */
const $ = (id) => document.getElementById(id);
const P = PORTFOLIO;

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const chips = (items, small = "") => items.map((i) => `<span class="chip ${small}">${i}</span>`).join("");

const renderSkills = () =>
  P.skills.map((s) => `<div class="skill-group"><h3>${s.group}</h3><div class="chips">${chips(s.items)}</div></div>`).join("");

/* Looping skill strips: each group becomes one row, every second row runs in reverse. */
const renderMarquee = () =>
  P.skills.map((s, i) => `<div class="marquee${i % 2 ? " reverse" : ""}" aria-hidden="true">
    <div class="track">${chips(s.items).repeat(4)}</div></div>`).join("");

const renderProjects = () =>
  P.projects.map((p) => `
    <article class="project">
      <div class="row"><h3>${p.title}</h3><span class="meta">${p.year}</span></div>
      <p>${p.summary}</p>
      ${list(p.points)}
      <div class="chips">${chips(p.stack, "small")}</div>
      ${p.links.map((l) => `<a class="text-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(" ")}
    </article>`).join("");

/* Live project cards: "live" previews embed the site in a scaled-down iframe, anything else is a screenshot path. */
const renderLive = () =>
  P.liveProjects.map((p) => {
    const media = p.preview === "live"
      ? `<iframe src="${p.url}" title="${p.title} preview" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin"></iframe>`
      : `<img class="shot" src="${p.preview}" alt="" loading="lazy">`;
    return `
    <article class="live-card">
      <a class="preview" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${p.title} in a new tab">
        <div class="frame">${media}</div>
        <span class="open-hint">Open site ↗</span>
      </a>
      <div class="live-info">
        <div class="row"><h3>${p.title}</h3><span class="chip small">${p.type}</span></div>
        <p>${p.summary}</p>
        <div class="chips">${chips(p.stack, "small")}</div>
        ${p.password ? `<p class="meta">Store password: <code>${p.password}</code></p>` : ""}
        <div class="actions"><a class="btn btn-primary" href="${p.url}" target="_blank" rel="noopener noreferrer">Open live site</a></div>
      </div>
    </article>`;
  }).join("");

const renderExperience = () =>
  P.experience.map((e) => `
    <article class="project">
      <div class="row"><h3>${e.title}</h3><span class="meta">${e.period}</span></div>
      <p class="meta">${e.place}</p>
      ${e.text ? `<p>${e.text}</p>` : ""}
    </article>`).join("");

const renderContact = () => {
  const c = P.contact;
  return `<p>Have a project or a role in mind? Send me a message.</p>
    <ul class="contact-list">
      <li><a href="mailto:${c.email}">${c.email}</a></li>
      <li><a href="tel:${c.phone.replace(/\s/g, "")}">${c.phone}</a></li>
      <li><a href="${c.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="${c.github}" target="_blank" rel="noopener">GitHub</a></li>
    </ul>`;
};

$("brand").textContent = P.name;
$("hero-title").textContent = P.heroTitle;
$("hero-intro").textContent = P.heroIntro;
$("cv-link").href = P.contact.cv;
$("hire-btn").href = `mailto:${P.contact.email}?subject=${encodeURIComponent("Project or job opportunity")}`;
$("photo").src = P.photo;
$("photo").alt = `${P.name}, ${P.role}`;
$("marquees").innerHTML = renderMarquee();
$("about-body").innerHTML = P.about.map((t) => `<p>${t}</p>`).join("");
$("skills-body").innerHTML = renderSkills();
$("projects-body").innerHTML = renderProjects();
$("live-body").innerHTML = renderLive();
$("experience-body").innerHTML = renderExperience();

/* Iframe previews render at 1280x800 and are scaled down to fit the card width. */
const scaler = new ResizeObserver((entries) =>
  entries.forEach(({ target, contentRect }) => {
    const frame = target.querySelector("iframe");
    if (frame) frame.style.transform = `scale(${contentRect.width / 1280})`;
  })
);
document.querySelectorAll(".frame").forEach((el) => scaler.observe(el));

/* If a screenshot file is missing, show a placeholder instead of a broken image. */
document.querySelectorAll(".shot").forEach((img) =>
  img.addEventListener("error", () => img.closest(".frame").classList.add("is-missing"))
);
$("contact-body").innerHTML = renderContact();
$("footer-text").textContent = `© ${new Date().getFullYear()} ${P.name}. ${P.role}, ${P.location}.`;

/* Mobile menu: open/close, close on link click, outside click, Escape or when resized to desktop. */
const header = document.querySelector(".site-header");
const toggle = $("nav-toggle");

const setMenu = (open) => {
  header.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

toggle.addEventListener("click", () => setMenu(!header.classList.contains("is-open")));
$("site-nav").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("click", (e) => { if (!header.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 700) setMenu(false); });