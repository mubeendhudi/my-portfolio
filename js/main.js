/* Builds the page from PORTFOLIO (see js/data.js). No need to edit this file for content changes. */
const $ = (id) => document.getElementById(id);
const P = PORTFOLIO;

const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const renderSkills = () =>
  P.skills.map((s) => `<div class="skill-group"><h3>${s.group}</h3>${list(s.items)}</div>`).join("");

const renderProjects = () =>
  P.projects.map((p) => `
    <article class="project">
      <div class="row"><h3>${p.title}</h3><span class="meta">${p.year}</span></div>
      <p>${p.summary}</p>
      ${list(p.points)}
      <p class="meta">${p.stack.join(", ")}</p>
      ${p.links.map((l) => `<a class="text-link" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join(" ")}
    </article>`).join("");

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
$("about-body").innerHTML = P.about.map((t) => `<p>${t}</p>`).join("");
$("skills-body").innerHTML = renderSkills();
$("projects-body").innerHTML = renderProjects();
$("experience-body").innerHTML = renderExperience();
$("contact-body").innerHTML = renderContact();
$("footer-text").textContent = `© ${new Date().getFullYear()} ${P.name}. ${P.role}, ${P.location}.`;