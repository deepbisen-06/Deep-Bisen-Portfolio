const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduced.matches && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
   entry.target.classList.add('is-visible');
   entry.target.querySelector('.signal')?.classList.add('is-playing');
   observer.unobserve(entry.target);
  }
 }), {threshold: 0.08});
 document.querySelectorAll('.section-head, .project, .wide-project, .more-work, .lab-grid article, .about > div, .about aside, .journey-list > div, .contact').forEach(el => {el.classList.add('reveal'); observer.observe(el);});
 document.querySelectorAll('.lab-grid article, .journey-list > div').forEach((el,i) => el.style.setProperty('--delay', `${i%4*70}ms`));
 reduced.addEventListener('change', event => {if(event.matches) { document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible')); observer.disconnect(); }});
}
const hero = document.querySelector('.hero-layout');
const portrait = document.querySelector('.portrait-stage');
hero.addEventListener('pointermove', event => {
 if(reduced.matches || event.pointerType !== 'mouse' || window.innerWidth < 900) return;
 const box = hero.getBoundingClientRect();
 portrait.style.setProperty('--px', `${((event.clientX-box.left)/box.width-.5)*8}px`);
 portrait.style.setProperty('--py', `${((event.clientY-box.top)/box.height-.5)*8}px`);
});
hero.addEventListener('pointerleave', () => {portrait.style.setProperty('--px','0px');portrait.style.setProperty('--py','0px');});
