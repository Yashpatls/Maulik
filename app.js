// Gate: redirect to login if not logged in
if(!sessionStorage.getItem('loggedIn')){
  // If this is portfolio.html, push to login.html
  if(location.pathname.endsWith('portfolio.html')){
    location.href = 'login.html';
  }
}

const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Mobile menu
const burger = document.getElementById('hamburger');
const menu = document.getElementById('navMenu');
if(burger && menu){
  burger.addEventListener('click', () => {
    const open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
  });
}

// Smooth scroll + close mobile menu
// Only enable smooth anchor scroll on portfolio page to avoid jump on other pages
if(location.pathname.endsWith('portfolio.html')){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(menu){ menu.style.display = 'none'; }
      }
    });
  });
} else {
  // prevent anchors like #home on other pages from navigating to root (optional)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => { e.preventDefault(); });
  });
}

// Tilt effect for cards
const tiltItems = document.querySelectorAll('.tilt');
tiltItems.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const rx = (cy / r.height - 0.5) * -8;
    const ry = (cx / r.width - 0.5) * 8;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('reveal');
      io.unobserve(entry.target);
    }
  });
}, {threshold:.2});
document.querySelectorAll('.card, .section-title').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(12px)';
  io.observe(el);
});
document.head.insertAdjacentHTML('beforeend', `<style>.reveal{opacity:1 !important;transform:none !important;transition:all .6s ease}</style>`);



const themeToggle = document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Load saved theme
  if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }
}

// Logout button (if exists)
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
}