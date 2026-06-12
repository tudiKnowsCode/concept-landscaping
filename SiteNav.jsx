/* Grove & Stone — Site Navigation */
const { useState, useEffect } = React;

function SiteNav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu whenever page changes
  useEffect(() => { setMenu(false); }, [page]);

  const links = [
    { id: 'home',      label: 'Home'      },
    { id: 'about',     label: 'About'     },
    { id: 'services',  label: 'Services'  },
    { id: 'portfolio', label: 'Portfolio' },
  ];

  const solid = scrolled || menu;

  return (
    <>
      <nav className="gs-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 72,
        display: 'flex', alignItems: 'center', padding: '0 40px', gap: 32,
        background: solid ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        borderBottom: solid ? '1px solid var(--stone-200)' : '1px solid transparent',
        boxShadow: solid ? '0 1px 12px rgba(14,25,16,0.07)' : 'none',
        transition: 'all 0.32s ease',
      }}>
        {/* Logo */}
        <button onClick={() => setPage('home')}
          style={{ background:'none', border:'none', cursor:'pointer', padding:0, flexShrink:0 }}>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:20, fontWeight:700, letterSpacing:'0.12em',
            color: solid ? 'var(--color-brand)' : '#fff', transition:'color 0.32s' }}>
            GROVE <span style={{ fontWeight:400, color:'var(--color-accent)' }}>&amp; STONE</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="gs-nav-links" style={{ flex:1, display:'flex', justifyContent:'center', gap:32 }}>
          {links.map(({ id, label }) => (
            <button key={id} onClick={() => setPage(id)} style={{
              background:'none', border:'none', cursor:'pointer', padding:'4px 0',
              fontFamily:'var(--font-sans)', fontSize:14, fontWeight:500,
              color: page===id ? 'var(--color-accent)' : solid ? 'var(--stone-700)' : 'rgba(255,255,255,0.88)',
              borderBottom: page===id ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
              transition:'all 0.2s ease', letterSpacing:'0.02em',
            }}>{label}</button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="gs-nav-cta" onClick={() => setPage('contact')} style={{
          padding:'9px 20px', borderRadius:9999, border:'none', cursor:'pointer', flexShrink:0,
          fontFamily:'var(--font-sans)', fontSize:13, fontWeight:700, letterSpacing:'0.03em',
          background: solid ? 'var(--color-brand)' : 'var(--color-accent)',
          color: solid ? '#fff' : 'var(--green-950)',
          transition:'all 0.28s ease',
        }}>Get a Quote</button>

        {/* Hamburger */}
        <button className="gs-hamburger" onClick={() => setMenu(m => !m)} aria-label={menu ? 'Close menu' : 'Open menu'}>
          <span style={{ background: solid ? 'var(--green-800)' : '#fff', transform: menu ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ background: solid ? 'var(--green-800)' : '#fff', opacity: menu ? 0 : 1 }} />
          <span style={{ background: solid ? 'var(--green-800)' : '#fff', transform: menu ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menu && (
        <div className="gs-mobile-menu">
          {links.map(({ id, label }) => (
            <button key={id} onClick={() => setPage(id)} style={{
              background: 'none', border: 'none', borderBottom: '1px solid var(--stone-100)',
              cursor: 'pointer', padding: '18px 4px',
              fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: page===id ? 700 : 500,
              color: page===id ? 'var(--color-brand)' : 'var(--stone-800)',
              textAlign: 'left', width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              {label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
          <button onClick={() => setPage('contact')} style={{
            marginTop: 24, padding: '15px', background: 'var(--color-brand)', color: '#fff',
            border: 'none', borderRadius: 12, fontFamily: 'var(--font-sans)', fontSize: 15,
            fontWeight: 700, cursor: 'pointer', width: '100%', letterSpacing: '0.02em',
          }}>Get a Quote →</button>
        </div>
      )}
    </>
  );
}

window.SiteNav = SiteNav;
