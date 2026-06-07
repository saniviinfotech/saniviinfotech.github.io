// Mobile navigation
const navLinks=document.getElementById('navLinks');
const hamburger=document.getElementById('hamburger');

function setMenuState(isOpen){
  if(!navLinks || !hamburger)return;
  navLinks.classList.toggle('open',isOpen);
  hamburger.classList.toggle('open',isOpen);
  hamburger.setAttribute('aria-expanded',String(isOpen));
  hamburger.setAttribute('aria-label',isOpen ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('nav-open',isOpen);
}

hamburger?.addEventListener('click',()=>{
  setMenuState(!navLinks?.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click',()=>setMenuState(false));
});

document.addEventListener('keydown',event=>{
  if(event.key==='Escape')setMenuState(false);
});

window.addEventListener('resize',()=>{
  if(window.innerWidth>860)setMenuState(false);
});

// Scroll reveal
const reveals=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
  });
},{threshold:0.12});
reveals.forEach(r=>observer.observe(r));

// Navbar scroll effect
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav?.classList.toggle('scrolled',window.scrollY>50);
});

// Keep floating CTA above the footer.
const floatingCta=document.querySelector('.floating-cta');
const footer=document.querySelector('footer');
let floatingCtaTicking=false;

function positionFloatingCta(){
  if(!floatingCta || !footer)return;
  const defaultGap=window.innerWidth<=540 ? 16 : 32;
  const footerTop=footer.getBoundingClientRect().top;
  const overlap=window.innerHeight-footerTop;
  floatingCta.style.bottom=(overlap>0 ? overlap+defaultGap : defaultGap)+'px';
}

function requestFloatingCtaPosition(){
  if(floatingCtaTicking)return;
  floatingCtaTicking=true;
  requestAnimationFrame(()=>{
    positionFloatingCta();
    floatingCtaTicking=false;
  });
}

window.addEventListener('scroll',requestFloatingCtaPosition,{passive:true});
window.addEventListener('resize',positionFloatingCta);
positionFloatingCta();

// Service card mouse glow
document.querySelectorAll('.service-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width)*100;
    const y=((e.clientY-r.top)/r.height)*100;
    card.style.setProperty('--mx',x+'%');
    card.style.setProperty('--my',y+'%');
  });
});

// Form submit
function handleSubmit(btn){
  btn.innerHTML='Message Sent! We\'ll be in touch soon';
  btn.style.background='#1a6b3a';
  btn.disabled=true;
}

document.querySelectorAll('[data-form-submit]').forEach(button=>{
  button.addEventListener('click',()=>handleSubmit(button));
});

// Counter animation for hero stats
function animateCounter(el,target){
  let count=0;
  const step=Math.ceil(target/30);
  const suffix=el.dataset.suffix || '';
  const timer=setInterval(()=>{
    count+=step;
    if(count>=target){count=target;clearInterval(timer)}
    el.textContent=count+suffix;
  },40);
}
const statNums=document.querySelectorAll('.stat-item .num');
const statsObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const text=e.target.textContent.trim();
      const match=text.match(/^(\d+)(.*)$/);
      if(match){
        const val=parseInt(match[1]);
        e.target.dataset.suffix=match[2] || '';
        animateCounter(e.target,val);
      }
      statsObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
statNums.forEach(n=>statsObserver.observe(n));
