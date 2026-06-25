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
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    // Pre-unlock AudioContext + SpeechSynthesis NOW, while still inside
    // the synchronous user-gesture tick — browsers block both after an await.
    var _audioCtx = null;
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
    if ('speechSynthesis' in window) {
      var warmup = new SpeechSynthesisUtterance(' ');
      warmup.volume = 0;
      window.speechSynthesis.speak(warmup);
    }

    const interest = document.getElementById('f-interest').value;
    const phone    = document.getElementById('f-phone').value.trim();

    try {
      const response = await fetch('https://formsubmit.co/ajax/dinesh@redbeaconam.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
        celebrationEffect(_audioCtx);
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
   5. CELEBRATION EFFECT — fires on successful form submission
      Call window.testParty() in the console to test at any time.
   ============================================================ */
function celebrationEffect(audioCtx) {

  // ── Voice note ──────────────────────────────────────────────
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    var msg = new SpeechSynthesisUtterance("You da man! You gonna be rich!!");
    msg.rate   = 0.85;
    msg.pitch  = 1.3;
    msg.volume = 1;
    window.speechSynthesis.speak(msg);
  }

  // ── Long fart sound via Web Audio API ───────────────────────
  // Accepts a pre-unlocked AudioContext so the browser doesn't block it
  // after an async await breaks the user-gesture chain.
  (function fartSound(ctx) {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return; }
    }
    if (ctx.state === 'suspended') ctx.resume();

    var duration = 2.4;
    var t = ctx.currentTime;

    var osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.linearRampToValueAtTime(38, t + duration);

    var lfo     = ctx.createOscillator();
    var lfoGain = ctx.createGain();
    lfo.frequency.value = 28;
    lfoGain.gain.value  = 18;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    var noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    var nd = noiseBuffer.getChannelData(0);
    for (var i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    var noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    var noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(180, t);
    noiseFilter.frequency.linearRampToValueAtTime(60, t + duration);
    noiseFilter.Q.value = 0.6;

    var gain = ctx.createGain();
    gain.gain.setValueAtTime(0,   t);
    gain.gain.linearRampToValueAtTime(1.0, t + 0.04);
    gain.gain.setValueAtTime(1.0, t + duration - 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    var oscGain   = ctx.createGain();  oscGain.gain.value   = 0.65;
    var noiseGain = ctx.createGain();  noiseGain.gain.value = 0.40;

    osc.connect(oscGain);     oscGain.connect(gain);
    noise.connect(noiseFilter); noiseFilter.connect(noiseGain); noiseGain.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(); osc.start(); noise.start();
    osc.stop(t + duration); lfo.stop(t + duration); noise.stop(t + duration);
  })(audioCtx);

  // ── Wind blowing particles ───────────────────────────────────
  var icons = ['💨','💸','🤑','💰','💨','🌬️','💸','💨','🤑'];
  for (var p = 0; p < 24; p++) {
    (function spawnParticle(idx) {
      setTimeout(function () {
        var el    = document.createElement('span');
        var startY = 5 + Math.random() * 85;
        var endY   = startY + (Math.random() - 0.5) * 30;
        var dur    = (1.0 + Math.random() * 1.4).toFixed(2);
        var delay  = (Math.random() * 0.4).toFixed(2);
        var size   = 22 + Math.floor(Math.random() * 26);
        var spin   = Math.floor((Math.random() < 0.5 ? 1 : -1) * (180 + Math.random() * 360));

        el.className   = 'wind-particle';
        el.textContent = icons[idx % icons.length];

        // Write the full animation shorthand from JS so there's no
        // conflict with the class-level shorthand that sets duration to 0s.
        el.style.cssText =
          'font-size:' + size + 'px;' +
          '--start-y:' + startY + 'vh;' +
          '--end-y:' + endY + 'vh;' +
          '--spin:' + spin + 'deg;' +
          'animation: windBlow ' + dur + 's linear ' + delay + 's both;';

        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, (parseFloat(dur) + parseFloat(delay) + 0.3) * 1000);
      }, idx * 90);
    })(p);
  }
}

// Console test hook — open DevTools and run: testParty()
window.testParty = function () {
  var ctx = null;
  try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) {}
  if ('speechSynthesis' in window) {
    var w = new SpeechSynthesisUtterance(' '); w.volume = 0;
    window.speechSynthesis.speak(w);
  }
  celebrationEffect(ctx);
};

/* ============================================================
   6. FOOTER — auto-updating copyright year
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   6. WHATSAPP WIDGET
   ============================================================ */
(function initWhatsAppWidget() {
  const widget  = document.getElementById('wa-widget');
  const toggle  = document.getElementById('wa-toggle');
  const panel   = document.getElementById('wa-panel');
  const closeBtn= document.getElementById('wa-close');
  const badge   = document.getElementById('wa-badge');

  if (!widget || !toggle || !panel) return;

  function openPanel() {
    widget.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close WhatsApp chat');
    closeBtn.focus();
  }

  function closePanel() {
    widget.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open WhatsApp chat');
    toggle.focus();
  }

  toggle.addEventListener('click', function () {
    widget.classList.contains('is-open') ? closePanel() : openPanel();
  });

  closeBtn.addEventListener('click', closePanel);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) {
      closePanel();
    }
  });

  // Close when clicking outside the widget
  document.addEventListener('click', function (e) {
    if (widget.classList.contains('is-open') && !widget.contains(e.target)) {
      closePanel();
    }
  });

  // Auto-open after 6 seconds on first visit
  var hasAutoOpened = sessionStorage.getItem('wa-auto-opened');
  if (!hasAutoOpened) {
    setTimeout(function () {
      if (!widget.classList.contains('is-open')) {
        openPanel();
        sessionStorage.setItem('wa-auto-opened', '1');
      }
    }, 6000);
  }
})();
