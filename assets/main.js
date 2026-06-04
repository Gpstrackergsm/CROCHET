/* ============================================================
   SOLEA SHOPIFY THEME — Main JavaScript
   MJ's Off The Hook Designs
   ============================================================ */

const initSoleaTheme = () => {

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
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

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

  if (thumbnails[0]) thumbnails[0].classList.add('active');

  // ---- Size Selector ----
  const sizeOptions = document.querySelectorAll('.size-option');
  const hiddenVariantInput = document.querySelector('.variant-input') || document.querySelector('input[name="id"]');

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

      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('open');
        if (t.nextElementSibling) t.nextElementSibling.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        trigger.classList.add('open');
        if (content) content.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Add to Cart / Buy Now feedback ----
  const addToCartBtn = document.querySelector('[data-add-to-cart]');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function(e) {
      const originalHTML = this.innerHTML;
      this.innerHTML = '✓ Added!';
      this.style.background = 'linear-gradient(135deg, #5A9E72, #3D7A54)';
      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.background = '';
      }, 2000);
    });
  }

  // ---- Size Guide Modal ----
  const sizeGuideToggle = document.querySelector('[data-size-guide-toggle]');
  const sizeGuideModal = document.querySelector('#size-guide-modal');
  const sizeGuideCloseBtns = document.querySelectorAll('[data-size-guide-close]');

  if (sizeGuideToggle && sizeGuideModal) {
    sizeGuideToggle.addEventListener('click', (e) => {
      e.preventDefault();
      sizeGuideModal.setAttribute('aria-hidden', 'false');
      sizeGuideModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    sizeGuideCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeGuideModal.setAttribute('aria-hidden', 'true');
        sizeGuideModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    sizeGuideModal.addEventListener('click', (e) => {
      if (e.target === sizeGuideModal) {
        sizeGuideModal.setAttribute('aria-hidden', 'true');
        sizeGuideModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSoleaTheme);
} else {
  initSoleaTheme();
}
