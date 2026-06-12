/* Grove & Stone — Site Footer */

function SiteFooter({ setPage }) {
  const cols = [
    { title:'Services', items:['Landscape Design','Garden Maintenance','Hardscaping & Patios','Outdoor Living','Irrigation & Drainage','Seasonal Planting'] },
    { title:'Company',  items:['About Us','Our Portfolio','Our Process','Testimonials','Careers'] },
    { title:'Contact',  items:['(203) 555-0182','hello@groveandstone.com','247 Post Road East','Westport, CT 06880','Mon–Sat  8am–6pm'] },
  ];

  return (
    <footer className="gs-footer" style={{ background:'var(--green-950)',color:'#fff',padding:'72px 40px 32px' }}>
      <div style={{ maxWidth:1280,margin:'0 auto' }}>
        {/* Top grid */}
        <div className="gs-grid-footer" style={{ display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:48,marginBottom:64,alignItems:'start' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,letterSpacing:'0.1em',marginBottom:16 }}>
              GROVE <span style={{ fontWeight:400,color:'var(--color-accent)' }}>&amp; STONE</span>
            </div>
            <p style={{ fontFamily:'var(--font-sans)',fontSize:14,color:'rgba(255,255,255,0.5)',lineHeight:1.75,maxWidth:240,margin:'0 0 28px' }}>
              Crafting Connecticut's finest outdoor spaces since 2015. Serving Fairfield County and surrounding towns.
            </p>
            <img src="./assets/leaf-accent.svg" alt="" aria-hidden="true" style={{ height:80,opacity:0.2 }} />
          </div>
          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily:'var(--font-sans)',fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:18 }}>{col.title}</h4>
              <div style={{ display:'flex',flexDirection:'column',gap:11 }}>
                {col.items.map(item => (
                  <span key={item} style={{ fontFamily:'var(--font-sans)',fontSize:14,color:'rgba(255,255,255,0.58)',cursor:'pointer',lineHeight:1.4,transition:'color 0.2s' }}
                    onMouseEnter={e=>e.target.style.color='rgba(255,255,255,0.9)'}
                    onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.58)'}
                  >{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:28,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12 }}>
          <span style={{ fontFamily:'var(--font-sans)',fontSize:12,color:'rgba(255,255,255,0.28)' }}>
            © 2025 Grove &amp; Stone Landscape Co. All rights reserved. Licensed &amp; Insured.
          </span>
          <span style={{ fontFamily:'var(--font-sans)',fontSize:12,color:'rgba(255,255,255,0.28)' }}>
            Westport · Greenwich · Darien · New Canaan · Wilton, Connecticut
          </span>
        </div>
      </div>
    </footer>
  );
}

window.SiteFooter = SiteFooter;
