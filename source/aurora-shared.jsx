/* Aurora — shared nav + footer + backdrop utilities for all pages */

const AuroraBackdrop = ({ intensity = 1, variant = 'default' }) => {
  const presets = {
    default: `
      radial-gradient(800px 600px at 85% 20%, rgba(253,224,71,${0.28 * intensity}), transparent 60%),
      radial-gradient(900px 700px at 15% 75%, rgba(139,92,246,${0.48 * intensity}), transparent 60%),
      radial-gradient(700px 500px at 60% 95%, rgba(236,72,153,${0.38 * intensity}), transparent 55%),
      radial-gradient(600px 450px at 95% 65%, rgba(96,165,250,${0.28 * intensity}), transparent 55%),
      linear-gradient(180deg, #0A0318 0%, #06020F 100%)`,
    cool: `
      radial-gradient(900px 700px at 20% 20%, rgba(96,165,250,${0.4 * intensity}), transparent 60%),
      radial-gradient(800px 600px at 90% 80%, rgba(139,92,246,${0.5 * intensity}), transparent 60%),
      radial-gradient(600px 500px at 50% 50%, rgba(236,72,153,${0.2 * intensity}), transparent 55%),
      linear-gradient(180deg, #06021A 0%, #06020F 100%)`,
    warm: `
      radial-gradient(900px 700px at 80% 15%, rgba(253,224,71,${0.35 * intensity}), transparent 60%),
      radial-gradient(800px 600px at 10% 85%, rgba(236,72,153,${0.45 * intensity}), transparent 60%),
      radial-gradient(700px 500px at 50% 60%, rgba(139,92,246,${0.3 * intensity}), transparent 55%),
      linear-gradient(180deg, #0A0318 0%, #06020F 100%)`,
  };
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: presets[variant] }} />
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>")`
      }} />
    </>
  );
};

const AuroraNav = ({ active = 'home' }) => {
  const items = [
    ['Home', 'home'],
    ['Menu', 'menu'],
    ['Gallery', 'gallery'],
    ['Events', 'events'],
    ['Journal', 'blog'],
    ['Contact', 'contact'],
  ];
  return (
    <nav style={{
      position: 'relative', zIndex: 5, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between',
      padding: '28px 64px',
    }}>
      <div className="tw-italiana" style={{ fontSize: 28, letterSpacing: '0.3em' }}>TWIST</div>
      <div style={{ display: 'flex', gap: 36, fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
        {items.map(([label, key]) => (
          <span key={key} style={{
            opacity: active === key ? 0.95 : 0.65,
            color: active === key ? '#fff' : '#fff',
            borderBottom: active === key ? '1px solid rgba(253,224,71,0.8)' : 'none',
            paddingBottom: 3
          }}>{label}</span>
        ))}
      </div>
      <button style={{
        padding: '12px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(14px)',
        color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase'
      }}>Reserve →</button>
    </nav>
  );
};

const AuroraFooter = () => (
  <footer style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '60px 64px 40px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 60 }}>
      <div>
        <div className="tw-italiana" style={{ fontSize: 32, letterSpacing: '0.3em', marginBottom: 18 }}>TWIST</div>
        <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.55, maxWidth: 340 }}>
          19th Floor, Royal Phuket City Hotel. Phuket Old Town's most iconic rooftop bar & restaurant.
        </p>
      </div>
      {[
        { h: 'VISIT', l: ['Gallery', 'Menu', 'Events', 'Journal'] },
        { h: 'HOURS', l: ['Daily 5 PM – Late', 'Live music 19:00 – 21:00', 'Kitchen til 23:00'] },
        { h: 'CONNECT', l: ['Instagram', 'Facebook', 'TripAdvisor', 'contact@twist'] }
      ].map((c, i) => (
        <div key={i}>
          <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.25em', opacity: 0.5, marginBottom: 16 }}>{c.h}</div>
          {c.l.map((x, j) => <div key={j} style={{ fontSize: 14, marginBottom: 8, opacity: 0.8 }}>{x}</div>)}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.4, letterSpacing: '0.15em' }} className="tw-mono">
      <div>© 2026 TWIST · ROYAL PHUKET CITY HOTEL</div>
      <div>MADE FOR THE NIGHT</div>
    </div>
  </footer>
);

window.AuroraBackdrop = AuroraBackdrop;
window.AuroraNav = AuroraNav;
window.AuroraFooter = AuroraFooter;
