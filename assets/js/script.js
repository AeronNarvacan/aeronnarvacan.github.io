document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      }
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


/* ════════════════════════════════════════
   DARK MODE TOGGLE
   ════════════════════════════════════════ */
(function () {
  var html = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('toggleIcon');
  var label = document.getElementById('toggleLabel');

  if (!btn) return;

  btn.addEventListener('click', function () {
    var isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.setAttribute('aria-pressed', 'true');
    }
  });

  var initialDark = html.getAttribute('data-theme') === 'dark';
  btn.setAttribute('aria-pressed', initialDark ? 'true' : 'false');
})();


(function () {
  var scene = document.getElementById('brandingCard');
  if (!scene) return;

  scene.addEventListener('click', function () {
    scene.classList.toggle('is-flipped');
  });

  scene.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scene.classList.toggle('is-flipped');
    }
  });
})();
