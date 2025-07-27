document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  
  burger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      header.classList.remove('scrolled');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Highlight active menu item
  function highlightMenu() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link, .mobile-nav__link');
    const footer = document.querySelector('footer');
    const footerPosition = footer.getBoundingClientRect().top;
    const footerHeight = footer.clientHeight;
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 150) && pageYOffset < (sectionTop + sectionHeight - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    // If scroll reached footer
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
      current = 'contacts';
    }
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightMenu);
  highlightMenu();

  // Scroll animations
  function setupScrollAnimations() {
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Special case for contact section to animate phone
          if (entry.target.classList.contains('contact-us')) {
            entry.target.classList.add('visible');
          }
          
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1
    });

    // Elements to animate
    const animatedElements = document.querySelectorAll(
      '.service-card, .section-header, .contact-us, .footer__col'
    );

    animatedElements.forEach((el, index) => {
      el.classList.add('scroll-animate');
      el.style.setProperty('--index', index);
      observer.observe(el);
    });
  }

  setupScrollAnimations();

  // Phone number reveal effect
  const phoneLink = document.querySelector('.phone-link');
  if (phoneLink) {
    phoneLink.addEventListener('mouseenter', function() {
      this.style.width = '200px';
      this.querySelector('.phone-number').style.opacity = '1';
    });
    
    phoneLink.addEventListener('mouseleave', function() {
      this.style.width = '';
      this.querySelector('.phone-number').style.opacity = '0';
    });
  }

  // Ripple effect for buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  const buttons = document.querySelectorAll('.form__button, .service-card__button');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });

  // Page load animation cleanup
  const pageLoader = document.querySelector('body::after');
  if (pageLoader) {
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1500);
  }
});



