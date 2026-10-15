/**
 * Moringa Bloom Cafe - Vanilla JavaScript
 * Clean, lightweight, and modular functionality.
 * Ready for WordPress enqueueing or standalone use.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initActiveNavOnScroll();
  initMenuFilters();
  initGalleryLightbox();
  initOpenStatusIndicator();
  initContactForm();
  initNewsletterForm();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & SCROLL EFFECTS
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileDrawer || !drawerBackdrop) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('active');
    mobileToggle.classList.toggle('active', isOpen);
    mobileDrawer.classList.toggle('active', isOpen);
    drawerBackdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  mobileToggle.addEventListener('click', () => toggleMenu());
  drawerBackdrop.addEventListener('click', () => toggleMenu(false));

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. ACTIVE NAVIGATION LINK ON SCROLL
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLinks(id);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));

  function updateActiveLinks(activeId) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. MENU CATEGORY FILTER
   -------------------------------------------------------------------------- */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!filterBtns.length || !menuCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach((card) => {
        const itemCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || itemCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. IMAGE GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.querySelector('.lightbox-modal');
  if (!galleryItems.length || !lightboxModal) return;

  const lightboxImg = lightboxModal.querySelector('.lightbox-img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const closeBtn = lightboxModal.querySelector('.lightbox-close');
  const prevBtn = lightboxModal.querySelector('.lightbox-prev');
  const nextBtn = lightboxModal.querySelector('.lightbox-next');

  let currentIndex = 0;
  const itemsData = Array.from(galleryItems).map((item) => {
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.gallery-caption-title')?.textContent || '';
    const tag = item.querySelector('.gallery-caption-tag')?.textContent || '';
    return {
      src: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || '',
      title: title,
      tag: tag
    };
  });

  const showImage = (index) => {
    if (index < 0) index = itemsData.length - 1;
    if (index >= itemsData.length) index = 0;
    currentIndex = index;

    const data = itemsData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    lightboxCaption.textContent = data.title ? `${data.title} • ${data.tag}` : data.alt;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* --------------------------------------------------------------------------
   6. DYNAMIC "OPEN NOW" BADGE
   -------------------------------------------------------------------------- */
function initOpenStatusIndicator() {
  const badge = document.querySelector('.hours-status-badge');
  if (!badge) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  // Opening hours:
  // Mon - Fri (1 to 5): 8:00 AM (8.0) to 10:00 PM (22.0)
  // Sat - Sun (0 or 6): 8:30 AM (8.5) to 11:00 PM (23.0)
  const isWeekend = (day === 0 || day === 6);
  const openTime = isWeekend ? 8.5 : 8.0;
  const closeTime = isWeekend ? 23.0 : 22.0;
  const closingStr = isWeekend ? '11:00 PM' : '10:00 PM';
  const openingStr = isWeekend ? '8:30 AM' : '8:00 AM';

  const isOpen = currentTime >= openTime && currentTime < closeTime;

  if (isOpen) {
    badge.innerHTML = `<span class="status-dot"></span> Open Now &bull; Closes at ${closingStr}`;
    badge.style.backgroundColor = 'var(--color-green-tint)';
    badge.style.color = 'var(--color-muted-green-dark)';
  } else {
    badge.innerHTML = `<span class="status-dot" style="background-color: #9E3A23;"></span> Closed Now &bull; Opens at ${openingStr}`;
    badge.style.backgroundColor = '#FDF2F0';
    badge.style.color = '#9E3A23';
  }
}

/* --------------------------------------------------------------------------
   7. CONTACT & RESERVATION FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('cafeContactForm');
  const feedback = document.getElementById('contactFormFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contactName')?.value.trim();
    const phone = form.querySelector('#contactPhone')?.value.trim();
    const email = form.querySelector('#contactEmail')?.value.trim();
    const guests = form.querySelector('#contactGuests')?.value;
    const date = form.querySelector('#contactDate')?.value;
    const message = form.querySelector('#contactMessage')?.value.trim();

    if (!name || (!phone && !email)) {
      alert('Please provide your name and at least a contact phone number or email.');
      return;
    }

    // Submit button loading simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Request...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      feedback.innerHTML = `&check; Thank you, <strong>${name}</strong>! Your table request has been received. Our team will call you shortly to confirm.`;
      feedback.classList.add('success');
      form.reset();

      setTimeout(() => {
        feedback.classList.remove('success');
      }, 7000);
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   8. NEWSLETTER SUBSCRIPTION FORM
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value) return;

    const email = emailInput.value.trim();
    alert(`Thank you for subscribing to Moringa Bloom Cafe insider news with ${email}! Check your inbox soon for exclusive perks.`);
    form.reset();
  });
}
