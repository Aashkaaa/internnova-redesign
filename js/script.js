// ---------- Data ----------
const tabInfo = {
  basic: "Hands-on, project-based internships that take you from fundamentals to real-world applications.",
  pro: "Mentor-led programs with personalised career guidance and advanced career support.",
  courses: "Rigorous training programs designed to prepare you for top-tier product companies."
};

const programs = {
  basic: [
    {
      tag: "D-01",
      title: "Web Development",
      text: "HTML, CSS, JavaScript, Git and a final project.",
      points: ["6-week guided internship", "Weekly tasks", "Certificate included"]
    },
    {
      tag: "D-02",
      title: "Data Analytics",
      text: "Excel, Power BI, SQL and dashboard creation.",
      points: ["6-week guided internship", "Weekly tasks", "Certificate included"]
    },
    {
      tag: "D-03",
      title: "Cyber Security",
      text: "Network security, ethical hacking basics and cyber awareness.",
      points: ["6-week guided internship", "Weekly tasks", "Certificate included"]
    }
  ],
  pro: [
    {
      tag: "PRO",
      title: "Artificial Intelligence",
      text: "Mentor-led AI program with real-world projects.",
      points: ["Real-world projects", "Expert mentorship", "Career guidance", "Premium certificate"]
    },
    {
      tag: "PRO",
      title: "AI & Machine Learning",
      text: "Build and evaluate machine learning models on industry-oriented tasks.",
      points: ["Hands-on learning", "Expert mentorship", "Career guidance", "Premium certificate"]
    },
    {
      tag: "PRO",
      title: "CAD Design & Drafting",
      text: "Learn design and drafting through industry-oriented tasks.",
      points: ["Real-world projects", "Hands-on learning", "Career guidance", "Premium certificate"]
    }
  ],
  courses: [
    {
      tag: "COURSE-C01",
      title: "Data Structures & Algorithms",
      text: "Crack top tech interviews with intensive problem-solving sessions.",
      points: ["Verified industry certificate", "90-day guided learning track", "1:1 personal mentor sessions", "Resume & LinkedIn portfolio review"],
      price: 2999,
      was: 5999
    },
    {
      tag: "COURSE-C02",
      title: "Java Programming",
      text: "Core Java, OOP, exception handling, collections and file handling.",
      points: ["Verified industry certificate", "90-day guided learning track", "1:1 personal mentor sessions", "Resume & LinkedIn portfolio review"],
      price: 2999,
      was: 5999
    },
    {
      tag: "COURSE-C03",
      title: "Data Analytics & Business Intelligence",
      text: "Data analysis, visualisation and BI with industry-relevant tools.",
      points: ["Verified industry certificate", "90-day guided learning track", "1:1 personal mentor sessions", "Resume & LinkedIn portfolio review"],
      price: 2999,
      was: 5999
    }
  ]
};

const testimonials = [
  {
    quote: "Completing the tasks helped me revisit the courses from my earlier semesters.",
    name: "Ratantosh J.",
    role: "Data Analytics intern"
  },
  {
    quote: "A great learning opportunity where I gained practical knowledge of cyber security.",
    name: "Nageshwar S.",
    role: "Cyber Security intern"
  },
  {
    quote: "The internship was not tiring, and it was fun to learn new concepts through the tasks.",
    name: "Sinchana G.",
    role: "Cyber Security intern"
  },
  {
    quote: "A really useful platform with practical tasks and a smooth learning experience.",
    name: "Savitri T.",
    role: "Data Analytics intern"
  }
];

// ---------- Helpers ----------
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function initials(name) {
  return name
    .replace(".", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ---------- Footer year ----------
$("#year").textContent = new Date().getFullYear();

// ---------- Theme toggle ----------
const root = document.documentElement;
const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeIcon.innerHTML = theme === "dark" ? "&#9728;" : "&#9790;";
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
});

// ---------- Mobile navigation ----------
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");

function closeNav() {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeNav();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

// ---------- Header, back-to-top, active link ----------
const header = $("#siteHeader");
const toTop = $("#toTop");
const sectionLinks = [...$$(".nav-links a[href^='#']")].filter(
  (link) => link.getAttribute("href").length > 1 && document.querySelector(link.getAttribute("href"))
);

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 10);
  toTop.hidden = window.scrollY < 600;

  let currentId = "";
  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section.getBoundingClientRect().top <= 140) currentId = link.getAttribute("href");
  });
  sectionLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentId);
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
onScroll();

// ---------- Programs tabs ----------
const tabs = $$(".tab");
const grid = $("#programGrid");
const tabDesc = $("#tabDesc");

function renderPrograms(type) {
  tabDesc.textContent = tabInfo[type];
  grid.innerHTML = "";

  programs[type].forEach((item) => {
    const card = document.createElement("article");
    card.className = "program-card";

    const list = item.points.map((point) => `<li>${point}</li>`).join("");
    const price = item.price
      ? `<div class="card-price">
           <strong>&#8377;${item.price}</strong>
           <s>&#8377;${item.was}</s>
           <span>${Math.round(((item.was - item.price) / item.was) * 100)}% OFF</span>
         </div>`
      : "";
    const label = type === "courses" ? "Enroll now" : "Apply now";

    card.innerHTML = `
      <span class="card-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>${list}</ul>
      <div class="card-foot">
        ${price}
        <a class="btn btn-primary" href="https://internnova.co.in" target="_blank" rel="noopener">${label}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    grid.setAttribute("aria-labelledby", tab.id);
    renderPrograms(tab.dataset.tab);
  });
});

// ---------- Testimonials slider ----------
const slideCard = $("#slideCard");
const slideDots = $("#slideDots");
let slideIndex = 0;
let slideTimer;

function renderSlide() {
  const item = testimonials[slideIndex];
  slideCard.classList.remove("fade");
  void slideCard.offsetWidth;
  slideCard.classList.add("fade");
  slideCard.innerHTML = `
    <div class="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <blockquote>&ldquo;${item.quote}&rdquo;</blockquote>
    <div class="slide-author">
      <span class="avatar">${initials(item.name)}</span>
      <div><strong>${item.name}</strong><span>${item.role}</span></div>
    </div>
  `;
  [...slideDots.children].forEach((dot, i) => dot.classList.toggle("active", i === slideIndex));
}

function goToSlide(index) {
  slideIndex = (index + testimonials.length) % testimonials.length;
  renderSlide();
}

function restartAutoPlay() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(slideIndex + 1), 6000);
}

testimonials.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
  dot.addEventListener("click", () => {
    goToSlide(i);
    restartAutoPlay();
  });
  slideDots.appendChild(dot);
});

$("#prevSlide").addEventListener("click", () => {
  goToSlide(slideIndex - 1);
  restartAutoPlay();
});

$("#nextSlide").addEventListener("click", () => {
  goToSlide(slideIndex + 1);
  restartAutoPlay();
});

// ---------- FAQ accordion ----------
$$(".faq-q").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    $$(".faq-q").forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      other.closest(".faq-item").querySelector(".faq-a").style.maxHeight = null;
    });

    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");
      const answer = button.closest(".faq-item").querySelector(".faq-a");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ---------- Newsletter validation ----------
const newsForm = $("#newsForm");
const newsEmail = $("#newsEmail");
const newsMsg = $("#newsMsg");

newsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = newsEmail.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  newsEmail.classList.toggle("invalid", !valid);
  newsMsg.className = "form-msg " + (valid ? "success" : "error");
  newsMsg.textContent = valid
    ? "Thanks for subscribing! You'll hear from us soon."
    : "Please enter a valid email address.";

  if (valid) newsForm.reset();
});

// ---------- Animated counters ----------
function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ---------- Scroll reveal ----------
const revealItems = $$(".reveal");
const counters = $$(".stat-num");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item, i) => {
    item.style.transitionDelay = (i % 4) * 80 + "ms";
    revealObserver.observe(item);
  });

  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((counter) => countObserver.observe(counter));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
  counters.forEach((counter) => {
    counter.textContent = counter.dataset.count + (counter.dataset.suffix || "");
  });
}

// ---------- Init ----------
applyTheme("dark");
renderPrograms("basic");
renderSlide();
restartAutoPlay();