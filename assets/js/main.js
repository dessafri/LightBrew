const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');

const toggleNav = () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
};

const closeNav = () => {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
};

const handleScrollState = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScrollState, { passive: true });
handleScrollState();

menuToggle.addEventListener('click', toggleNav);

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    closeNav();
  }
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const animatedNodes = document.querySelectorAll(
    '.reveal, .about-media, .about-content, .menu-card, .hook-section, .testimonial-card, .contact-grid'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px'
    }
  );

  animatedNodes.forEach(node => observer.observe(node));
} else {
  document
    .querySelectorAll('.reveal, .about-media, .about-content, .menu-card, .hook-section, .testimonial-card, .contact-grid')
    .forEach(node => node.classList.add('is-visible'));
}
