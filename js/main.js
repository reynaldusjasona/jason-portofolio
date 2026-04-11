/**
 * Jason Agnus Dei — Portfolio JavaScript
 *
 * This file handles:
 * 1. Navbar scroll behavior (add shadow when scrolled)
 * 2. Mobile hamburger menu toggle
 * 3. Scroll reveal animations (fade in sections on scroll)
 * 4. Active nav link highlight (which section you're in)
 * 5. Contact form handling
 * 6. Footer copyright year (auto-updates each year)
 */


// ============================================================
// 1. NAVBAR: Add "scrolled" class when user scrolls down
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 2. MOBILE MENU: Toggle open/close on hamburger click
// ============================================================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


// ============================================================
// 3. SCROLL REVEAL: Fade in elements as they come into view
// ============================================================
// The CSS has .reveal { opacity: 0; transform: translateY(30px) }
// When IntersectionObserver detects the element, we add .visible
// which animates it into place.

const revealElements = document.querySelectorAll(
  '.section-title, .section-subtitle, .section-label, ' +
  '.about-text, .about-sidebar, ' +
  '.skill-category, ' +
  '.project-card, ' +
  '.timeline-item, ' +
  '.leadership-card, ' +
  '.learning-card, .reading-block, ' +
  '.contact-info, .contact-form, ' +
  '.hero-badge, .hero-name, .hero-title, .hero-description, .hero-cta, .hero-stats'
);

// Add the "reveal" class to everything we want to animate
revealElements.forEach(el => {
  el.classList.add('reveal');
});

// Use IntersectionObserver to watch when elements enter the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing (no need to re-animate)
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,       // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -40px 0px'  // Trigger slightly before fully in view
  }
);

revealElements.forEach(el => observer.observe(el));


// ============================================================
// 4. ACTIVE NAV LINK: Highlight which section you're in
// ============================================================
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  },
  {
    threshold: 0.4   // Section must be 40% visible to be "active"
  }
);

sections.forEach(section => sectionObserver.observe(section));


// ============================================================
// 5. CONTACT FORM: Basic handling
//    NOTE: This just shows a success message in the browser.
//    To actually send emails, connect to Formspree:
//    1. Sign up at https://formspree.io (free)
//    2. Create a form and get your endpoint URL
//    3. Replace the form action attribute in index.html:
//       <form action="https://formspree.io/f/YOUR_ID" method="POST">
// ============================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevents default page reload

    const name = document.getElementById('name').value;

    // Show a simple success message (replace with real submission later)
    contactForm.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">&#10003;</div>
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #1A1A2E; margin-bottom: 0.75rem;">
          Message Received, ${name}!
        </h3>
        <p style="color: #4A4A6A; font-size: 0.95rem; line-height: 1.7;">
          Thanks for reaching out. I'll get back to you as soon as I can.<br/>
          In the meantime, feel free to connect with me on LinkedIn.
        </p>
      </div>
    `;
  });
}


// ============================================================
// 6. FOOTER YEAR: Auto-update copyright year
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ============================================================
// 7. LEARNING BARS: Animate progress bars when they scroll in
// ============================================================
// The bars start at width: 0 and animate to their target width
// when the section becomes visible.

const learningFills = document.querySelectorAll('.learning-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // The target width is set inline in HTML (e.g., style="width: 55%")
        // We store it, set it to 0 first, then animate back to target
        const fill = entry.target;
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        // Small delay so the animation is visible
        setTimeout(() => {
          fill.style.width = targetWidth;
        }, 200);
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

learningFills.forEach(fill => barObserver.observe(fill));
