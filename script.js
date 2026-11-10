const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

function setMenu(open) {
  header.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenu(!header.classList.contains("is-open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scroll);
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

const readMore = document.querySelector(".read-more");
const moreText = document.querySelector(".more-text");

readMore.addEventListener("click", () => {
  const willOpen = moreText.hasAttribute("hidden");
  moreText.toggleAttribute("hidden", !willOpen);
  readMore.textContent = willOpen ? "Show less" : "Read more";
  readMore.setAttribute("aria-expanded", String(willOpen));
});

document.querySelector("#downloadCv").addEventListener("click", () => {
  const cv = [
    "CREATIVE UI DESIGNER",
    "SaaSlogo Portfolio",
    "",
    "Summary",
    "Product-minded UI designer focused on clear interfaces,",
    "design systems, and responsive web experiences.",
    "",
    "Selected work",
    "- Marketing sites and product dashboards",
    "- Design systems, prototypes, and responsive layouts",
    "- Collaboration from first sketch through shipped UI",
    "",
    "Skills",
    "UI design, design systems, HTML, CSS, JavaScript, Figma",
    "",
    "Contact",
    "hello@saaslogo.example",
  ].join("\n");

  const file = new Blob([cv], { type: "text/plain" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "creative-ui-designer-cv.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    status.textContent = "Add your name, a valid email, and a short message.";
    status.classList.add("is-error");
    return;
  }

  status.classList.remove("is-error");
  status.textContent = `Thanks, ${name}. Your message is on its way.`;
  form.reset();
});
