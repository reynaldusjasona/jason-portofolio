// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Navbar scroll state
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// Active nav link — highlight current section
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// Scroll reveal — observe all animation classes
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-up, .anim-right, .anim-left, .anim-scale')
  .forEach(el => revealObserver.observe(el));

// Cert track — drag to scroll on desktop
const certsTrack = document.querySelector('.certs-track');
if (certsTrack) {
  let isDragging = false, startX, scrollLeft;

  certsTrack.addEventListener('mousedown', e => {
    isDragging = true;
    startX     = e.pageX - certsTrack.offsetLeft;
    scrollLeft = certsTrack.scrollLeft;
    certsTrack.style.cursor = 'grabbing';
  });
  certsTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    certsTrack.style.cursor = 'grab';
  });
  certsTrack.addEventListener('mouseup', () => {
    isDragging = false;
    certsTrack.style.cursor = 'grab';
  });
  certsTrack.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x    = e.pageX - certsTrack.offsetLeft;
    const walk = (x - startX) * 1.4;
    certsTrack.scrollLeft = scrollLeft - walk;
  });
}

// Contact form — submit to Formspree, show success panel
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        contactForm.hidden = true;
        formSuccess.hidden = false;
      } else {
        submitBtn.textContent = 'Failed — email me directly';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Network error — email me directly';
      submitBtn.disabled = false;
    }
  });
}
