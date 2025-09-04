
    // dynamic year
    document.getElementById('year').textContent = new Date().getFullYear();

    // mobile nav toggle
    const toggle = document.getElementById('mobileToggle');
    const links = document.getElementById('navLinks');
    toggle.addEventListener('click', () => links.classList.toggle('open'));

    // smooth scroll (basic)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').substring(1);
        const el = document.getElementById(id);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); links.classList.remove('open'); }
      });
    });

    // tiny stars/particles background
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let W, H, stars = [];
    const STAR_COUNT = 120;

    function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();

    function makeStar(){
      return { x: Math.random()*W, y: Math.random()*H, z: Math.random()*0.6+0.4, v: Math.random()*0.4+0.2 };
    }
    for (let i=0;i<STAR_COUNT;i++) stars.push(makeStar());

    function tick(){
      ctx.clearRect(0,0,W,H);
      for (const s of stars){
        s.y += s.v; if (s.y>H) { s.x=Math.random()*W; s.y=-5; }
        const r = 0.7 + 1.8*s.z;
        ctx.globalAlpha = 0.4 + 0.6*Math.random()*s.z;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r*3);
        g.addColorStop(0, 'rgba(34,211,238,1)');
        g.addColorStop(1, 'rgba(34,211,238,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(s.x, s.y, r*3, 0, Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    tick();

    // newsletter form fake handler (replace with real endpoint later)
    const form = document.getElementById('newsletterForm');
    const email = document.getElementById('email');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = email.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if(!ok){ msg.textContent = 'Hmm, that email looks off. Try again?'; msg.style.color = '#fda4af'; email.focus(); return; }
      msg.textContent = 'Subscribed! Check your inbox for a confirmation.'; msg.style.color = '#a7f3d0'; email.value = '';
    });
