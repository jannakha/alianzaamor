/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function () {
  var isDesktopNav = drupalSettings.olivero.isDesktopNav;


  var mobileNavButton = document.querySelector('.mobile-nav-button');
  var mobileNavWrapperId = 'header-nav';
  var mobileNavWrapper = document.getElementById(mobileNavWrapperId);
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');

  var focusableNavElements = mobileNavWrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  var firstFocusableEl = focusableNavElements[0];
  var lastFocusableEl = focusableNavElements[focusableNavElements.length - 1];

  function init() {
    mobileNavButton.setAttribute('aria-controls', mobileNavWrapperId);
    mobileNavButton.setAttribute('aria-expanded', 'false');
  }

  function isMobileNavOpen() {
    return mobileNavWrapper.classList.contains('is-active');
  }

  function toggleMobileNav(state) {
    var value = !!state;
    mobileNavButton.setAttribute('aria-expanded', value);

    if (value) {
      body.classList.add('js-overlay-active');
      body.classList.add('js-fixed');
      mobileNavWrapper.classList.add('is-active');
    } else {
      body.classList.remove('js-overlay-active');
      body.classList.remove('js-fixed');
      mobileNavWrapper.classList.remove('is-active');
    }
  }

  init();

  mobileNavButton.addEventListener('click', function () {
    toggleMobileNav(!isMobileNavOpen());
  });

  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      if (drupalSettings.olivero.areAnySubnavsOpen()) {
        drupalSettings.olivero.closeAllSubNav();
      } else {
        toggleMobileNav(false);
      }
    }
  });

  overlay.addEventListener('click', function () {
    toggleMobileNav(false);
  });

  overlay.addEventListener('touchstart', function () {
    toggleMobileNav(false);
  });

  mobileNavWrapper.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl && !isDesktopNav()) {
          mobileNavButton.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableEl && !isDesktopNav()) {
          mobileNavButton.focus();
          e.preventDefault();
        }
    }
  });

  window.addEventListener('resize', function () {
    if (isDesktopNav()) {
      toggleMobileNav(false);
      body.classList.remove('js-overlay-active', 'js-fixed');
    }
  });
})();