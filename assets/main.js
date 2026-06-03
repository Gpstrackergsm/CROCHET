/* ============================================================
   SOLEA SHOPIFY THEME — Main JavaScript
   MJ's Off The Hook Designs
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll-triggered Reveal Animations ----
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ---- Sticky Header on Scroll ----
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---- Product Gallery ----
  const mainImage = document.querySelector('.product-gallery__main img');
  const thumbnails = document.querySelectorAll('.product-gallery__thumb');

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      // Update active thumbnail
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Swap main image
      const src = thumb.querySelector('img')?.src;
      if (mainImage && src) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = src;
          mainImage.style.opacity = '1';
        }, 200);
        mainImage.style.transition = 'opacity 0.2s ease';
      }
    });
  });

  // Set first thumbnail active
  if (thumbnails[0]) thumbnails[0].classList.add('active');

  // ---- Size Selector ----
  const sizeOptions = document.querySelectorAll('.size-option');
  const hiddenVariantInput = document.querySelector('.variant-input');

  sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      sizeOptions.forEach(s => s.classList.remove('selected'));
      option.classList.add('selected');
      if (hiddenVariantInput) {
        hiddenVariantInput.value = option.dataset.variantId || option.textContent.trim();
      }
    });
  });

  // ---- FAQ Accordion ----
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('open');
        t.nextElementSibling?.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      });

      // Open clicked if was closed
      if (!isOpen) {
        trigger.classList.add('open');
        content?.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Quantity Selector ----
  document.querySelectorAll('.quantity-selector').forEach(selector => {
    const decrementBtn = selector.querySelector('[data-action="decrement"]');
    const incrementBtn = selector.querySelector('[data-action="increment"]');
    const input = selector.querySelector('.quantity-selector__input');

    if (!input) return;

    decrementBtn?.addEventListener('click', () => {
      const currentVal = parseInt(input.value) || 1;
      if (currentVal > 1) input.value = currentVal - 1;
    });

    incrementBtn?.addEventListener('click', () => {
      const currentVal = parseInt(input.value) || 1;
      input.value = currentVal + 1;
    });
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Testimonial Carousel ----
  const carousel = document.querySelector('.testimonials-carousel');
  const carouselTrack = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  const dots = document.querySelectorAll('[data-carousel-dot]');

  if (carouselTrack && (prevBtn || nextBtn)) {
    let currentIndex = 0;
    const items = carouselTrack.querySelectorAll('.testimonial-card');
    const totalItems = items.length;

    const updateCarousel = (index) => {
      currentIndex = Math.max(0, Math.min(index, totalItems - 1));
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => updateCarousel(i));
    });

    // Auto-play
    let autoPlay = setInterval(() => {
      const next = currentIndex + 1 >= totalItems ? 0 : currentIndex + 1;
      updateCarousel(next);
    }, 5000);

    carousel?.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel?.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        const next = currentIndex + 1 >= totalItems ? 0 : currentIndex + 1;
        updateCarousel(next);
      }, 5000);
    });
  }

  // ---- Add to Cart / Buy Now feedback ----
  const addToCartBtn = document.querySelector('[data-add-to-cart]');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function(e) {
      // Shopify handles the actual form submission
      // Just add visual feedback
      const original = this.textContent;
      this.textContent = '✓ Added!';
      this.style.background = 'linear-gradient(135deg, #5A9E72, #3D7A54)';
      setTimeout(() => {
        this.textContent = original;
        this.style.background = '';
      }, 2000);
    });
  }

  // ---- Size Guide Modal ----
  const sizeGuideToggle = document.querySelector('[data-size-guide-toggle]');
  const sizeGuideModal = document.querySelector('#size-guide-modal');
  const sizeGuideClose = document.querySelector('[data-size-guide-close]');

  if (sizeGuideToggle && sizeGuideModal) {
    sizeGuideToggle.addEventListener('click', () => {
      sizeGuideModal.setAttribute('aria-hidden', 'false');
      sizeGuideModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    sizeGuideClose?.addEventListener('click', () => {
      sizeGuideModal.setAttribute('aria-hidden', 'true');
      sizeGuideModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    sizeGuideModal.addEventListener('click', (e) => {
      if (e.target === sizeGuideModal) {
        sizeGuideModal.setAttribute('aria-hidden', 'true');
        sizeGuideModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

});
