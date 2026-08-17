document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.links');
  var scrim = document.querySelector('.nav-scrim');
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
  }
  function toggleNav() {
    nav.classList.toggle('open');
    if (scrim) scrim.classList.toggle('open');
  }

  toggle.addEventListener('click', toggleNav);
  if (scrim) scrim.addEventListener('click', closeNav);

  // On mobile, tapping a dropdown's top-level link should open the submenu
  // instead of navigating immediately, since hover doesn't exist on touch.
  document.querySelectorAll('.has-drop > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 860px)').matches) {
        var parent = link.parentElement;
        var dropdown = parent.querySelector('.dropdown');
        if (dropdown && dropdown.style.display !== 'flex') {
          // first tap: just let it show via CSS (already flex on mobile), so allow normal navigation
        }
      }
    });
  });

  // Close menu when a real link is tapped (mobile)
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 860px)').matches) closeNav();
    });
  });
});
