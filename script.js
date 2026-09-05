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

  var form = document.getElementById('leadForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = value;
      });

      fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
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
