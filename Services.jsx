/* Grove & Stone — Services Page */
const { useState: useStateS, useRef: useRefS, useEffect: useEffectS } = React;

function useInViewS(ref) {
  const [v, setV] = useStateS(false);
  useEffectS(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return v;
}
function FadeUpS({ children, delay = 0 }) {
  const ref = useRefS();
  const v = useInViewS(ref);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>{children}</div>;
}

const SVCS_DETAIL = [
  {
    n:'01', title:'Landscape Design', icon:'🌿',
    img:'/images/services/landscape-design.jpg',
    desc:'Our design process begins with a thorough site analysis and a conversation about how you want to use your outdoor space. We develop detailed master plans that address every element — from tree canopy and planting beds to circulation paths and water features.',
    items:['Full-property master plans','CAD-rendered planting schemes','Grading & drainage planning','Lighting design','Plant palette selection tailored to CT microclimates'],
  },
  {
    n:'02', title:'Garden Maintenance', icon:'✂️',
    img:'/images/services/garden-maintenance.jpg',
    desc:'A beautifully designed landscape requires consistent, expert care to reach its full potential. Our maintenance programs are tailored to each property — not generic "mow and go" schedules, but thoughtful seasonal programs that protect your investment.',
    items:['Weekly & bi-weekly maintenance contracts','Pruning & shaping','Fertilization programs','Pest & disease management','Bed edging & mulching'],
  },
  {
    n:'03', title:'Hardscaping & Patios', icon:'🪨',
    img:'/images/services/hardscaping-patios.jpg',
    desc:'Stone, brick, and concrete become art in our hands. We design and install patios, walkways, retaining walls, steps, and driveways that are as structurally sound as they are beautiful — built to handle New England freeze-thaw cycles for decades.',
    items:['Natural stone & bluestone patios','Paver driveways & walkways','Retaining walls','Steps & staircases','Permeable paving solutions'],
  },
  {
    n:'04', title:'Outdoor Living Spaces', icon:'🔥',
    img:'/images/services/outdoor-living-spaces.png',
    desc:'The boundary between inside and outside should be effortless. We design and build comprehensive outdoor living areas — from intimate fire pit circles to full outdoor kitchens with seating, shade structures, and integrated lighting.',
    items:['Outdoor kitchens & dining areas','Fire pits & fireplaces','Pergolas & shade structures','Pool surrounds','Privacy screening & hedging'],
  },
  {
    n:'05', title:'Irrigation & Drainage', icon:'💧',
    img:'/images/services/irrigation.jpg',
    desc:'Healthy plants start with proper water management. We install smart irrigation systems that respond to weather conditions, and engineer drainage solutions that protect your property from erosion and water damage.',
    items:['Smart drip & spray irrigation','Automated scheduling systems','French drains & dry creek beds','Grading & regrading','Rain garden design'],
  },
  {
    n:'06', title:'Seasonal Planting', icon:'🌸',
    img:'/images/services/seasonal-planting.jpg',
    desc:'Connecticut\'s four seasons offer a full palette of color and texture. Our horticulture team designs rotating seasonal displays that keep your property looking vibrant from the first thaw in March through the first frost in November.',
    items:['Spring bulb installation','Summer annual programs','Fall perennial planting','Winter interest planning','Container & planter design'],
  },
];

const FAQS = [
  { q: 'What areas of Connecticut do you serve?', a: 'We primarily serve Fairfield County — including Greenwich, Westport, Darien, New Canaan, Wilton, Ridgefield, Fairfield, and Norwalk. We occasionally take on projects in Litchfield County and the New Haven shore for larger estates.' },
  { q: 'How much does a landscape design project cost?', a: 'Residential landscape design projects typically range from $15,000 to $150,000+ depending on scope. A garden design consultation and master plan starts at $2,500. We provide detailed, itemized proposals so you always know exactly what you\'re getting.' },
  { q: 'Do you handle permits for hardscape work?', a: 'Yes. Our project manager handles all permitting with your town, including wetlands approvals if required. We\'re familiar with the specific requirements of every municipality we serve in Fairfield County.' },
  { q: 'How long does the design process take?', a: 'A typical master plan takes 4–6 weeks from site visit to final presentation. Installation scheduling depends on scope and our availability — we recommend reaching out in fall or winter to secure a spring installation date.' },
  { q: 'Do you offer annual maintenance contracts?', a: 'Yes. Our maintenance programs start at $3,600/year for a standard residential property. Clients on annual contracts receive priority scheduling, consistent crews, and discounted rates on any additional installation work.' },
];

function ServicesPage({ onNav }) {
  const [openFaq, setOpenFaq] = useStateS(null);

  return (
    <>
      <PageHeader
        title="What We Do Best"
        subtitle="Our Services"
        bg="/images/services/hero.jpg"
      />

      {/* Services detail */}
      <section className="gs-section" style={{ background: '#fff', padding: '88px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 80 }}>
          {SVCS_DETAIL.map((svc, i) => (
            <FadeUpS key={svc.n} delay={0}>
              <div className="gs-svc-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>
                <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', direction: 'ltr' }} />
                </div>
                <div style={{ direction: 'ltr' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 10 }}>{svc.n}</div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, color: 'var(--stone-900)', margin: '0 0 16px', lineHeight: 1.1 }}>{svc.title}</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, color: 'var(--stone-600)', lineHeight: 1.72, margin: '0 0 24px' }}>{svc.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {svc.items.map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--stone-700)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUpS>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="gs-section" style={{ background: 'var(--stone-50)', padding: '88px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <FadeUpS>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>FAQ</span>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 700, color: 'var(--stone-900)', lineHeight: 1.1, margin: 0 }}>Common Questions</h2>
            </div>
          </FadeUpS>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--stone-200)', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, textAlign: 'left' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--stone-900)', lineHeight: 1.4 }}>{f.q}</span>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', border: '1.5px solid var(--stone-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', background: openFaq === i ? 'var(--color-brand)' : 'transparent', borderColor: openFaq === i ? 'var(--color-brand)' : 'var(--stone-300)' }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s' }}>
                      <path d="M5.5 2V9M2 5.5H9" stroke={openFaq === i ? '#fff' : 'var(--stone-500)'} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 22 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--stone-600)', lineHeight: 1.72, margin: 0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={() => onNav('contact')} style={{ padding: '14px 32px', background: 'var(--color-brand)', color: '#fff', border: 'none', borderRadius: 9999, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Ask Us Anything →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

window.ServicesPage = ServicesPage;
