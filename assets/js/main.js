/**
 * Modern Portfolio Website JavaScript
 */

(function() {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    });
  }

  /**
   * Navbar scroll effect
   */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /**
   * Smooth scrolling for anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  /**
   * Active navigation link on scroll
   */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  window.addEventListener('load', updateActiveNavLink);

  /**
   * Scroll to top button
   */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Animate skills on scroll
   */
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkills() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && bar.style.width === '0px' || bar.style.width === '') {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      }
    });
  }

  // Use Intersection Observer for better performance
  if (skillBars.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, observerOptions);

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }

  /**
   * Initialize AOS (Animate On Scroll)
   */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }

  /**
   * Add subtle parallax effect to hero background
   */
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      if (scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  /**
   * Add hover effect to resume items
   */
  const resumeItems = document.querySelectorAll('.resume-item');
  resumeItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(10px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });

  /**
   * Add click effect to buttons
   */
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /**
   * Handle window resize
   */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Recalculate any size-dependent features
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 250);
  });

})();