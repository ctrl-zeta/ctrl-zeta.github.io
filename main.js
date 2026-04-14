/* ══════════════════════════════════════
   main.js — Portfolio Ciberseguridad
   ══════════════════════════════════════ */

const btn     = document.getElementById('toggle-btn');
const overlay = document.getElementById('overlay');
const sidebar = document.getElementById('sidebar');
const main    = document.getElementById('main');

// ── Toggle sidebar ──────────────────────
btn.addEventListener('click', () => {
  document.body.classList.toggle('sidebar-open');
});

overlay.addEventListener('click', () => {
  document.body.classList.remove('sidebar-open');
});

// Cierra sidebar en móvil al navegar
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      document.body.classList.remove('sidebar-open');
    }
  });
});

// ── Scroll suave hacia secciones ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const offset = 72; // altura header + margen
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Resaltar enlace activo en el sidebar ─
const sections  = document.querySelectorAll('.section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActive() {
  let current = '';
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}

window.addEventListener('scroll', setActive, { passive: true });
setActive();

// ── Fade-in al hacer scroll ─────────────
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  },
  { threshold: 0.08 }
);

fadeEls.forEach(el => observer.observe(el));

// ── Fallback avatar ──────────────────────
// Si la imagen falla (src vacío o roto), muestra iniciales
const avatar = document.getElementById('avatar');
if (avatar) {
  avatar.addEventListener('error', () => {
    avatar.style.display = 'none';
    const wrap = avatar.parentElement;
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width:100%; height:100%;
      display:flex; align-items:center; justify-content:center;
      font-family:'Share Tech Mono',monospace;
      font-size:1.6rem; color:#52525e;
      background:#1a1a1d;
    `;
    placeholder.textContent = 'TN'; // cambia a tus iniciales
    wrap.appendChild(placeholder);
  });
}
