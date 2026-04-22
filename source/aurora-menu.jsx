/* Aurora — MENU page */

const AuroraMenu = () => {
  const cocktails = [
    { n: '01', name: 'Old Town Mule', notes: 'Ginger · Galangal · Lime · Smoke', price: '420', tag: 'SIGNATURE' },
    { n: '02', name: 'Phuket Sunset', notes: 'Butterfly Pea · Passion Fruit · Aged Rum', price: '450', tag: 'HOUSE' },
    { n: '03', name: 'Andaman Negroni', notes: 'Campari · Makrut · Cold Brew · Orange', price: '480', tag: 'BARREL' },
    { n: '04', name: 'Nineteen Martini', notes: 'London Dry · Lemongrass · Sea Salt', price: '460', tag: 'DRY' },
    { n: '05', name: 'Golden Hour', notes: 'Mezcal · Pineapple · Chili · Honey', price: '470', tag: 'SMOKE' },
    { n: '06', name: 'Moonlit Basil', notes: 'Gin · Basil · Cucumber · Elderflower', price: '430', tag: 'GARDEN' },
  ];

  const kitchen = [
    { section: 'To Begin', items: [
      { name: 'Crispy Soft-Shell Crab', notes: 'tamarind glaze · green mango · peanut', price: '390' },
      { name: 'Tuna Tataki', notes: 'yuzu ponzu · micro herbs · sesame', price: '420' },
      { name: 'Burrata & Pomelo', notes: 'kaffir oil · toasted brioche', price: '380' },
    ]},
    { section: 'Sea', items: [
      { name: 'Seabass en Papillote', notes: 'lemongrass · ginger · coconut', price: '690' },
      { name: 'Andaman Prawns', notes: 'garlic · chili · white wine butter', price: '650' },
      { name: 'Black Cod Miso', notes: '72-hour marinade · pickled daikon', price: '890' },
    ]},
    { section: 'Land', items: [
      { name: 'Wagyu Short Rib', notes: 'slow-braised · jasmine jus · smoked pea', price: '1,290' },
      { name: 'Massaman Lamb Shank', notes: 'cashew · potato · crisp shallot', price: '790' },
      { name: 'Sky Chicken', notes: 'pandan · lemongrass · coconut rice', price: '520' },
    ]},
    { section: 'Sweet', items: [
      { name: 'Mango Sticky Rice 2.0', notes: 'coconut foam · salted crumble', price: '320' },
      { name: 'Passion Fruit Tart', notes: 'vanilla · torched meringue', price: '340' },
      { name: 'Chocolate Skyline', notes: 'dark · gold leaf · raspberry', price: '360' },
    ]},
  ];

  return (
    <div className="tw-artboard" style={{ background: '#06020F', height: 4600, position: 'relative' }}>
      <AuroraBackdrop intensity={0.6} variant="warm" />
      <AuroraNav active="menu" />

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 80px', textAlign: 'center' }}>
        <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.45em', opacity: 0.7, marginBottom: 20 }}>
          ( THE CARTE )
        </div>
        <h1 className="tw-serif" style={{ fontSize: 152, lineHeight: 0.92, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          The <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">menu,</span><br/>
          as you like it.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 540, margin: '36px auto 0', opacity: 0.75, fontWeight: 300 }}>
          Twelve signature cocktails, a Thai-rooted kitchen, and a wine list chosen
          for altitude. Every plate is paired with a view.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40 }}>
          {['Cocktails', 'Kitchen', 'Wine', 'Sweets'].map((t, i) => (
            <div key={i} style={{
              padding: '10px 20px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.18)',
              background: i === 0 ? 'rgba(253,224,71,0.1)' : 'rgba(255,255,255,0.03)',
              fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
              color: i === 0 ? 'var(--twist-yellow)' : 'rgba(255,255,255,0.8)'
            }}>{t}</div>
          ))}
        </div>
      </section>

      {/* COCKTAILS */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 48 }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-pink)', marginBottom: 20 }}>
              ( 01 ) — COCKTAILS
            </div>
            <h2 className="tw-serif" style={{ fontSize: 72, lineHeight: 0.95, margin: 0, fontWeight: 400 }}>
              Signature <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">pours.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, fontWeight: 300, maxWidth: 480, justifySelf: 'end' }}>
            Our mixologists work in seasons — each list evolves with the island's botanicals.
            What follows is spring 2026.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {cocktails.map((c, i) => (
            <div key={i} style={{
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))',
              overflow: 'hidden'
            }}>
              <div className="tw-ph" data-label={c.name} style={{ height: 260 }} />
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'var(--twist-yellow)' }}>{c.n} · {c.tag}</span>
                  <span className="tw-mono" style={{ fontSize: 11, opacity: 0.7 }}>฿{c.price}</span>
                </div>
                <h3 className="tw-serif" style={{ fontSize: 28, margin: '0 0 8px', fontWeight: 500, lineHeight: 1.1 }}>{c.name}</h3>
                <div className="tw-mono" style={{ fontSize: 11, opacity: 0.55, letterSpacing: '0.06em' }}>{c.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KITCHEN */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-cyan)', marginBottom: 20 }}>
              ( 02 ) — THE KITCHEN
            </div>
            <h2 className="tw-serif" style={{ fontSize: 72, lineHeight: 0.95, margin: 0, fontWeight: 400 }}>
              Fusion, <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">plated.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, fontWeight: 300, maxWidth: 480, justifySelf: 'end' }}>
            Thai roots and international hands, answering to the season. A tasting
            menu is served nightly on request.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          {kitchen.map((g, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 20, borderBottom: '1px solid rgba(253,224,71,0.25)', paddingBottom: 16 }}>
                <div className="tw-serif" style={{ fontSize: 40, fontStyle: 'italic', fontWeight: 400 }}>{g.section}</div>
                <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.5 }}>— ({g.items.length} DISHES)</div>
              </div>
              {g.items.map((it, j) => (
                <div key={j} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div className="tw-serif" style={{ fontSize: 22, marginBottom: 4, fontWeight: 500 }}>{it.name}</div>
                    <div className="tw-mono" style={{ fontSize: 11, opacity: 0.55, letterSpacing: '0.05em' }}>{it.notes}</div>
                  </div>
                  <div className="tw-serif" style={{ fontSize: 22, color: 'var(--twist-yellow)', alignSelf: 'center', fontStyle: 'italic' }}>฿ {it.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* TASTING MENU CTA */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 120px' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 56,
          background: `
            radial-gradient(600px 400px at 85% 20%, rgba(253,224,71,0.2), transparent 60%),
            radial-gradient(700px 500px at 15% 90%, rgba(139,92,246,0.35), transparent 60%)`,
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center'
        }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-yellow)', marginBottom: 20 }}>
              ◉ SIX-COURSE TASTING
            </div>
            <h2 className="tw-serif" style={{ fontSize: 72, lineHeight: 0.95, margin: 0, fontWeight: 400 }}>
              Let the <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">kitchen</span> decide.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, marginTop: 20, maxWidth: 500 }}>
              A six-course chef's journey, paired optionally with wine or cocktails.
              Served nightly by reservation. Allow two hours, end the evening slowly.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="tw-serif" style={{ fontSize: 72, fontWeight: 500, color: 'var(--twist-yellow)', lineHeight: 1 }}>฿2,400</div>
            <div className="tw-mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.15em', marginTop: 8 }}>PP · +฿1,200 WINE PAIRING</div>
            <button style={{
              marginTop: 24, padding: '16px 30px', borderRadius: 999,
              background: 'linear-gradient(92deg, #FDE047, #EC4899 55%, #8B5CF6)',
              color: '#0A0318', border: 'none', fontWeight: 700,
              letterSpacing: '0.14em', fontSize: 12, textTransform: 'uppercase'
            }}>Reserve tasting →</button>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

window.AuroraMenu = AuroraMenu;
