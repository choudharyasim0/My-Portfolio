// SCROLL PROGRESS
var spb = document.getElementById('scrollProgress');
function updateProgress(){
  var h = document.documentElement, b = document.body;
  var st = h.scrollTop || b.scrollTop;
  var sh = (h.scrollHeight || b.scrollHeight) - h.clientHeight;
  var pct = sh > 0 ? (st / sh) * 100 : 0;
  spb.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// ===== COLOR THEMES (per-section accent colors) =====
var themes = {
  home:      {acc:'#7c6aff', b1:'#7c6aff', b2:'#ff6a9c', b3:'#6affda', speed:1},
  about:     {acc:'#ff9f43', b1:'#ff9f43', b2:'#ee5a24', b3:'#ffd32a', speed:.7},
  education: {acc:'#ff6a9c', b1:'#ff6a9c', b2:'#7c6aff', b3:'#ffd32a', speed:.6},
  experience:{acc:'#a29bfe', b1:'#a29bfe', b2:'#6c5ce7', b3:'#fd79a8', speed:.8},
  projects:  {acc:'#00b4ff', b1:'#00b4ff', b2:'#0652dd', b3:'#6affda', speed:1.2},
  expertise: {acc:'#ffd32a', b1:'#ffd32a', b2:'#ff9f43', b3:'#6affda', speed:.9},
  contact:   {acc:'#6affda', b1:'#6affda', b2:'#00b894', b3:'#7c6aff', speed:.5}
};

function hexToRgb(hex){
  hex = hex.replace('#','');
  var n = parseInt(hex, 16);
  return {r:(n>>16)&255, g:(n>>8)&255, b:n&255};
}

var curRGB = hexToRgb(themes.home.acc);
var targetRGB = hexToRgb(themes.home.acc);
var curSpeed = themes.home.speed, targetSpeed = themes.home.speed;

function applyTheme(id){
  var t = themes[id] || themes.home;
  document.body.style.setProperty('--page-accent', t.acc);
  document.body.style.setProperty('--b1c', t.b1);
  document.body.style.setProperty('--b2c', t.b2);
  document.body.style.setProperty('--b3c', t.b3);
  var g = document.querySelector('.hero-name .g');
  if (g){
    g.style.background = 'linear-gradient(110deg,' + t.b1 + ' 20%,' + t.b2 + ' 80%)';
    g.style.webkitBackgroundClip = 'text';
    g.style.backgroundClip = 'text';
    g.style.webkitTextFillColor = 'transparent';
  }
  targetRGB = hexToRgb(t.acc);
  targetSpeed = t.speed;
}

// ===== NODE NETWORK BACKGROUND =====
var cv = document.getElementById('stars');
if (cv) {
  var ctx = cv.getContext('2d');
  var nodes = [];
  var w = 0, h = 0;

  function resizeCanvas(){
    w = cv.width = window.innerWidth;
    h = cv.height = window.innerHeight;
    nodes = [];
    var count = Math.min(70, Math.max(30, Math.floor(window.innerWidth / 140)));
    for (var i = 0; i < count; i++){
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + 1.1
      });
    }
  }

  function getThemeColors(){
    var s = getComputedStyle(document.body);
    return [s.getPropertyValue('--b1c').trim() || '#7c6aff', s.getPropertyValue('--b2c').trim() || '#ff6a9c', s.getPropertyValue('--b3c').trim() || '#6affda'];
  }

  function drawNodes(){
    ctx.clearRect(0, 0, w, h);
    var colors = getThemeColors();

    nodes.forEach(function(n, i){
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % colors.length];
      ctx.globalAlpha = .75;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    for (var i = 0; i < nodes.length; i++){
      for (var j = i + 1; j < nodes.length; j++){
        var a = nodes[i], b = nodes[j];
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 140){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(255,255,255,' + (0.06 * (1 - dist / 140)) + ')';
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawNodes);
  }

  window.addEventListener('resize', resizeCanvas, {passive:true});
  resizeCanvas();
  drawNodes();
}

// ===== TYPING ANIMATION =====
var roles = ['Web Developer & AI/ML Engineer','eBay Dropshipping Expert','Python Developer & Data Analyst','AI Solutions Builder'];
var ri = 0, ci = 0, del = false, tel = document.getElementById('ttext');
function tp(){
  var w = roles[ri];
  if (!del){
    tel.textContent = w.slice(0, ++ci);
    if (ci === w.length){ del = true; setTimeout(tp, 1900); return; }
    setTimeout(tp, 62);
  } else {
    tel.textContent = w.slice(0, --ci);
    if (ci === 0){ del = false; ri = (ri + 1) % roles.length; setTimeout(tp, 400); return; }
    setTimeout(tp, 36);
  }
}
tp();

// ===== TOP NAVBAR (desktop links + mobile dropdown) =====
var navToggle = document.getElementById('navToggle');
var navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', function(){
  navMobile.classList.toggle('open');
  var icon = navToggle.querySelector('i');
  if (navMobile.classList.contains('open')){
    icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
  }
});
document.querySelectorAll('.nav-mobile a').forEach(function(a){
  a.addEventListener('click', function(){
    navMobile.classList.remove('open');
    var icon = navToggle.querySelector('i');
    icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
  });
});

// ===== INTERSECTION OBSERVER — sections drive the theme + active nav link =====
var secs = ['home','about','education','experience','projects','expertise','contact'];
var navLinks = document.querySelectorAll('.nav-link, .nav-mobile a');
var sectionObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting){
      var id = e.target.id;
      applyTheme(id);
      navLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.s === id); });
    }
  });
}, {threshold: 0.3});
secs.forEach(function(id){ var el = document.getElementById(id); if (el) sectionObs.observe(el); });

// ===== REVEAL ON SCROLL =====
var revObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('vis'); });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(function(el){ revObs.observe(el); });

// ===== 3D TILT ON PROJECT CARDS =====
document.querySelectorAll('.proj-card').forEach(function(card){
  card.addEventListener('mousemove', function(e){
    var r = card.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - .5;
    var y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = 'translateY(-7px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 8) + 'deg)';
  });
  card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
});

// ===== CERTIFICATE LIGHTBOX =====
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.cert-preview').forEach(function(p){
  p.addEventListener('click', function(){
    lightboxImg.src = p.dataset.src;
    lightbox.classList.add('open');
  });
});
document.getElementById('lightboxClose').addEventListener('click', function(){
  lightbox.classList.remove('open');
});
lightbox.addEventListener('click', function(e){
  if (e.target === lightbox) lightbox.classList.remove('open');
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') lightbox.classList.remove('open');
});
