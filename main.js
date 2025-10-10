import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');

  // ------------------------
  // Navbar toggle
  // ------------------------
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });

  // ------------------------
  // Scroll Animation using IntersectionObserver
  // ------------------------
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-up');
      }
    });
  }, observerOptions);

  // Elements that should animate while scrolling
  const scrollAnimatedElements = document.querySelectorAll(
    '.skill-category, .timeline-item, .education-card, .project-card, .skill-tag'
  );

  scrollAnimatedElements.forEach(el => {
    el.classList.add('hidden-scroll'); // initially hidden
    observer.observe(el);
  });

  // ------------------------
  // Navbar shadow on scroll
  // ------------------------
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow =
      window.pageYOffset > 100
        ? '0 4px 20px rgba(0, 0, 0, 0.1)'
        : '0 2px 10px rgba(0, 0, 0, 0.05)';
  });

  // ------------------------
  // Contact form submission
  // ------------------------
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });

  // ------------------------
  // Smooth scroll for anchor links
  // ------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ------------------------
  // Typing Animation (Hero Section)
  // ------------------------
  const roles = [
    "Python Development",
    "Data Science",
    "AI/ML",
    "Big Data"
  ];

  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      const currentText = currentRole.substring(0, charIndex);

      typingElement.textContent = currentText;

      if (!isDeleting && charIndex < currentRole.length) {
        charIndex++;
        setTimeout(type, 120);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 60);
      } else {
        if (!isDeleting) {
          isDeleting = true;
          setTimeout(type, 1200);
        } else {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 300);
        }
      }
    }

    type();
  }
});
