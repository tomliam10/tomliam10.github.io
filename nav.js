document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.links');
  var scrim = document.querySelector('.nav-scrim');
  if (!toggle || !nav) return;

  function isMobile() {
    return window.matchMedia('(max-width: 860px)').matches;
  }

  function closeNav() {
    nav.classList.remove('open');
    if (scrim) scrim.classList.remove('open');
    // collapse any open submenus so the menu starts fresh next time it opens
    nav.querySelectorAll('.has-drop.open').forEach(function (d) {
      d.classList.remove('open');
    });
  }
  function toggleNav() {
    nav.classList.toggle('open');
    if (scrim) scrim.classList.toggle('open');
  }

  toggle.addEventListener('click', toggleNav);
  if (scrim) scrim.addEventListener('click', closeNav);

  // On mobile, tapping a dropdown's top-level link (Recipes / Learn / City
  // Guides / Shop) expands or collapses just that one submenu instead of
  // navigating away or showing every submenu at once.
  document.querySelectorAll('.has-drop > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (!isMobile()) return; // desktop keeps its normal hover + click-through behavior
      e.preventDefault();
      var parent = link.parentElement;
      var wasOpen = parent.classList.contains('open');
      // close any other open submenu first, so only one is open at a time
      nav.querySelectorAll('.has-drop.open').forEach(function (d) {
        if (d !== parent) d.classList.remove('open');
      });
      parent.classList.toggle('open', !wasOpen);
    });
  });

  // Tapping an actual destination link (not a submenu toggle) closes the whole menu.
  nav.querySelectorAll('a').forEach(function (a) {
    var isToggle = a.parentElement && a.parentElement.classList.contains('has-drop');
    if (isToggle) return; // handled above
    a.addEventListener('click', function () {
      if (isMobile()) closeNav();
    });
  });
});
