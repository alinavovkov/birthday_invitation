// Small JS helpers: smooth scroll and fake signup
document.addEventListener('DOMContentLoaded',function(){
  // set current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // fake signup handler
  const form = document.getElementById('signup-form');
  const msg = document.getElementById('msg');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      const email = (document.getElementById('email')||{}).value || '';
      msg.textContent = 'Thanks — we\'ll be in touch with ' + email;
      form.reset();
    });
  }
});
