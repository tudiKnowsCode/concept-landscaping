/* Grove & Stone — Contact Page */
const { useState: useStateC, useRef: useRefC, useEffect: useEffectC } = React;

const SERVICE_AREAS = ['Greenwich','Westport','Darien','New Canaan','Wilton','Ridgefield','Fairfield','Norwalk','Weston','Easton','Trumbull','Southport'];
const BUDGETS = ['Under $10,000','$10,000 – $25,000','$25,000 – $75,000','$75,000 – $150,000','$150,000+','Ongoing maintenance'];
const SERVICES_LIST = ['Landscape Design','Garden Maintenance','Hardscaping & Patios','Outdoor Living Spaces','Irrigation & Drainage','Seasonal Planting','Not sure yet'];

function ContactPage({ onNav }) {
  const [form, setForm] = useStateC({ name:'', email:'', phone:'', town:'', budget:'', services:[], description:'' });
  const [sent, setSent] = useStateC(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSvc = svc => setForm(f => ({ ...f, services: f.services.includes(svc) ? f.services.filter(s => s !== svc) : [...f.services, svc] }));

  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  const inputStyle = { width:'100%', padding:'12px 14px', fontFamily:'var(--font-sans)', fontSize:15, color:'var(--stone-900)', background:'#fff', border:'1.5px solid var(--stone-300)', borderRadius:10, outline:'none', boxSizing:'border-box', transition:'border-color 0.2s' };

  return (
    <>
      <PageHeader
        title="Let's Talk About Your Property"
        subtitle="Get in Touch"
        bg="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=85"
      />

      <section className="gs-section" style={{ background:'#fff', padding:'88px 40px' }}>
        <div className="gs-grid-2" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80, alignItems:'start' }}>

          {/* Info column */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <span style={{ width:24, height:1.5, background:'var(--color-accent)', display:'block' }} />
              <span style={{ fontFamily:'var(--font-sans)', fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--color-accent)' }}>Contact Us</span>
            </div>
            <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3vw,40px)', fontWeight:700, color:'var(--stone-900)', lineHeight:1.12, margin:'0 0 20px' }}>Start With a Free <em style={{ fontStyle:'italic', color:'var(--color-brand)' }}>On-Site Consultation.</em></h2>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:15.5, color:'var(--stone-600)', lineHeight:1.72, margin:'0 0 40px' }}>
              Every project begins with a walk of your property. We'll listen to your ideas, share what's possible, and answer any questions — no cost, no obligation.
            </p>

            {[
              { label:'Phone', value:'(203) 555-0182', sub:'Mon–Sat, 8am–6pm' },
              { label:'Email', value:'hello@groveandstone.com', sub:'Typically reply within one business day' },
              { label:'Office', value:'247 Post Road East', sub:'Westport, CT 06880' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom:28 }}>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--stone-400)', marginBottom:4 }}>{item.label}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:16, fontWeight:600, color:'var(--stone-900)' }}>{item.value}</div>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:13, color:'var(--stone-500)', marginTop:2 }}>{item.sub}</div>
              </div>
            ))}

            <div style={{ marginTop:40, paddingTop:32, borderTop:'1px solid var(--stone-200)' }}>
              <div style={{ fontFamily:'var(--font-sans)', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--stone-400)', marginBottom:14 }}>Service Area</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {SERVICE_AREAS.map(town => (
                  <span key={town} style={{ padding:'5px 12px', background:'var(--green-50)', color:'var(--green-800)', border:'1px solid var(--green-200)', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:12, fontWeight:500 }}>{town}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div>
            {sent ? (
              <div style={{ background:'var(--green-50)', border:'1.5px solid var(--green-200)', borderRadius:20, padding:48, textAlign:'center' }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:'var(--color-brand)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 14L11 19L22 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily:'var(--font-serif)', fontSize:28, fontWeight:700, color:'var(--stone-900)', margin:'0 0 12px' }}>Message Received</h3>
                <p style={{ fontFamily:'var(--font-sans)', fontSize:16, color:'var(--stone-600)', lineHeight:1.7, margin:'0 0 28px' }}>
                  Thank you, {form.name.split(' ')[0] || 'there'}! We'll be in touch within one business day to schedule your free consultation.
                </p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', town:'', budget:'', services:[], description:'' }); }} style={{ padding:'12px 28px', background:'var(--color-brand)', color:'#fff', border:'none', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:14, fontWeight:600, cursor:'pointer' }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <div className="gs-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  <div>
                    <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:6 }}>Full Name *</label>
                    <input required style={inputStyle} placeholder="Jane Smith" value={form.name} onChange={e => set('name', e.target.value)} onFocus={e=>e.target.style.borderColor='var(--color-brand)'} onBlur={e=>e.target.style.borderColor='var(--stone-300)'} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:6 }}>Email *</label>
                    <input required type="email" style={inputStyle} placeholder="jane@example.com" value={form.email} onChange={e => set('email', e.target.value)} onFocus={e=>e.target.style.borderColor='var(--color-brand)'} onBlur={e=>e.target.style.borderColor='var(--stone-300)'} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:6 }}>Phone</label>
                    <input type="tel" style={inputStyle} placeholder="(203) 555-0100" value={form.phone} onChange={e => set('phone', e.target.value)} onFocus={e=>e.target.style.borderColor='var(--color-brand)'} onBlur={e=>e.target.style.borderColor='var(--stone-300)'} />
                  </div>
                  <div>
                    <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:6 }}>Town</label>
                    <input style={inputStyle} placeholder="Westport, CT" value={form.town} onChange={e => set('town', e.target.value)} onFocus={e=>e.target.style.borderColor='var(--color-brand)'} onBlur={e=>e.target.style.borderColor='var(--stone-300)'} />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:8 }}>Services Interested In</label>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {SERVICES_LIST.map(svc => (
                      <button key={svc} type="button" onClick={() => toggleSvc(svc)} style={{ padding:'7px 14px', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all 0.18s', background: form.services.includes(svc) ? 'var(--color-brand)' : 'transparent', color: form.services.includes(svc) ? '#fff' : 'var(--stone-700)', border:`1.5px solid ${form.services.includes(svc) ? 'var(--color-brand)' : 'var(--stone-300)'}` }}>
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:8 }}>Approximate Budget</label>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {BUDGETS.map(b => (
                      <button key={b} type="button" onClick={() => set('budget', b)} style={{ padding:'7px 14px', borderRadius:9999, fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500, cursor:'pointer', transition:'all 0.18s', background: form.budget === b ? 'var(--color-brand)' : 'transparent', color: form.budget === b ? '#fff' : 'var(--stone-700)', border:`1.5px solid ${form.budget === b ? 'var(--color-brand)' : 'var(--stone-300)'}` }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, color:'var(--stone-700)', display:'block', marginBottom:6 }}>Tell Us About Your Property</label>
                  <textarea rows={4} style={{ ...inputStyle, resize:'vertical' }} placeholder="Describe your outdoor space and what you're hoping to achieve. Any details about size, existing features, or specific challenges are helpful." value={form.description} onChange={e => set('description', e.target.value)} onFocus={e=>e.target.style.borderColor='var(--color-brand)'} onBlur={e=>e.target.style.borderColor='var(--stone-300)'} />
                </div>

                <button type="submit" style={{ padding:'15px', background:'var(--color-brand)', color:'#fff', border:'none', borderRadius:12, fontFamily:'var(--font-sans)', fontSize:15, fontWeight:700, cursor:'pointer', letterSpacing:'0.03em', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
                  Request Free Consultation
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5H12.5M12.5 7.5L9 4M12.5 7.5L9 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <p style={{ fontFamily:'var(--font-sans)', fontSize:12, color:'var(--stone-400)', textAlign:'center', margin:0 }}>No obligation. We'll reach out within one business day to schedule a site visit.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

window.ContactPage = ContactPage;
