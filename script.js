/* ============================================================
   Sterling & Vale Advisory — script.js
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR — sticky background + hamburger
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = navMenu.querySelectorAll('.nav-link');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // apply on initial load (e.g. page loaded mid-scroll)

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ============================================================
   2. INTERSECTION OBSERVER — fade-up scroll animations
   ============================================================ */
(function initFadeAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show all elements immediately
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   3. TESTIMONIAL CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track          = document.getElementById('carousel-track');
  const dotsContainer  = document.getElementById('carousel-dots');
  const prevBtn        = document.getElementById('prev-btn');
  const nextBtn        = document.getElementById('next-btn');
  const carouselOuter  = document.querySelector('.carousel-outer');
  const slides         = track.querySelectorAll('.carousel-slide');
  const total          = slides.length;

  let current    = 0;
  let intervalId = null;

  // Build dot buttons
  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', function () {
      stopAutoPlay();
      goTo(i);
      startAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
      const active = i === current;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAutoPlay() {
    intervalId = setInterval(function () { goTo(current + 1); }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
    intervalId = null;
  }

  prevBtn.addEventListener('click', function () {
    stopAutoPlay();
    goTo(current - 1);
    startAutoPlay();
  });

  nextBtn.addEventListener('click', function () {
    stopAutoPlay();
    goTo(current + 1);
    startAutoPlay();
  });

  // Pause on hover or focus (keyboard users)
  carouselOuter.addEventListener('mouseenter', stopAutoPlay);
  carouselOuter.addEventListener('mouseleave', startAutoPlay);
  carouselOuter.addEventListener('focusin',    stopAutoPlay);
  carouselOuter.addEventListener('focusout',   startAutoPlay);

  startAutoPlay();
})();

/* ============================================================
   4. ENQUIRY FORM — validation + FormSubmit AJAX
   ============================================================ */
(function initForm() {
  const form       = document.getElementById('enquiry-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorBanner= document.getElementById('form-error');

  const fields = {
    name:    document.getElementById('f-name'),
    email:   document.getElementById('f-email'),
    message: document.getElementById('f-message'),
  };

  const errorEls = {
    name:    document.getElementById('f-name-error'),
    email:   document.getElementById('f-email-error'),
    message: document.getElementById('f-message-error'),
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function markInvalid(field, errorEl, msg) {
    field.classList.add('invalid');
    errorEl.textContent = msg;
  }

  function clearInvalid(field, errorEl) {
    field.classList.remove('invalid');
    errorEl.textContent = '';
  }

  // Live clear on input
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      clearInvalid(fields[key], errorEls[key]);
    });
  });

  function validate() {
    let valid = true;

    if (fields.name.value.trim().length === 0) {
      markInvalid(fields.name, errorEls.name, 'Please enter your full name.');
      valid = false;
    } else {
      clearInvalid(fields.name, errorEls.name);
    }

    if (!EMAIL_REGEX.test(fields.email.value.trim())) {
      markInvalid(fields.email, errorEls.email, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearInvalid(fields.email, errorEls.email);
    }

    if (fields.message.value.trim().length === 0) {
      markInvalid(fields.message, errorEls.message, 'Please enter your enquiry.');
      valid = false;
    } else {
      clearInvalid(fields.message, errorEls.message);
    }

    return valid;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    errorBanner.classList.add('hidden');

    if (!validate()) {
      // Move focus to first invalid field for accessibility
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled   = true;
    submitBtn.textContent = 'Sending…';

    const interest = document.getElementById('f-interest').value;
    const phone    = document.getElementById('f-phone').value.trim();

    try {
      // ─────────────────────────────────────────────────────────────────────
      // REPLACE_WITH_YOUR_EMAIL — swap the placeholder below with your actual
      // email address before going live, e.g.:
      //   'https://formsubmit.co/ajax/you@example.com'
      //
      // FormSubmit activation: the very first submission to a new email
      // address triggers a confirmation email from FormSubmit. Click the
      // activation link in that email — the form will work for all
      // subsequent submissions after that one-time step.
      // ─────────────────────────────────────────────────────────────────────
      const response = await fetch('https://formsubmit.co/ajax/lookupdvc@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify({
          name:      fields.name.value.trim(),
          email:     fields.email.value.trim(),
          phone:     phone || '—',
          interest:  interest,
          message:   fields.message.value.trim(),
          _subject:  'New enquiry from Sterling & Vale website',
          _template: 'table',
          _captcha:  'false',
          _honey:    '',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('FormSubmit returned success: false');
      }

    } catch (err) {
      errorBanner.classList.remove('hidden');
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Claim My Free Strategy Session →';
    }
  });
})();

/* ============================================================
   5. FOOTER — auto-updating copyright year
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
