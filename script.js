const header = document.querySelector("[data-elevate]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-links a")];
const chips = [...document.querySelectorAll(".chip")];
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const revealItems = [...document.querySelectorAll(".reveal")];
const sections = [...document.querySelectorAll("main section[id]")];

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

menuToggle.addEventListener("click", () => {
  header.classList.toggle("is-open");
  const isOpen = header.classList.contains("is-open");
  menuToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => header.classList.remove("is-open"));
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle("active", item === chip));
    galleryItems.forEach((item) => {
      item.classList.toggle("is-hidden", filter !== "all" && item.dataset.kind !== filter);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -48% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("load", () => {
  updateHeader();
  if (window.lucide) window.lucide.createIcons();
});
