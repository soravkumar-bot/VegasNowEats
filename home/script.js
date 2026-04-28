/* =============================================
   VegasNow Eats – Global Scripts
   ============================================= */

// ─── Mobile Nav Toggle ───────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ─── Sticky Header Glow on Scroll ────────────
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.borderBottomColor = 'rgba(255,77,28,0.2)';
    } else {
      header.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    }
  });
}

// ─── Scroll Reveal ────────────────────────────
const revealTargets = document.querySelectorAll(
  '.cat-card, .feat-card, .rest-card, .guide-card, .blog-card, .tip-card, .trend-item, .ci-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ─── Active nav auto-highlight ────────────────
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ─── Smooth scroll for hash links ────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Contact Form Handler ─────────────────────
function handleSubmit() {
  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('submitBtn');
  if (!name || !email || !message) return;

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert('Please fill in all required fields.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    alert('Please enter a valid email address.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send It →';
    btn.disabled = false;
    name.value = email.value = message.value = '';
    const subj = document.getElementById('subject');
    if (subj) subj.value = '';
    if (success) {
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 4000);
    }
  }, 1200);
}