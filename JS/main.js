/* ── NAV TOGGLE ── */
const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
toggle.addEventListener('click', () => navList.classList.toggle('open'));
document.addEventListener('click', e => {
    if (!navList.contains(e.target) && !toggle.contains(e.target)) navList.classList.remove('open');
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        const off = document.getElementById('header').offsetHeight;
        window.scrollTo({ top: t.offsetTop - off - 10, behavior: 'smooth' });
        navList.classList.remove('open');
    });
});

/* ── SCROLL KNOP ── */
const scrollBtn = document.getElementById('scroll-btn');
function updateScrollBtn() {
    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
    scrollBtn.textContent = atBottom ? '↑' : '↓';
}
scrollBtn.addEventListener('click', () => {
    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
    window.scrollTo({ top: atBottom ? 0 : document.body.scrollHeight, behavior: 'smooth' });
});
window.addEventListener('scroll', updateScrollBtn, { passive: true });
updateScrollBtn();

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
function setActive() {
    const mid = window.scrollY + window.innerHeight / 2;
    let cur = sections[0].id;
    sections.forEach(s => { if (mid >= s.offsetTop) cur = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

/* ── REVEAL ON SCROLL ── */
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
    });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── SKILL BARS ── */
const bo = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.w + '%');
            bo.unobserve(e.target);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('#skills').forEach(s => bo.observe(s));

/* ── WPL2 TABS ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

/* ── LIGHTBOX voor projectfoto's ── */
// Maak lightbox overlay aan
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display:none; position:fixed; inset:0; z-index:9998;
  background:rgba(26,31,46,.92); backdrop-filter:blur(8px);
  align-items:center; justify-content:center; cursor:zoom-out;
  padding:24px;
`;
const lbImg = document.createElement('img');
lbImg.style.cssText = `
  max-width:90vw; max-height:88vh; border-radius:16px;
  box-shadow:0 30px 80px rgba(0,0,0,.5);
  object-fit:contain;
  animation: lbFadeIn .2s ease;
`;
const lbClose = document.createElement('button');
lbClose.innerHTML = '✕';
lbClose.style.cssText = `
  position:absolute; top:20px; right:24px;
  background:rgba(255,255,255,.15); border:none; color:#fff;
  font-size:1.3rem; width:40px; height:40px; border-radius:50%;
  cursor:pointer; transition:background .2s;
`;
lbClose.onmouseenter = () => lbClose.style.background = 'rgba(255,255,255,.3)';
lbClose.onmouseleave = () => lbClose.style.background = 'rgba(255,255,255,.15)';

const style = document.createElement('style');
style.textContent = `@keyframes lbFadeIn { from { opacity:0; transform:scale(.95); } to { opacity:1; transform:scale(1); } }`;
document.head.appendChild(style);

lightbox.appendChild(lbImg);
lightbox.appendChild(lbClose);
document.body.appendChild(lightbox);

function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Klik op lightbox achtergrond of sluit-knop
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lbClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Voeg klik toe aan alle projectkaart-afbeeldingen
document.querySelectorAll('.card-img img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});















