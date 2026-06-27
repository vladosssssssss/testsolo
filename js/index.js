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

// ─── TIMER DIGIT FLIP ANIMATION ───
(function(){
  ['t-days','t-hours','t-minutes','t-seconds'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    let last = el.textContent;
    const observer = new MutationObserver(() => {
      if(el.textContent !== last){
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = 'tick-flip .35s ease';
        last = el.textContent;
      }
    });
    observer.observe(el, { childList: true });
  });
})();
