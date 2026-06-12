/* Grove & Stone — Portfolio Page */
const { useState: useStateP, useRef: useRefP, useEffect: useEffectP } = React;

const ALL_PROJECTS = [
  { id:1,  folder:'westport-estate',       title:'Westport Estate',        cat:'Design',      town:'Westport, CT',  year:'2024', desc:'A 2.4-acre property redesign featuring meadow plantings, bluestone terracing, and a naturalistic swimming pond.' },
  { id:6,  folder:'fairfield-modern-home', title:'Fairfield Modern Home',  cat:'Design',      town:'Fairfield, CT', year:'2022', desc:'Contemporary planting scheme for a new-build property with native plantings and minimalist hardscape.' },
  { id:3,  folder:'darien-garden-renewal', title:'Darien Garden Renewal',  cat:'Maintenance', town:'Darien, CT',    year:'2023', desc:'Five-year neglected garden restored through phased planting and structural pruning over two seasons.' },
];


/* Fetch all images from a portfolio folder, preview.jpg always first */
function loadGallery(folder) {
  return fetch(`/images/portfolio/${folder}/`)
    .then(r => { if (!r.ok) throw 0; return r.text(); })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const imgs = [...doc.querySelectorAll('a[href]')]
        .map(a => a.getAttribute('href'))
        .filter(h => /\.(jpe?g|png|webp|gif)$/i.test(h))
        .map(h => `/images/portfolio/${folder}/${h.replace(/^\//, '')}`);
      imgs.sort((a, b) => {
        const an = a.split('/').pop().toLowerCase();
        const bn = b.split('/').pop().toLowerCase();
        if (an === 'preview.jpg' || an === 'preview.jpeg') return -1;
        if (bn === 'preview.jpg' || bn === 'preview.jpeg') return 1;
        return an.localeCompare(bn);
      });
      return imgs;
    });
}

function PortfolioCard({ p, onClick }) {
  const [hov, setHov] = useStateP(false);
  const thumb = `/images/portfolio/${p.folder}/preview.jpg`;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick(p)}
      style={{ position:'relative', overflow:'hidden', borderRadius:14, cursor:'pointer', aspectRatio:'4/3' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${thumb})`, backgroundSize:'cover', backgroundPosition:'center', transition:'transform 0.55s ease', transform:hov?'scale(1.06)':'scale(1)' }} />
      <div style={{ position:'absolute', inset:0, background:hov?'linear-gradient(to top,rgba(6,15,8,0.88) 0%,rgba(6,15,8,0.2) 60%,transparent 100%)':'linear-gradient(to top,rgba(6,15,8,0.55) 0%,transparent 55%)', transition:'background 0.35s' }} />
      <div style={{ position:'absolute', bottom:18, left:18, right:18 }}>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:4, opacity:hov?1:0, transform:hov?'translateY(0)':'translateY(8px)', transition:'all 0.3s ease' }}>{p.cat} · {p.town}</div>
        <h3 style={{ fontFamily:'var(--font-serif)', fontSize:19, fontWeight:700, color:'#fff', margin:0, lineHeight:1.2 }}>{p.title}</h3>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:11, color:'rgba(255,255,255,0.45)', marginTop:3, opacity:hov?1:0, transition:'opacity 0.3s ease 0.05s' }}>{p.year}</div>
      </div>
    </div>
  );
}

function Lightbox({ project, onClose, onNav }) {
  const [gallery, setGallery] = useStateP([`/images/portfolio/${project.folder}/preview.jpg`]);
  const [idx, setIdx] = useStateP(0);
  const [loading, setLoading] = useStateP(true);

  useEffectP(() => {
    setLoading(true);
    loadGallery(project.folder)
      .then(imgs => {
        if (imgs.length > 0) setGallery(imgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [project.folder]);

  // Keyboard navigation
  useEffectP(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  setIdx(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIdx(i => Math.min(gallery.length - 1, i + 1));
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gallery.length, onClose]);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(gallery.length - 1, i + 1));
  const hasPrev = idx > 0;
  const hasNext = idx < gallery.length - 1;

  const arrowStyle = active => ({
    position:'absolute', top:'50%', transform:'translateY(-50%)',
    width:44, height:44, borderRadius:'50%',
    background: active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.25)',
    border:'none', cursor: active ? 'pointer' : 'default',
    display:'flex', alignItems:'center', justifyContent:'center',
    transition:'all 0.2s', zIndex:2,
    opacity: active ? 1 : 0.35,
  });

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(6,15,8,0.92)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', backdropFilter:'blur(8px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:20, overflow:'hidden', maxWidth:880, width:'100%', boxShadow:'0 40px 100px rgba(0,0,0,0.5)', display:'flex', flexDirection:'column', maxHeight:'90vh' }}>

        {/* Image area */}
        <div style={{ position:'relative', background:'#111', flexShrink:0 }}>
          <div style={{ height:400, backgroundImage:`url(${gallery[idx]})`, backgroundSize:'cover', backgroundPosition:'center' }} />

          {/* Prev arrow */}
          <button onClick={prev} disabled={!hasPrev} style={{ ...arrowStyle(hasPrev), left:14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke={hasPrev ? 'var(--green-900)' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Next arrow */}
          <button onClick={next} disabled={!hasNext} style={{ ...arrowStyle(hasNext), right:14 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke={hasNext ? 'var(--green-900)' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Close button */}
          <button onClick={onClose} style={{ position:'absolute', top:12, right:12, width:36, height:36, borderRadius:'50%', background:'rgba(0,0,0,0.5)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Counter */}
          {gallery.length > 1 && (
            <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.55)', borderRadius:9999, padding:'4px 12px', fontFamily:'var(--font-sans)', fontSize:12, fontWeight:600, color:'#fff', zIndex:2 }}>
              {idx + 1} / {gallery.length}
            </div>
          )}
        </div>

        {/* Dot strip */}
        {gallery.length > 1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:6, padding:'12px 20px 4px', background:'#fff', flexWrap:'wrap' }}>
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width:i===idx?20:7, height:7, borderRadius:4, background:i===idx?'var(--color-brand)':'var(--stone-300)', border:'none', cursor:'pointer', padding:0, transition:'all 0.25s ease' }} />
            ))}
          </div>
        )}

        {/* Info */}
        <div style={{ padding:'24px 32px 28px', overflowY:'auto' }}>
          <div style={{ fontFamily:'var(--font-sans)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:8 }}>{project.cat} · {project.town} · {project.year}</div>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:28, fontWeight:700, color:'var(--stone-900)', margin:'0 0 12px', lineHeight:1.1 }}>{project.title}</h2>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:15, color:'var(--stone-600)', lineHeight:1.72, margin:'0 0 20px' }}>{project.desc}</p>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button onClick={() => { onClose(); onNav('contact'); }} style={{ padding:'10px 22px', background:'var(--color-brand)', color:'#fff', border:'none', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:14, fontWeight:600, cursor:'pointer' }}>Start a Similar Project</button>
            <button onClick={onClose} style={{ padding:'10px 22px', background:'transparent', color:'var(--stone-600)', border:'1.5px solid var(--stone-300)', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:14, fontWeight:600, cursor:'pointer' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPage({ onNav }) {
  const [selected, setSelected] = useStateP(null);

  return (
    <>
      <PageHeader
        title="Projects We're Proud Of"
        subtitle="Portfolio"
        bg={`/images/portfolio/westport-estate/preview.jpg`}
      />

      <section className="gs-section" style={{ background:'#fff', padding:'72px 40px 96px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="gs-grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {ALL_PROJECTS.map(p => (
              <PortfolioCard key={p.id} p={p} onClick={setSelected} />
            ))}
          </div>
        </div>
      </section>

      {selected && <Lightbox project={selected} onClose={() => setSelected(null)} onNav={onNav} />}
    </>
  );
}

window.PortfolioPage = PortfolioPage;
