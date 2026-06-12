/* Grove & Stone — About Page */
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

function useInViewA(ref) {
  const [v, setV] = useStateA(false);
  useEffectA(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return v;
}

function FadeUpA({ children, delay = 0 }) {
  const ref = useRefA();
  const v = useInViewA(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const TEAM = [
  { name: 'Marcus Webb',    role: 'Founder & Principal Designer', bio: 'With a background in environmental design from Yale, Marcus founded Grove & Stone after 12 years designing estates across New England. He believes every landscape should feel inevitable — as though it always belonged there.', initials: 'MW' },
  { name: 'Elena Harmon',   role: 'Lead Landscape Designer',      bio: 'Elena brings a painter\'s eye to planting design. A graduate of the Conway School, she specializes in layered perennial gardens that offer color and texture from April through November.', initials: 'EH' },
  { name: 'David Park',     role: 'Hardscape Specialist',         bio: 'David has been shaping stone, brick, and concrete into living spaces for over 15 years. His work has been featured in Connecticut Cottages & Gardens and New England Home magazine.', initials: 'DP' },
  { name: 'Rachel Torres',  role: 'Head of Horticulture',         bio: 'A certified arborist and Master Gardener, Rachel leads our plant selection and care programs. She maintains deep knowledge of which species thrive in Fairfield County\'s unique microclimates.', initials: 'RT' },
];

const VALUES = [
  { n: '01', title: 'Craft Over Speed',      body: 'We don\'t cut corners. Every stone is set correctly. Every plant is placed with intention. The work should last a lifetime.' },
  { n: '02', title: 'Site-Specific Design',  body: 'No two properties are the same. We start every project by listening, observing, and understanding what\'s already there.' },
  { n: '03', title: 'Transparent Process',   body: 'You\'ll know exactly what\'s happening, when, and why. Clear proposals. No surprises. Honest conversations.' },
  { n: '04', title: 'Long-Term Partnership', body: 'Many of our clients have been with us for a decade. We take pride in watching landscapes mature and evolve over years.' },
];

const PAGE_HERO_IMG = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=85';

function PageHeader({ title, subtitle, bg }) {
  return (
    <section style={{ height: 400, position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: 72, paddingTop: 72, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,15,8,0.82) 0%, rgba(6,15,8,0.4) 100%)' }} />
      <div className="gs-page-header-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 40px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>{subtitle}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h1>
      </div>
    </section>
  );
}

function AboutPage({ onNav }) {
  return (
    <>
      <PageHeader title="The People Behind the Plants" subtitle="About Grove & Stone" bg={PAGE_HERO_IMG} />

      {/* Story */}
      <section className="gs-section" style={{ background: '#fff', padding: '88px 40px' }}>
        <div className="gs-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <FadeUpA>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>Our Story</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 700, color: 'var(--stone-900)', lineHeight: 1.12, letterSpacing: '-0.01em', margin: '0 0 24px' }}>A Decade of Designing Connecticut's Most Beautiful Properties.</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--stone-600)', lineHeight: 1.75, margin: '0 0 18px' }}>Grove &amp; Stone was founded in 2015 by Marcus Webb, a Yale-trained environmental designer who saw a gap in the Connecticut market: homeowners wanting true design-led landscapes, not just lawn care.</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--stone-600)', lineHeight: 1.75, margin: '0 0 18px' }}>We started with three employees and a single Westport project. Today, a team of 15 specialists serves properties across Fairfield County — each project still receiving the same close attention that defined our first.</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--stone-600)', lineHeight: 1.75, margin: 0 }}>We believe landscapes should be designed to be experienced — not just admired from a window. Every project we undertake is an opportunity to create a space worth living in.</p>
          </FadeUpA>
          <FadeUpA delay={140}>
            <div style={{ background: 'var(--stone-50)', borderRadius: 20, padding: 48 }}>
              {[['2015','Founded in Westport, CT'],['2016','First Fairfield County award for residential design'],['2019','Expanded team to include dedicated hardscape division'],['2022','200th project milestone — Greenwich Estate'],['2024','Named top landscaper in Connecticut by CT Magazine']].map(([yr,ev]) => (
                <div key={yr} style={{ display: 'flex', gap: 20, paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--stone-200)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--color-accent)', minWidth: 48, flexShrink: 0 }}>{yr}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--stone-600)', lineHeight: 1.6 }}>{ev}</div>
                </div>
              ))}
            </div>
          </FadeUpA>
        </div>
      </section>

      {/* Team */}
      <section className="gs-section" style={{ background: 'var(--stone-50)', padding: '88px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUpA>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>The Team</span>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: 'var(--stone-900)', lineHeight: 1.1, margin: 0 }}>The Specialists Behind Every Project</h2>
            </div>
          </FadeUpA>
          <div className="gs-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {TEAM.map((m, i) => (
              <FadeUpA key={m.name} delay={i * 80}>
                <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 8px rgba(14,25,16,0.06)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: '#fff' }}>{m.initials}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--stone-900)', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 14 }}>{m.role}</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--stone-600)', lineHeight: 1.68, margin: 0 }}>{m.bio}</p>
                </div>
              </FadeUpA>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="gs-section" style={{ background: 'var(--green-900)', padding: '88px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeUpA>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>What We Stand For</span>
                <span style={{ width: 24, height: 1.5, background: 'var(--color-accent)', display: 'block' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0 }}>Our Values</h2>
            </div>
          </FadeUpA>
          <div className="gs-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {VALUES.map((v, i) => (
              <FadeUpA key={v.n} delay={i * 70}>
                <div style={{ borderTop: '2px solid var(--color-accent)', paddingTop: 24 }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 12 }}>{v.n}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>{v.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.68, margin: 0 }}>{v.body}</p>
                </div>
              </FadeUpA>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.AboutPage = AboutPage;
window.PageHeader = PageHeader;
