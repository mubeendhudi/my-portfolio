/* Page behaviour. Content comes from js/data.js and is turned into HTML by js/render.js. */
const $ = (id) => document.getElementById(id);
const P = PORTFOLIO;

const DEVICES = Render.DEVICES;

/* Contact form: sends the data to the owner's email through Web3Forms (no backend needed). */
const setupContactForm = () => {
  const form = $("contact-form");
  const status = $("cf-status");
  const button = $("cf-submit");
  const c = P.contact;

  const show = (text, type) => {
    status.textContent = text;
    status.className = `form-status ${type}`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!c.formKey || c.formKey.startsWith("YOUR_")) {
      show(`The form is not set up yet. Please email me at ${c.email}.`, "error");
      return;
    }

    const phone = form.elements.phone.value.trim();
    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      show("Please enter a valid phone number or leave it empty.", "error");
      return;
    }

    const data = new FormData(form);
    data.append("access_key", c.formKey);
    data.append("subject", `New inquiry: ${data.get("service")} (portfolio)`);
    data.append("from_name", "Portfolio contact form");

    button.disabled = true;
    button.textContent = "Sending...";
    show("", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Request failed");

      form.reset();
      show("Thanks! Your message was sent. I will reply soon.", "success");
      if (window.gtag && c.adsConversion) window.gtag("event", "conversion", { send_to: c.adsConversion });
    } catch {
      show(`Could not send the message. Please email me at ${c.email}.`, "error");
    } finally {
      button.disabled = false;
      button.textContent = "Send message";
    }
  });
};

/* Hero inspector: each code line points at the element it renders.
   Hover, focus or tap a line and that element is outlined with its real size, like browser DevTools. */
const setupInspector = () => {
  const t = (s) => `<span class="tk-tag">${s}</span>`;
  const a = (s) => `<span class="tk-attr">${s}</span>`;
  const s = (v) => `<span class="tk-str">"${v}"</span>`;
  const l = (v) => `<span class="tk-liquid">{{ ${v} }}</span>`;

  const lines = [
    { code: `${t("&lt;section")} ${a("class")}=${s("hero")}${t("&gt;")}`, target: "hero-render", label: "section.hero" },
    { code: `  ${t("&lt;p")} ${a("class")}=${s("status")}${t("&gt;")}${l("section.settings.status")}${t("&lt;/p&gt;")}`, target: "hero-status", label: "p.status" },
    { code: `  ${t("&lt;h1&gt;")}${l("section.settings.heading")}${t("&lt;/h1&gt;")}`, target: "hero-title", label: "h1" },
    { code: `  ${t("&lt;p")} ${a("class")}=${s("lead")}${t("&gt;")}${l("section.settings.intro")}${t("&lt;/p&gt;")}`, target: "hero-intro", label: "p.lead" },
    { code: `  ${t("&lt;div")} ${a("class")}=${s("actions")}${t("&gt;")}<span class="tk-liquid">{% render 'buttons' %}</span>${t("&lt;/div&gt;")}`, target: "hero-actions", label: "div.actions" },
    { code: `  ${l("section.settings.photo | image_tag")}`, target: "hero-byline", label: "div.byline" },
    { code: `${t("&lt;/section&gt;")}` }
  ];

  const code = $("hero-code");
  const host = $("hero-render");
  const box = $("inspect");
  const tag = $("inspect-tag");
  const fallback = lines[2]; // the h1 stays outlined when nothing else is selected
  let current = fallback;

  code.innerHTML = lines.map((ln, i) => ln.target
    ? `<li><button type="button" class="line" data-i="${i}" aria-label="Highlight ${ln.label}">${ln.code}</button></li>`
    : `<li><span class="line">${ln.code}</span></li>`).join("");

  const draw = () => {
    const el = $(current.target).getBoundingClientRect();
    const base = host.getBoundingClientRect();
    box.style.top = `${el.top - base.top}px`;
    box.style.left = `${el.left - base.left}px`;
    box.style.width = `${el.width}px`;
    box.style.height = `${el.height}px`;
    tag.textContent = `${current.label}  ${Math.round(el.width)} × ${Math.round(el.height)}`;
    code.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", lines[b.dataset.i] === current));
  };

  const select = (ln) => { current = ln; draw(); };

  const fromEvent = (e) => { const b = e.target.closest("button"); if (b) select(lines[b.dataset.i]); };

  code.addEventListener("mouseover", fromEvent);
  code.addEventListener("focusin", fromEvent);
  code.addEventListener("click", fromEvent);
  code.addEventListener("mouseleave", () => { if (!code.contains(document.activeElement)) select(fallback); });
  code.addEventListener("focusout", (e) => { if (!code.contains(e.relatedTarget)) select(fallback); });

  /* Phones and tablets: the code sits below the hero and there is no hover, so the outline
     steps through the elements by itself while the hero is on screen. Tapping a line scrolls
     up to the element it renders. */
  const stacked = window.matchMedia("(max-width: 980px)");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  const steps = lines.filter((ln) => ln.target);
  const hint = document.querySelector(".code-hint");
  const hintText = hint.textContent;
  let timer = 0;
  let onScreen = false;

  const tour = () => {
    clearInterval(timer);
    timer = 0;
    hint.textContent = stacked.matches
      ? "How I would write this hero as a Shopify section. Tap a line to jump to what it renders."
      : hintText;
    if (!stacked.matches || calm.matches || !onScreen) return;
    timer = setInterval(() => select(steps[(steps.indexOf(current) + 1) % steps.length]), 2200);
  };

  code.addEventListener("click", (e) => {
    if (!stacked.matches || !e.target.closest("button")) return;
    $(current.target).scrollIntoView({ behavior: calm.matches ? "auto" : "smooth", block: "center" });
    tour(); // restart the timer so the tapped element stays outlined for a full step
  });

  new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; tour(); }, { threshold: .35 }).observe(host);
  stacked.addEventListener("change", () => { select(fallback); tour(); });
  calm.addEventListener("change", tour);
  tour();

  /* Redraw whenever the hero or any outlined element changes size (resize, font load, text wrap). */
  const resizer = new ResizeObserver(draw);
  resizer.observe(host);
  lines.forEach((ln) => { if (ln.target) resizer.observe($(ln.target)); });
  if (document.fonts) document.fonts.ready.then(draw);
};

/* Live previews: the iframe renders at a real device size and is scaled down to fit the card. */
const fitFrame = (frame) => {
  const iframe = frame.querySelector("iframe");
  if (!iframe) return;
  const [w, h] = DEVICES[frame.dataset.device];
  const scale = Math.min(frame.clientWidth / w, frame.clientHeight / h);
  iframe.style.width = `${w}px`;
  iframe.style.height = `${h}px`;
  iframe.style.transform = `translateX(${(frame.clientWidth - w * scale) / 2}px) scale(${scale})`;
};

const setupLivePreviews = () => {
  const observer = new ResizeObserver((entries) => entries.forEach((e) => fitFrame(e.target)));
  document.querySelectorAll(".frame").forEach((el) => observer.observe(el));

  $("live-body").addEventListener("click", (e) => {
    const button = e.target.closest(".sizes button");
    if (!button) return;
    const card = button.closest(".live-card");
    const frame = card.querySelector(".frame");
    frame.dataset.device = button.dataset.device;
    card.querySelectorAll(".sizes button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    fitFrame(frame);
  });

  /* If a screenshot file is missing, show a placeholder instead of a broken image. */
  document.querySelectorAll(".shot").forEach((img) =>
    img.addEventListener("error", () => img.closest(".frame").classList.add("is-missing"))
  );
};

/* Mobile menu: open/close, close on link click, outside click, Escape or when resized to desktop. */
const setupMenu = () => {
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
  window.addEventListener("resize", () => { if (window.innerWidth > 760) setMenu(false); });
};

/* Marks the nav link of the section currently on screen. */
const setupActiveNav = () => {
  const links = [...document.querySelectorAll("#site-nav a")];
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.getAttribute("href") === `#${entry.target.id}`
        ? a.setAttribute("aria-current", "true")
        : a.removeAttribute("aria-current"));
    }), { rootMargin: "-35% 0px -60% 0px" });
  document.querySelectorAll("section.block").forEach((s) => observer.observe(s));
};

/* Fill every content slot from data.js. The same HTML is already in index.html (scripts/prerender.js),
   so this only matters when data.js changed and the prerender has not been run again. */
Object.entries(Render.sections(P)).forEach(([id, html]) => { $(id).innerHTML = html; });
$("cv-link").href = P.contact.cv;
$("photo").src = P.photo;
$("photo").alt = `Portrait of ${P.name}`;

setupMenu();
setupInspector();
setupLivePreviews();
setupContactForm();
setupActiveNav();
