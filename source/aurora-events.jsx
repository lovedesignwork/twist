/* Aurora — EVENTS page */

const AuroraEvents = () => {
  const upcoming = [
    { date: ['27', 'MAR'], day: 'FRI', title: 'Jazz Night is Back — Vol. 9', sub: 'Live jazz band · Elvis tribute · Buffet dinner', time: '19:00 — 23:00', price: '1,890', accent: 'var(--twist-yellow)', tag: 'SIGNATURE' },
    { date: ['12', 'APR'], day: 'SAT', title: 'Sunset Sessions — DJ Numa', sub: 'Deep house · Rooftop set · Tapas menu', time: '18:00 — 01:00', price: '800', accent: 'var(--twist-pink)', tag: 'MUSIC' },
    { date: ['24', 'APR'], day: 'THU', title: 'Chef\'s Table — Spring Tasting', sub: 'Six courses, paired · Chef Nat at the pass', time: '19:30 seating', price: '2,400', accent: 'var(--twist-purple)', tag: 'DINING' },
    { date: ['08', 'MAY'], day: 'FRI', title: 'Full Moon Rooftop', sub: 'Live acoustic · Signature lunar menu', time: '19:00 — LATE', price: '950', accent: 'var(--twist-cyan)', tag: 'LUNAR' },
  ];

  return (
    <div className="tw-artboard" style={{ background: '#06020F', height: 4500, position: 'relative' }}>
      <AuroraBackdrop intensity={0.6} variant="default" />
      <AuroraNav active="events" />

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 60px', textAlign: 'center' }}>
        <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.45em', opacity: 0.7, marginBottom: 20 }}>
          ( THE CALENDAR · 2026 )
        </div>
        <h1 className="tw-serif" style={{ fontSize: 148, lineHeight: 0.92, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Nights to <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">remember.</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: '32px auto 0', opacity: 0.75, fontWeight: 300 }}>
          A rolling season of live music, chef's tables, full-moon rooftops, and weddings
          held above the city. Seats are limited; the view isn't.
        </p>
      </section>

      {/* FEATURED */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 80px' }}>
        <div style={{
          position: 'relative', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24,
          padding: 0, overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr'
        }}>
          <div className="tw-ph" data-label="EVENT POSTER · JAZZ NIGHT VOL.9" style={{ height: 540 }} />
          <div style={{
            padding: 56,
            background: `
              radial-gradient(500px 400px at 90% 20%, rgba(253,224,71,0.2), transparent 60%),
              radial-gradient(600px 500px at 10% 90%, rgba(139,92,246,0.4), transparent 60%)`,
          }}>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-yellow)', marginBottom: 20 }}>
              ◉ HEADLINE · VOL. 09
            </div>
            <h2 className="tw-serif" style={{ fontSize: 72, lineHeight: 0.9, margin: 0, fontWeight: 400 }}>
              Jazz Night<br/><span style={{ fontStyle: 'italic' }} className="tw-gradient-text">is back.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.8, marginTop: 20, maxWidth: 440 }}>
              Phuket's most soulful comeback — 19 floors up. Live jazz band,
              a full Elvis tribute, dinner buffet, and a skyline that holds its breath.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 30 }}>
              {[['Date', 'Fri · 27 Mar'], ['Doors', '19:00'], ['Ticket', '฿1,890 pp'], ['Floor', '19ᵗʰ']].map(([k, v], i) => (
                <div key={i} style={{ borderTop: '1px solid rgba(253,224,71,0.3)', paddingTop: 10 }}>
                  <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.25em', opacity: 0.55 }}>{k.toUpperCase()}</div>
                  <div className="tw-serif" style={{ fontSize: 24, marginTop: 4, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: 32, padding: '16px 30px', borderRadius: 999,
              background: 'linear-gradient(92deg, #FDE047, #EC4899 55%, #8B5CF6)',
              color: '#0A0318', border: 'none', fontWeight: 700,
              letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
            }}>Reserve your seat →</button>
          </div>
        </div>
      </section>

      {/* UPCOMING LIST */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 40 }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-cyan)', marginBottom: 20 }}>
              ( UPCOMING )
            </div>
            <h2 className="tw-serif" style={{ fontSize: 64, margin: 0, lineHeight: 1, fontWeight: 400 }}>
              The <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">season</span> ahead.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 10, justifySelf: 'end' }}>
            {['All', 'Music', 'Dining', 'Private'].map((t, i) => (
              <div key={i} style={{
                padding: '10px 18px', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.18)',
                background: i === 0 ? 'rgba(253,224,71,0.1)' : 'rgba(255,255,255,0.03)',
                fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
                color: i === 0 ? 'var(--twist-yellow)' : 'rgba(255,255,255,0.8)'
              }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcoming.map((e, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '120px 2fr 1.2fr 120px auto',
              gap: 32, alignItems: 'center',
              padding: '28px 32px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18,
              background: 'linear-gradient(92deg, rgba(255,255,255,0.03), rgba(255,255,255,0))'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div className="tw-serif" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1, color: e.accent }}>{e.date[0]}</div>
                <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', marginTop: 6, opacity: 0.7 }}>{e.date[1]} · {e.day}</div>
              </div>
              <div>
                <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: e.accent, marginBottom: 8 }}>◉ {e.tag}</div>
                <h3 className="tw-serif" style={{ fontSize: 30, margin: 0, fontWeight: 500, lineHeight: 1.1 }}>{e.title}</h3>
              </div>
              <div className="tw-mono" style={{ fontSize: 12, opacity: 0.7, letterSpacing: '0.06em', lineHeight: 1.6 }}>
                {e.sub}<br/>
                <span style={{ opacity: 0.55 }}>{e.time}</span>
              </div>
              <div className="tw-serif" style={{ fontSize: 26, color: e.accent, fontStyle: 'italic' }}>฿{e.price}</div>
              <button style={{
                padding: '12px 20px', borderRadius: 999,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase'
              }}>Reserve →</button>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVATE / WEDDING CTA */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 120px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden',
          minHeight: 440
        }}>
          <div style={{
            padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            background: `radial-gradient(700px 500px at 10% 90%, rgba(236,72,153,0.3), transparent)`,
          }}>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-pink)', marginBottom: 20 }}>
              ( PRIVATE ) — WEDDINGS & HIRE
            </div>
            <h2 className="tw-serif" style={{ fontSize: 64, lineHeight: 0.95, fontWeight: 400, margin: 0 }}>
              Say <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">I do,</span><br/>
              above the clouds.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.8, marginTop: 20, maxWidth: 460 }}>
              Cloud-height ceremonies, anniversary dinners, and full-venue takeovers.
              Our events team designs every detail — from the first toast to the last song.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <button style={{
                padding: '14px 26px', borderRadius: 999,
                background: '#fff', color: '#0A0318', border: 'none', fontWeight: 700,
                letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
              }}>Plan with us →</button>
              <button style={{
                padding: '14px 26px', borderRadius: 999,
                background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.22)',
                fontWeight: 600, letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
              }}>Download brochure</button>
            </div>
          </div>
          <div className="tw-ph" data-label="WEDDING · ROOFTOP CEREMONY" />
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

window.AuroraEvents = AuroraEvents;
