(function () {
  var toggler = document.querySelector('.navbar-toggler');
  var collapse = document.getElementById('navbarResponsive');

  if (!toggler || !collapse) return;

  var breakpoint = 992;

  function toggleMenu() {
    var isExpanded = toggler.getAttribute('aria-expanded') === 'true';
    collapse.classList.toggle('show');
    toggler.setAttribute('aria-expanded', !isExpanded);
  }

  toggler.addEventListener('click', toggleMenu);

  document.querySelectorAll('#navbarResponsive .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < breakpoint) {
        collapse.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
      }
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= breakpoint) {
      collapse.classList.remove('show');
      toggler.setAttribute('aria-expanded', 'false');
    }
  });
})();
