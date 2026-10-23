(function () {
  var sections = Array.from(document.querySelectorAll('section[id]'));
  var navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  if (!sections.length || !navLinks.length) return;

  var isClickScrolling = false;
  var clickTimeout = null;

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function updateActiveNav() {
    if (isClickScrolling) return;

    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;

    // 1. If at or near bottom of document, activate the last section (#webdev)
    if (scrollY + windowHeight >= docHeight - 40) {
      setActive(sections[sections.length - 1].id);
      return;
    }

    // 2. If near top of document, activate the first section (#about)
    if (scrollY < 120) {
      setActive(sections[0].id);
      return;
    }

    // 3. Otherwise find which section is currently active
    var triggerPos = scrollY + (windowHeight * 0.38);
    var activeId = sections[0].id;

    for (var i = sections.length - 1; i >= 0; i--) {
      if (triggerPos >= sections[i].offsetTop) {
        activeId = sections[i].id;
        break;
      }
    }

    setActive(activeId);
  }

  // Handle nav link clicks
  navLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        var collapseEl = target.querySelector('.collapse');
        if (collapseEl && !collapseEl.classList.contains('show')) {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            var bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl);
            bsCollapse.show();
          } else {
            collapseEl.classList.add('show');
          }
        }

        setActive(target.id);
        isClickScrolling = true;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(function () {
          isClickScrolling = false;
          updateActiveNav();
        }, 800);

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Handle other anchor links outside site-nav (if any)
  document.querySelectorAll('a[href^="#"]:not(.site-nav a)').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateActiveNav, { passive: true });

  var webdevCollapse = document.getElementById('webdevCollapse');
  if (webdevCollapse) {
    webdevCollapse.addEventListener('shown.bs.collapse', updateActiveNav);
    webdevCollapse.addEventListener('hidden.bs.collapse', updateActiveNav);
  }

  updateActiveNav();
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
