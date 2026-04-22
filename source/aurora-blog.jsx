/* Aurora — JOURNAL / BLOG page */

const AuroraBlog = () => {
  const featured = {
    cat: 'DISPATCH · 14 APR',
    title: 'Say "I do" above the clouds — TWIST as a wedding venue',
    excerpt: 'Your dream wedding deserves a setting as extraordinary as your love story. A look at what it means to hold a ceremony at 78 meters up, from first toast to last song.',
    read: '8 MIN READ · BY NAPAT S.'
  };
  const posts = [
    { date: '22 Aug', title: 'Elevate your senses: the heartbeat of Phuket Old Town nightlife', cat: 'DISPATCH', read: '6 MIN' },
    { date: '20 Jul', title: 'Sunset to stars: an unforgettable evening at TWIST', cat: 'REVIEW', read: '5 MIN' },
    { date: '08 Jul', title: 'The ultimate golden-hour ambiance, documented', cat: 'FEATURE', read: '4 MIN' },
    { date: '11 Jun', title: 'Celebrate Pride Month on the rooftop', cat: 'CULTURE', read: '3 MIN' },
    { date: '28 May', title: 'Behind the pass: a day with Chef Nat', cat: 'KITCHEN', read: '9 MIN' },
    { date: '12 May', title: 'What the botanicals told us — spring cocktail notes', cat: 'BAR', read: '7 MIN' },
  ];

  return (
    <div className="tw-artboard" style={{ background: '#06020F', height: 4200, position: 'relative' }}>
      <AuroraBackdrop intensity={0.5} variant="warm" />
      <AuroraNav active="blog" />

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 60px', textAlign: 'center' }}>
        <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.45em', opacity: 0.7, marginBottom: 20 }}>
          ( THE JOURNAL · EST. 2019 )
        </div>
        <h1 className="tw-serif" style={{ fontSize: 148, lineHeight: 0.92, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Dispatches from <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">above.</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 580, margin: '32px auto 0', opacity: 0.75, fontWeight: 300 }}>
          Notes from the pass, the bar, and the 19th floor. Stories, recipes,
          guest writers, and the occasional quiet evening we had to tell you about.
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {['All', 'Dispatch', 'Kitchen', 'Bar', 'Culture', 'Feature'].map((c, i) => (
            <div key={i} style={{
              padding: '10px 20px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: i === 0 ? 'rgba(253,224,71,0.12)' : 'rgba(255,255,255,0.03)',
              color: i === 0 ? 'var(--twist-yellow)' : '#fff',
              fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500
            }}>{c}</div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 60px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 0,
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(92deg, rgba(255,255,255,0), rgba(253,224,71,0.04))'
        }}>
          <div className="tw-ph" data-label="FEATURE · WEDDING ROOFTOP 800×560" style={{ minHeight: 560 }} />
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-pink)', marginBottom: 20 }}>
              ◉ FEATURED · {featured.cat}
            </div>
            <h2 className="tw-serif" style={{ fontSize: 48, lineHeight: 1.05, margin: 0, fontWeight: 500, textWrap: 'pretty' }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.75, marginTop: 22 }}>{featured.excerpt}</p>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.2em', opacity: 0.6, marginTop: 28 }}>{featured.read}</div>
            <button style={{
              marginTop: 28, padding: '14px 26px', borderRadius: 999,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.22)',
              color: '#fff', fontWeight: 600, letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase',
              alignSelf: 'flex-start'
            }}>Continue reading →</button>
          </div>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          {posts.map((p, i) => (
            <article key={i} style={{
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18,
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))'
            }}>
              <div className="tw-ph" data-label={p.title.slice(0, 28).toUpperCase()} style={{ height: 220 }} />
              <div style={{ padding: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--twist-yellow)' }}>◆ {p.cat}</span>
                  <span className="tw-mono" style={{ fontSize: 10, opacity: 0.55 }}>{p.date}</span>
                </div>
                <h3 className="tw-serif" style={{ fontSize: 24, margin: '0 0 16px', fontWeight: 500, lineHeight: 1.2, textWrap: 'balance' }}>
                  {p.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, opacity: 0.55, letterSpacing: '0.1em' }} className="tw-mono">
                  <span>{p.read} READ</span>
                  <span>READ →</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button style={{
            padding: '16px 34px', borderRadius: 999,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontWeight: 600, letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
          }}>Older entries ↓</button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 120px' }}>
        <div style={{
          borderRadius: 24, padding: 56, textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)',
          background: `
            radial-gradient(700px 400px at 20% 20%, rgba(139,92,246,0.3), transparent 60%),
            radial-gradient(600px 400px at 80% 80%, rgba(253,224,71,0.2), transparent 60%)`
        }}>
          <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-cyan)', marginBottom: 18 }}>
            ( THE NEWSLETTER )
          </div>
          <h2 className="tw-serif" style={{ fontSize: 56, margin: 0, fontWeight: 400, lineHeight: 1.05 }}>
            One <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">dispatch</span>, every full moon.
          </h2>
          <p style={{ fontSize: 16, opacity: 0.75, maxWidth: 500, margin: '20px auto 0' }}>
            New menus, guest nights, and our writer's quiet favorites.
            Fifteen-hundred subscribers, no spam, unsubscribe anytime.
          </p>
          <div style={{ display: 'flex', gap: 0, maxWidth: 520, margin: '36px auto 0', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, overflow: 'hidden', background: 'rgba(0,0,0,0.3)' }}>
            <input placeholder="your@email.com" style={{
              flex: 1, padding: '16px 24px', background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: 14, fontFamily: 'inherit'
            }} />
            <button style={{
              padding: '14px 24px', borderRadius: 999, margin: 3,
              background: 'linear-gradient(92deg, #FDE047, #EC4899 55%, #8B5CF6)',
              color: '#0A0318', border: 'none', fontWeight: 700,
              letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
            }}>Subscribe →</button>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

window.AuroraBlog = AuroraBlog;
