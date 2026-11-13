(function () {
  'use strict';
  const element = document.querySelector('[data-embed-form]');
  if (!element) return;
  const page = element.dataset.embedForm;
  const url = window.SOFIA_LIMA_CONFIG && window.SOFIA_LIMA_CONFIG.WEB_APP_URL;
  const warning = document.getElementById('setup-warning');
  if (!url || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url)) {
    if (warning) warning.hidden = false;
    element.hidden = true;
    return;
  }
  const frameURL = new URL(url);
  frameURL.searchParams.set('page', page);
  element.src = frameURL.toString();
  element.title = page === 'quant' ? 'Encuesta cuantitativa de Sofía & Lima' : 'Entrevista cualitativa de Sofía & Lima';
  element.addEventListener('load', () => { element.classList.add('is-loaded'); });
  // El mensaje opcional únicamente transmite la altura (nunca respuestas ni datos personales).
  window.addEventListener('message', function (event) {
    if (!/^https:\/\/(?:script\.google\.com|(?:[a-z0-9-]+\.)*script\.googleusercontent\.com)$/i.test(event.origin)) return;
    const d = event.data;
    if (!d || d.source !== 'sofia-lima-form' || d.type !== 'resize') return;
    const height = Number(d.height);
    if (Number.isFinite(height) && height >= 450 && height <= 6000) {
      element.style.height = Math.ceil(height + 28) + 'px';
    }
  });
})();
