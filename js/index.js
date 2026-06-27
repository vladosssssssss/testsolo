// ─── REVEAL ON SCROLL ───
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

// ─── SMOOTH PER-DIGIT TIMER SWITCH ───
(function(){
  const ids = ['t-days','t-hours','t-minutes','t-seconds'];

  function normalize(value){
    const digits = String(value || '').replace(/\D/g, '');
    return (digits || '00').slice(-2).padStart(2, '0');
  }

  function renderDigit(el, nextValue, prevValue, animate){
    const next = normalize(nextValue);
    const prev = normalize(prevValue || next);

    el._renderingTimerDigits = true;
    el.textContent = '';
    el.dataset.value = next;
    el.setAttribute('aria-label', next);

    for(let i = 0; i < next.length; i++){
      const digit = document.createElement('span');
      digit.className = 'timer-digit';

      if(animate && prev[i] !== next[i]){
        digit.classList.add('is-changing');

        const oldLayer = document.createElement('span');
        oldLayer.className = 'timer-digit-old';
        oldLayer.textContent = prev[i];

        const newLayer = document.createElement('span');
        newLayer.className = 'timer-digit-new';
        newLayer.textContent = next[i];

        digit.append(oldLayer, newLayer);
      }else{
        digit.textContent = next[i];
      }

      el.appendChild(digit);
    }

    requestAnimationFrame(() => { el._renderingTimerDigits = false; });
  }

  ids.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;

    let last = normalize(el.textContent);
    renderDigit(el, last, last, false);

    const observer = new MutationObserver(() => {
      if(el._renderingTimerDigits) return;

      const next = normalize(el.textContent);

      if(next === last){
        renderDigit(el, next, last, false);
        return;
      }

      renderDigit(el, next, last, true);
      last = next;

      window.clearTimeout(el._timerStableRender);
      el._timerStableRender = window.setTimeout(() => {
        renderDigit(el, last, last, false);
      }, 520);
    });

    observer.observe(el, { childList: true, characterData: true, subtree: true });
  });
})();
