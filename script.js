// Performatic Intelligence – Vanilla-JS, keine externen Abhängigkeiten

document.addEventListener('DOMContentLoaded', function () {

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Feste Aktionsleiste (nur Handy, siehe .cta-bar): sichtbar, solange weder die Hero-Buttons,
  // das Kontaktformular noch die Fußzeile im Bild sind und das Menü geschlossen ist.
  var ctaBar = document.getElementById('ctaBar');
  if (ctaBar && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.hero-actions, .product-cta-band, #kontakt, .site-footer');
    var inView = new Set();
    var update = function () {
      var navOpen = nav && nav.classList.contains('open');
      ctaBar.hidden = inView.size > 0 || navOpen;
      document.body.classList.toggle('has-cta-bar', !ctaBar.hidden);
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) inView.add(e.target); else inView.delete(e.target);
      });
      update();
    });
    targets.forEach(function (t) { observer.observe(t); });
    if (toggle) toggle.addEventListener('click', update);
    update();
  }

  document.querySelectorAll('[data-interesse]').forEach(function (el) {
    el.addEventListener('click', function () {
      var select = document.getElementById('interesse');
      if (select) select.value = el.getAttribute('data-interesse');
    });
  });

  var form = document.getElementById('leadForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      // Mehrfachauswahl "Aktive Kanäle" als ein Feld übertragen
      var kanaele = data.getAll('kanaele');
      if (kanaele.length) data.set('kanaele', kanaele.join(', '));

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus('Danke! Ich melde mich innerhalb von 2 Werktagen bei dir.', 'ok');
            form.reset();
          } else {
            showStatus('Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib mir direkt per E-Mail.', 'error');
          }
        })
        .catch(function () {
          showStatus('Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib mir direkt per E-Mail.', 'error');
        });
    });
  }

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    status.className = 'form-status ' + type;
    status.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
