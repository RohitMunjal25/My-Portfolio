/* ---- Navbar scroll effect --------------------------------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ---- Hamburger / Mobile menu ------------------------------ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ---- Active nav link on scroll ---------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});


/* ---- Typing animation ------------------------------------- */
const roles = [
  'Full Stack Web Developer',
  'MERN Stack Developer',  
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex++);
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex--);
  }

  if (charIndex === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(type, 1400);
    return;
  }

  if (charIndex === -1) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
  }

  setTimeout(type, isDeleting ? 42 : 85);
}
type();


/* ---- AOS (Animate On Scroll) — custom implementation ------ */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.12 });

aosElements.forEach(el => aosObserver.observe(el));


/* ---- CGPA counter + bar animation ------------------------- */
const cgpaEl   = document.getElementById('cgpa-counter');
const cgpaFill = document.getElementById('cgpa-fill');
const cgpaTarget = 8.46;
let cgpaStarted = false;

const cgpaObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !cgpaStarted) {
    cgpaStarted = true;

    // Bar fill
    setTimeout(() => {
      cgpaFill.style.width = '84.6%';
    }, 300);

    // Counter
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = cgpaTarget / (duration / step);

    const counter = setInterval(() => {
      start += increment;
      if (start >= cgpaTarget) {
        cgpaEl.textContent = cgpaTarget.toFixed(2);
        clearInterval(counter);
      } else {
        cgpaEl.textContent = start.toFixed(2);
      }
    }, step);
  }
}, { threshold: 0.4 });

if (cgpaEl) cgpaObserver.observe(cgpaEl);


/* ---- Smooth scroll for anchor links ----------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ---- Parallax — subtle hero glow movement ----------------- */
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const glowBlue   = document.querySelector('.glow-blue');
  const glowPurple = document.querySelector('.glow-purple');
  if (glowBlue)   glowBlue.style.transform   = `translate(${x}px, ${y}px)`;
  if (glowPurple) glowPurple.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
});
