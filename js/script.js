// Toggle mobile menu
function toggleMenu(){
  const links=document.getElementById('navLinks');
  links.classList.toggle('open');
}

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
  if(window.scrollY>50){nav.style.background='rgba(13,13,13,0.97)'}
  else{nav.style.background='rgba(13,13,13,0.85)'}
});

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
  btn.innerHTML='Message Sent! We\'ll be in touch soon ✓';
  btn.style.background='#1a6b3a';
  btn.disabled=true;
}

// Counter animation for hero stats
function animateCounter(el,target){
  let count=0;
  const step=Math.ceil(target/30);
  const timer=setInterval(()=>{
    count+=step;
    if(count>=target){count=target;clearInterval(timer)}
    el.textContent=count;
  },40);
}
const statNums=document.querySelectorAll('.stat-item .num');
const statsObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const text=e.target.innerHTML;
      const match=text.match(/(\d+)/);
      if(match){
        const num=e.target.querySelector('span');
        const val=parseInt(match[1]);
        e.target.textContent='';
        if(num)e.target.appendChild(num);
        animateCounter(e.target,val);
      }
      statsObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
statNums.forEach(n=>statsObserver.observe(n));
