/* Aurora — GALLERY page */

const AuroraGallery = () => {
  const categories = ['All', 'The Rooftop', 'The Bar', 'The Kitchen', 'Events', 'Skyline'];
  const tiles = [
    { label: 'ROOFTOP · SUNSET PANO', tall: true, wide: false },
    { label: 'BAR · COUNTER', tall: false, wide: false },
    { label: 'DISH · BLACK COD', tall: false, wide: false },
    { label: 'CITY LIGHTS · VERT', tall: true, wide: false },
    { label: 'GUEST · CANDLELIT', tall: false, wide: false },
    { label: 'COCKTAIL · DETAIL', tall: false, wide: false },
    { label: 'SKYLINE · PANORAMA 2', tall: false, wide: true },
    { label: 'JAZZ SET · STAGE', tall: false, wide: false },
    { label: 'INTERIOR · LOUNGE', tall: false, wide: false },
    { label: 'EVENT · CROWD', tall: true, wide: false },
    { label: 'PLATING', tall: false, wide: false },
    { label: 'BARTENDER · POUR', tall: false, wide: false },
    { label: 'SUNSET · OVER OLD TOWN', tall: false, wide: true },
    { label: 'DETAIL · GARNISH', tall: false, wide: false },
    { label: 'COUPLE · DINNER', tall: false, wide: false },
    { label: 'FULL MOON', tall: true, wide: false },
  ];

  return (
    <div className="tw-artboard" style={{ background: '#06020F', height: 4000, position: 'relative' }}>
      <AuroraBackdrop intensity={0.5} variant="cool" />
      <AuroraNav active="gallery" />

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 60px', textAlign: 'center' }}>
        <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.45em', opacity: 0.7, marginBottom: 20 }}>
          ( THE ARCHIVE · 2019 → 2026 )
        </div>
        <h1 className="tw-serif" style={{ fontSize: 148, lineHeight: 0.92, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Evenings, <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">collected.</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: '32px auto 0', opacity: 0.75, fontWeight: 300 }}>
          Seven years of rooftop nights, plated moments, and a skyline that never
          shows the same face twice. A rolling archive, updated monthly.
        </p>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
          {categories.map((c, i) => (
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

      {/* FEATURED HERO TILE */}
      <section style={{ position: 'relative', zIndex: 2, padding: '20px 64px 24px' }}>
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="tw-ph" data-label="FEATURED · ROOFTOP PANO 1312×560" style={{ height: 560 }} />
          <div style={{ position: 'absolute', left: 40, bottom: 36, maxWidth: 640 }}>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-yellow)', marginBottom: 12 }}>◉ THIS WEEK · FEATURED</div>
            <h2 className="tw-serif" style={{ fontSize: 60, lineHeight: 0.95, fontWeight: 400, margin: 0 }}>
              The <span style={{ fontStyle: 'italic' }}>golden hour,</span> in April.
            </h2>
            <div className="tw-mono" style={{ fontSize: 11, opacity: 0.7, marginTop: 14, letterSpacing: '0.15em' }}>18:42 · 22 APR 2026 · N. SAE-TANG</div>
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '240px',
          gap: 12
        }}>
          {tiles.map((t, i) => (
            <div key={i} className="tw-ph" data-label={t.label} style={{
              gridRow: t.tall ? 'span 2' : 'span 1',
              gridColumn: t.wide ? 'span 2' : 'span 1',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.06)'
            }} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <button style={{
            padding: '16px 34px', borderRadius: 999,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontWeight: 600, letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
          }}>Load more moments ↓</button>
        </div>
      </section>

      {/* SHARE YOUR OWN */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 120px' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 48,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center',
          background: 'linear-gradient(92deg, rgba(253,224,71,0.06), rgba(236,72,153,0.08) 50%, rgba(139,92,246,0.08))'
        }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-pink)', marginBottom: 14 }}>
              #TWISTPHUKET
            </div>
            <h2 className="tw-serif" style={{ fontSize: 48, margin: 0, fontWeight: 400, lineHeight: 1.05 }}>
              Tag us. <span style={{ fontStyle: 'italic' }}>Your</span> night belongs here too.
            </h2>
          </div>
          <button style={{
            padding: '16px 30px', borderRadius: 999,
            background: '#fff', color: '#0A0318', border: 'none',
            fontWeight: 700, letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
          }}>Follow on Instagram →</button>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

window.AuroraGallery = AuroraGallery;
