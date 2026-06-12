/* Grove & Stone — Home Page */
const { useState, useEffect, useRef, useCallback } = React;

/* ── Utilities ─────────────────────────────────────── */
function useInView(ref, threshold = 0.12) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return vis;
}

function useCounter(target, active, dur = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);
  return n;
}

function FadeUp({ children, delay = 0, style: extra }) {
  const ref = useRef();
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...extra }}>
      {children}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────── */
const IMG = {
  hero:   'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=90',
  about1: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
  about2: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=700&q=80',
  p1:     'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=900&q=80',
  p2:     'https://images.unsplash.com/photo-1592999137754-c742e16b4289?auto=format&fit=crop&w=900&q=80',
  p3:     'https://images.unsplash.com/photo-1558618047-3c8c76c7d335?auto=format&fit=crop&w=900&q=80',
  p4:     'https://images.unsplash.com/photo-1590411031879-c19e0bbe21a6?auto=format&fit=crop&w=900&q=80',
  testi:  'https://images.unsplash.com/photo-1464822759023-fed107ef2306?auto=format&fit=crop&w=1920&q=80',
};

const SVC_ICONS = {
  leaf:    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M11 3C11 3 4 8 4 14C4 17.3 7 20 11 20C15 20 18 17.3 18 14C18 8 11 3 11 3Z"/><line x1="11" y1="20" x2="11" y2="21.5" strokeLinecap="round"/></svg>,
  shears:  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="15" r="2.5"/><line x1="8.5" y1="7.5" x2="19" y2="15.5"/><line x1="8.5" y1="14.5" x2="19" y2="6.5"/></svg>,
  brick:   <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="7" width="18" height="4" rx="1"/><rect x="2" y="13" width="18" height="4" rx="1"/><line x1="11" y1="7" x2="11" y2="3"/><line x1="7" y1="13" x2="7" y2="11"/><line x1="15" y1="13" x2="15" y2="11"/></svg>,
  fire:    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M11 3C14 7 14 11 12 13.5C10 11 10 8 11 3ZM8 8C5 11 6 16 11 19C16 16 17 11 14 8C13 11 11 13 10 13C9 10 9.5 8 8 8Z"/></svg>,
  drop:    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M11 3L5 11.5C5 15.1 7.7 18 11 18C14.3 18 17 15.1 17 11.5L11 3Z"/></svg>,
  seasons: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="5" width="16" height="14" rx="2"/><line x1="3" y1="9" x2="19" y2="9"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="14" y1="3" x2="14" y2="7"/><line x1="8" y1="13" x2="8" y2="16"/><line x1="14" y1="13" x2="14" y2="16"/></svg>,
};

const SERVICES = [
  { n:'01', icon:'leaf',    title:'Landscape Design',      desc:'Custom master plans shaped around your home, Connecticut terrain, and personal vision.' },
  { n:'02', icon:'shears',  title:'Garden Maintenance',    desc:'Year-round care programs keeping every corner of your property pristine through all four seasons.' },
  { n:'03', icon:'brick',   title:'Hardscaping & Patios',  desc:'Premium stone, brick, and paver installations built to endure New England\'s toughest winters.' },
  { n:'04', icon:'fire',    title:'Outdoor Living Spaces', desc:'Fire features, pergolas, and outdoor kitchens that turn your yard into a genuine retreat.' },
  { n:'05', icon:'drop',    title:'Irrigation & Drainage', desc:'Smart watering systems and professional grading for a healthy, resilient landscape year-round.' },
  { n:'06', icon:'seasons', title:'Seasonal Planting',     desc:'Spring bulbs, summer color, fall cleanup, and winter prep — your property always at its peak.' },
];

const PROJECTS = [
  { img: '/images/portfolio/westport-estate/preview.jpg',       title: 'Westport Estate',      cat: 'Landscape Design', year: '2024' },
  { img: '/images/portfolio/fairfield-modern-home/preview.jpg', title: 'Fairfield Modern Home', cat: 'Design',           year: '2022' },
  { img: '/images/portfolio/darien-garden-renewal/preview.jpg', title: 'Darien Garden Renewal', cat: 'Maintenance',      year: '2023' },
];

const TESTIMONIALS = [
  { q: "Grove & Stone completely transformed our backyard. We genuinely live outside three seasons a year now — it changed how we use our home.", author: "Sarah Mitchell",   loc: "Westport, CT" },
  { q: "From the first consultation to the final planting, every single detail exceeded our expectations. Truly a remarkable team.", author: "James Rutherford", loc: "Darien, CT" },
  { q: "Nobody understands New England's seasons better. Our garden looks stunning in spring, summer, and fall.", author: "Catherine Lawson",  loc: "New Canaan, CT" },
];

const STEPS = [
  { n:'01', title:'Site Consultation',   desc:'We walk your property, listen to your vision, and explore every possibility.' },
  { n:'02', title:'Custom Design',       desc:'Our designers craft a tailored master plan — from plant palettes to stone layouts.' },
  { n:'03', title:'Expert Installation', desc:'Our skilled crew builds your landscape with precision, care, and zero shortcuts.' },
  { n:'04', title:'Ongoing Care',        desc:'Seasonal maintenance programs keep your investment perfect year after year.' },
];

/* ── Hero ──────────────────────────────────────────── */
const FALLBACK_VIDEOS = [
  'https://videos.pexels.com/video-files/36302985/15395277_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/31641546/13480506_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/32501841/13859218_1920_1080_30fps.mp4',
];

function useVideoPlaylist() {
  const playlist = useRef(FALLBACK_VIDEOS);
  const [front, setFront] = useState(0);          // which slot (0 or 1) is on top
  const slotVidIdx = useRef([0, 1]);               // video index loaded in each slot
  const refs = [useRef(null), useRef(null)];
  const started = useRef(false);

  const startWith = useCallback((videos) => {
    if (started.current) return;
    started.current = true;
    playlist.current = videos;
    slotVidIdx.current = [0, videos.length > 1 ? 1 : 0];

    const v0 = refs[0].current;
    const v1 = refs[1].current;
    if (v0) { v0.src = videos[0]; v0.play().catch(() => {}); }
    if (v1 && videos.length > 1) { v1.src = videos[1]; }   // preload, don't play yet
  }, []);

  useEffect(() => {
    fetch('/videos/')
      .then(r => { if (!r.ok) throw 0; return r.text(); })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const files = [...doc.querySelectorAll('a[href]')]
          .map(a => a.getAttribute('href'))
          .filter(h => /\.(mp4|webm|mov)$/i.test(h))
          .map(h => '/videos/' + h.replace(/^\//, ''));
        startWith(files.length > 0 ? files : FALLBACK_VIDEOS);
      })
      .catch(() => startWith(FALLBACK_VIDEOS));
  }, []);

  const onEnded = useCallback((slot) => {
    const vl = playlist.current;

    // Single video: just replay the same slot, no crossfade needed
    if (vl.length <= 1) {
      refs[slot].current?.play().catch(() => {});
      return;
    }

    setFront(f => {
      if (slot !== f) return f;          // only the front video's end matters
      const newFront = 1 - f;
      refs[newFront].current?.play().catch(() => {});

      // Preload next-next into the slot that's now going to the back
      const nextNext = (slotVidIdx.current[newFront] + 1) % vl.length;
      slotVidIdx.current[f] = nextNext;
      setTimeout(() => {
        if (refs[f].current) refs[f].current.src = vl[nextNext];
      }, 200);

      return newFront;
    });
  }, []);

  return { refs, front, onEnded };
}

function Hero({ onNav }) {
  const { refs, front, onEnded } = useVideoPlaylist();

  return (
    <section style={{ height:'100vh',minHeight:640,position:'relative',display:'flex',alignItems:'center',overflow:'hidden',background:'#060f08' }}>
      {[0, 1].map(i => (
        <video key={i} ref={refs[i]} muted playsInline autoPlay={i === 0} preload="auto" onEnded={() => onEnded(i)}
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',
            opacity: i === front ? 1 : 0, transition:'opacity 1.4s ease', zIndex: i === front ? 1 : 0 }} />
      ))}
      <div style={{ position:'absolute',inset:0,background:'linear-gradient(140deg,rgba(6,15,8,0.78) 0%,rgba(6,15,8,0.28) 100%)', zIndex:2 }} />
      <div className="gs-hero-content" style={{ position:'relative',zIndex:3,maxWidth:1280,margin:'0 auto',padding:'0 40px',width:'100%' }}>
        <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:22 }}>
          <span style={{ width:32,height:1.5,background:'var(--color-accent)',display:'block',flexShrink:0 }} />
          <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>
            Landscape Design Studio · Fairfield County, CT
          </span>
        </div>
        <h1 style={{ fontFamily:'var(--font-serif)',fontWeight:900,fontSize:'clamp(52px,7vw,96px)',lineHeight:1.04,color:'#fff',letterSpacing:'-0.025em',margin:'0 0 26px',maxWidth:700 }}>
          Where Every<br/>Garden Tells<br/><em style={{ color:'var(--color-accent)',fontStyle:'italic' }}>A Story.</em>
        </h1>
        <p style={{ fontFamily:'var(--font-sans)',fontSize:18,color:'rgba(255,255,255,0.74)',lineHeight:1.68,margin:'0 0 40px',maxWidth:430 }}>
          Bespoke landscapes for Connecticut's finest homes — designed, installed, and cared for by one dedicated team.
        </p>
        <div className="gs-hero-btns" style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
          <button onClick={() => onNav('contact')} style={{ padding:'14px 28px',background:'var(--color-accent)',color:'var(--green-950)',border:'none',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:15,fontWeight:700,letterSpacing:'0.03em',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8 }}>
            Free Consultation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7H12M12 7L8.5 3.5M12 7L8.5 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => onNav('portfolio')} style={{ padding:'14px 28px',background:'transparent',color:'#fff',border:'1.5px solid rgba(255,255,255,0.42)',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:15,fontWeight:600,cursor:'pointer' }}>
            View Our Work
          </button>
        </div>
      </div>
      <div style={{ position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,color:'rgba(255,255,255,0.38)',zIndex:3 }}>
        <span style={{ fontFamily:'var(--font-sans)',fontSize:10,letterSpacing:'0.12em',textTransform:'uppercase' }}>Scroll</span>
        <div style={{ width:1,height:36,background:'rgba(255,255,255,0.22)' }} />
      </div>
    </section>
  );
}

/* ── Services ──────────────────────────────────────── */
function SvcCard({ s, onNav }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onNav('services')} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background:hov?'var(--color-brand)':'#fff',border:`1px solid ${hov?'var(--color-brand)':'var(--stone-200)'}`,borderRadius:16,padding:'28px',cursor:'pointer',transition:'all 0.3s ease',boxShadow:hov?'0 8px 32px rgba(26,58,33,0.28)':'0 2px 8px rgba(14,25,16,0.05)',transform:hov?'translateY(-4px)':'translateY(0)' }}>
      <div style={{ width:40,height:40,borderRadius:8,background:hov?'rgba(255,255,255,0.15)':'var(--green-50)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:hov?'#fff':'var(--color-brand)',transition:'all 0.3s' }}>
        {SVC_ICONS[s.icon]}
      </div>
      <h3 style={{ fontFamily:'var(--font-serif)',fontSize:19,fontWeight:700,color:hov?'#fff':'var(--stone-900)',margin:'0 0 10px',lineHeight:1.25,transition:'color 0.3s' }}>{s.title}</h3>
      <p style={{ fontFamily:'var(--font-sans)',fontSize:14,color:hov?'rgba(255,255,255,0.7)':'var(--stone-600)',margin:'0 0 18px',lineHeight:1.65,transition:'color 0.3s' }}>{s.desc}</p>
      <span style={{ display:'inline-flex',alignItems:'center',gap:5,fontSize:13,fontFamily:'var(--font-sans)',fontWeight:600,color:hov?'var(--color-accent)':'var(--color-brand)',transition:'color 0.3s' }}>
        Learn more <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </div>
  );
}

function Services({ onNav }) {
  return (
    <section className="gs-section" style={{ background:'var(--stone-50)',padding:'96px 40px' }}>
      <div style={{ maxWidth:1280,margin:'0 auto' }}>
        <FadeUp>
          <div className="gs-section-header" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:52 }}>
            <div>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
                <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
                <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>What We Do</span>
              </div>
              <h2 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3.5vw,48px)',fontWeight:700,color:'var(--stone-900)',lineHeight:1.1,letterSpacing:'-0.01em',margin:0 }}>Six Ways We Transform<br/>Your Property</h2>
            </div>
            <button onClick={() => onNav('services')} style={{ padding:'10px 20px',background:'transparent',color:'var(--color-brand)',border:'1.5px solid var(--color-brand)',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:13,fontWeight:600,cursor:'pointer',flexShrink:0,display:'inline-flex',alignItems:'center',gap:6 }}>
              All Services <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </FadeUp>
        <div className="gs-grid-3" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20 }}>
          {SERVICES.map((s, i) => <FadeUp key={s.n} delay={i * 60}><SvcCard s={s} onNav={onNav} /></FadeUp>)}
        </div>
      </div>
    </section>
  );
}

/* ── About ─────────────────────────────────────────── */
function About({ onNav }) {
  return (
    <section className="gs-section" style={{ background:'#fff',padding:'96px 40px' }}>
      <div className="gs-grid-2" style={{ maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center' }}>
        {/* Photos */}
        <FadeUp>
          <div className="gs-about-photos" style={{ position:'relative',height:560 }}>
            <div style={{ position:'absolute',top:0,left:0,width:'72%',height:'84%',backgroundImage:`url(${IMG.about1})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:16 }} />
            <div style={{ position:'absolute',bottom:0,right:0,width:'52%',height:'56%',backgroundImage:`url(${IMG.about2})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:12,border:'6px solid #fff',boxShadow:'0 12px 40px rgba(14,25,16,0.16)' }} />
            <div style={{ position:'absolute',bottom:40,left:20,background:'var(--color-brand)',color:'#fff',padding:'16px 20px',borderRadius:12,display:'inline-flex',flexDirection:'column',gap:4 }}>
              <span style={{ fontFamily:'var(--font-serif)',fontSize:32,fontWeight:900,lineHeight:1 }}>10<span style={{ color:'var(--color-accent)',fontSize:20 }}>+</span></span>
              <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',opacity:0.75 }}>Years in CT</span>
            </div>
          </div>
        </FadeUp>
        {/* Text */}
        <FadeUp delay={150}>
          <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:12 }}>
            <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
            <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>Our Story</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3vw,44px)',fontWeight:700,color:'var(--stone-900)',lineHeight:1.12,letterSpacing:'-0.01em',margin:'0 0 20px' }}>
            More Than Landscaping —<br/><em style={{ fontStyle:'italic',color:'var(--color-brand)' }}>We Craft Living Art.</em>
          </h2>
          <p style={{ fontFamily:'var(--font-sans)',fontSize:16,color:'var(--stone-600)',lineHeight:1.72,margin:'0 0 16px' }}>
            Founded in 2015 in Westport, Grove &amp; Stone was built on a simple belief: that your outdoor space deserves the same care and intention as the home inside it.
          </p>
          <p style={{ fontFamily:'var(--font-sans)',fontSize:16,color:'var(--stone-600)',lineHeight:1.72,margin:'0 0 36px' }}>
            We serve the towns of Fairfield County — from Greenwich to Wilton — bringing design expertise, horticultural knowledge, and hands-on craft to every project.
          </p>
          {/* Stats row */}
          <div style={{ display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'20px 32px',marginBottom:36 }}>
            {[['200+','Projects completed'],['10+','Years in Connecticut'],['98%','Client satisfaction'],['15','Expert team members']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-serif)',fontSize:36,fontWeight:700,color:'var(--color-brand)',lineHeight:1 }}>{v}</div>
                <div style={{ fontFamily:'var(--font-sans)',fontSize:12,color:'var(--stone-500)',marginTop:4,fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
          <button onClick={() => onNav('about')} style={{ padding:'13px 26px',background:'var(--color-brand)',color:'#fff',border:'none',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8 }}>
            Meet the Team <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5H11M11 6.5L7.5 3M11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Stats ─────────────────────────────────────────── */
function StatNum({ target, suffix, label }) {
  const ref = useRef();
  const vis = useInView(ref);
  const n = useCounter(target, vis);
  return (
    <div ref={ref} style={{ textAlign:'center',padding:'8px 32px' }}>
      <div style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(48px,5vw,72px)',fontWeight:700,color:'#fff',lineHeight:1,display:'inline-flex',alignItems:'baseline',gap:4 }}>
        <span>{n}</span><span style={{ fontSize:'0.55em',color:'var(--color-accent)' }}>{suffix}</span>
      </div>
      <div style={{ fontFamily:'var(--font-sans)',fontSize:12,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',marginTop:10 }}>{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section style={{ background:'var(--green-900)',padding:'80px 40px',borderTop:'1px solid var(--green-800)' }}>
      <div style={{ maxWidth:1280,margin:'0 auto' }}>
        <div className="gs-stats-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderTop:'1px solid rgba(255,255,255,0.08)',borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          {[{t:200,s:'+',l:'Projects Completed'},{t:10,s:'+',l:'Years in Connecticut'},{t:98,s:'%',l:'Client Satisfaction'},{t:15,s:'',l:'Expert Team Members'}].map((st,i) => (
            <div className="gs-stat-cell" key={st.l} style={{ borderRight: i<3?'1px solid rgba(255,255,255,0.08)':'none', padding:'48px 0' }}>
              <StatNum target={st.t} suffix={st.s} label={st.l} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio Preview ─────────────────────────────── */
function ProjCard({ p, onNav }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onNav('portfolio')} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position:'relative',overflow:'hidden',borderRadius:14,height:'100%',minHeight:240,cursor:'pointer' }}>
      <div style={{ position:'absolute',inset:0,backgroundImage:`url(${p.img})`,backgroundSize:'cover',backgroundPosition:'center',transition:'transform 0.6s ease',transform:hov?'scale(1.06)':'scale(1)' }} />
      <div style={{ position:'absolute',inset:0,background:hov?'linear-gradient(to top,rgba(6,15,8,0.88) 0%,rgba(6,15,8,0.2) 60%,transparent 100%)':'linear-gradient(to top,rgba(6,15,8,0.6) 0%,transparent 60%)',transition:'background 0.4s' }} />
      <div style={{ position:'absolute',bottom:20,left:20,right:20 }}>
        <div style={{ fontFamily:'var(--font-sans)',fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--color-accent)',marginBottom:4,opacity:hov?1:0,transform:hov?'translateY(0)':'translateY(8px)',transition:'all 0.3s ease' }}>{p.cat}</div>
        <h3 style={{ fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'#fff',margin:0,lineHeight:1.2 }}>{p.title}</h3>
        <div style={{ fontFamily:'var(--font-sans)',fontSize:11,color:'rgba(255,255,255,0.45)',marginTop:4,opacity:hov?1:0,transition:'opacity 0.3s ease 0.05s' }}>{p.year}</div>
      </div>
    </div>
  );
}

function Portfolio({ onNav }) {
  return (
    <section className="gs-section" style={{ background:'var(--stone-50)',padding:'96px 40px' }}>
      <div style={{ maxWidth:1280,margin:'0 auto' }}>
        <FadeUp>
          <div className="gs-section-header" style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:52 }}>
            <div>
              <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}>
                <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
                <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>Our Work</span>
              </div>
              <h2 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3.5vw,48px)',fontWeight:700,color:'var(--stone-900)',lineHeight:1.1,letterSpacing:'-0.01em',margin:0 }}>A Peek at Our<br/>Recent Projects</h2>
            </div>
            <button onClick={() => onNav('portfolio')} style={{ padding:'10px 20px',background:'transparent',color:'var(--color-brand)',border:'1.5px solid var(--color-brand)',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:13,fontWeight:600,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:6 }}>
              Full Portfolio <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="gs-portfolio-preview" style={{ display:'grid',gridTemplateColumns:'1.4fr 1fr',gridTemplateRows:'280px 280px',gap:16 }}>
            <div className="gs-portfolio-span" style={{ gridRow:'1/3' }}><ProjCard p={PROJECTS[0]} onNav={onNav} /></div>
            <div><ProjCard p={PROJECTS[1]} onNav={onNav} /></div>
            <div><ProjCard p={PROJECTS[2]} onNav={onNav} /></div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────── */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section style={{ position:'relative',padding:'96px 40px',overflow:'hidden' }}>
      <div style={{ position:'absolute',inset:0,backgroundImage:`url(${IMG.testi})`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.35)' }} />
      <div style={{ position:'absolute',inset:0,background:'rgba(6,15,8,0.55)' }} />
      <div style={{ position:'relative',zIndex:1,maxWidth:840,margin:'0 auto',textAlign:'center' }}>
        <div style={{ fontFamily:'var(--font-serif)',fontSize:96,lineHeight:0.7,color:'var(--color-accent)',opacity:0.35,marginBottom:8 }}>"</div>
        <p style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(20px,2.5vw,30px)',fontStyle:'italic',fontWeight:400,color:'#fff',lineHeight:1.6,margin:'0 0 36px',textWrap:'balance' }}>
          {t.q}
        </p>
        <div style={{ fontFamily:'var(--font-sans)',fontSize:14,fontWeight:700,color:'var(--color-accent)',letterSpacing:'0.04em' }}>{t.author}</div>
        <div style={{ fontFamily:'var(--font-sans)',fontSize:12,color:'rgba(255,255,255,0.45)',marginTop:4 }}>{t.loc}</div>
        {/* Dots */}
        <div style={{ display:'flex',justifyContent:'center',gap:10,marginTop:36 }}>
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width:i===idx?24:8,height:8,borderRadius:4,background:i===idx?'var(--color-accent)':'rgba(255,255,255,0.28)',border:'none',cursor:'pointer',padding:0,transition:'all 0.3s ease' }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────── */
function Process() {
  return (
    <section className="gs-section" style={{ background:'#fff',padding:'96px 40px' }}>
      <div style={{ maxWidth:1280,margin:'0 auto' }}>
        <FadeUp>
          <div style={{ textAlign:'center',marginBottom:64 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:10,marginBottom:12 }}>
              <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
              <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>How It Works</span>
              <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
            </div>
            <h2 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3.5vw,48px)',fontWeight:700,color:'var(--stone-900)',lineHeight:1.1,letterSpacing:'-0.01em',margin:0 }}>From Vision to Reality —<br/>Every Step Handled.</h2>
          </div>
        </FadeUp>
        <div className="gs-process-grid" style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,position:'relative' }}>
          <div className="gs-process-line" style={{ position:'absolute',top:32,left:'12%',right:'12%',height:1,background:'var(--stone-200)',zIndex:0 }} />
          {STEPS.map((step, i) => (
            <FadeUp key={step.n} delay={i * 90}>
              <div style={{ textAlign:'center',padding:'0 24px',position:'relative',zIndex:1 }}>
                <div style={{ width:64,height:64,borderRadius:'50%',background:'var(--color-brand)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,boxShadow:'0 4px 16px rgba(26,58,33,0.3)' }}>
                  {i+1}
                </div>
                <div style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--color-accent)',marginBottom:8 }}>{step.n}</div>
                <h3 style={{ fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'var(--stone-900)',margin:'0 0 10px',lineHeight:1.2 }}>{step.title}</h3>
                <p style={{ fontFamily:'var(--font-sans)',fontSize:14,color:'var(--stone-600)',lineHeight:1.65,margin:0 }}>{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ───────────────────────────────────────────── */
function CTA({ onNav }) {
  return (
    <section className="gs-section" style={{ background:'var(--green-800)',padding:'96px 40px',position:'relative',overflow:'hidden' }}>
      <img src="./assets/leaf-accent.svg" alt="" aria-hidden="true" style={{ position:'absolute',right:80,top:'50%',transform:'translateY(-50%) scale(2)',opacity:0.06,height:300,pointerEvents:'none' }} />
      <div style={{ maxWidth:1280,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1 }}>
        <FadeUp>
          <div style={{ display:'inline-flex',alignItems:'center',gap:10,marginBottom:16 }}>
            <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
            <span style={{ fontFamily:'var(--font-sans)',fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--color-accent)' }}>Ready to Begin?</span>
            <span style={{ width:24,height:1.5,background:'var(--color-accent)',display:'block' }} />
          </div>
          <h2 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(32px,4vw,60px)',fontWeight:700,color:'#fff',lineHeight:1.1,letterSpacing:'-0.02em',margin:'0 0 20px' }}>
            Let's Transform Your<br/><em style={{ fontStyle:'italic',color:'var(--color-accent)' }}>Outdoor Space.</em>
          </h2>
          <p style={{ fontFamily:'var(--font-sans)',fontSize:18,color:'rgba(255,255,255,0.65)',lineHeight:1.65,margin:'0 auto 40px',maxWidth:480 }}>
            Book a free on-site consultation. We'll walk your property, discuss your goals, and share ideas — no pressure, no obligation.
          </p>
          <div style={{ display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap' }}>
            <button onClick={() => onNav('contact')} style={{ padding:'16px 36px',background:'var(--color-accent)',color:'var(--green-950)',border:'none',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:16,fontWeight:700,letterSpacing:'0.03em',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:10 }}>
              Schedule a Consultation
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5H12.5M12.5 7.5L9 4M12.5 7.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => onNav('portfolio')} style={{ padding:'16px 32px',background:'transparent',color:'#fff',border:'1.5px solid rgba(255,255,255,0.38)',borderRadius:9999,fontFamily:'var(--font-sans)',fontSize:16,fontWeight:600,cursor:'pointer' }}>
              See Our Work First
            </button>
          </div>
          <div className="gs-cta-meta" style={{ display:'flex',justifyContent:'center',gap:32,marginTop:36 }}>
            {['(203) 555-0182','hello@groveandstone.com','Westport, CT'].map(item => (
              <span key={item} style={{ fontFamily:'var(--font-sans)',fontSize:13,color:'rgba(255,255,255,0.45)',display:'flex',alignItems:'center',gap:6 }}>
                <span style={{ width:4,height:4,background:'var(--color-accent)',borderRadius:'50%',display:'inline-block' }} />
                {item}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── Page export ───────────────────────────────────── */
function HomePage({ onNav }) {
  return (
    <>
      <Hero onNav={onNav} />
      <Services onNav={onNav} />
      <About onNav={onNav} />
      <Stats />
      <Portfolio onNav={onNav} />
      <Testimonials />
      <Process />
      <CTA onNav={onNav} />
    </>
  );
}

window.HomePage = HomePage;
