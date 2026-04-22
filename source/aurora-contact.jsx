/* Aurora — CONTACT page */

const AuroraContact = () => {
  return (
    <div className="tw-artboard" style={{ background: '#06020F', height: 3400, position: 'relative' }}>
      <AuroraBackdrop intensity={0.5} variant="cool" />
      <AuroraNav active="contact" />

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 2, padding: '60px 64px 60px', textAlign: 'center' }}>
        <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.45em', opacity: 0.7, marginBottom: 20 }}>
          ( RESERVATIONS · ENQUIRIES · PRIVATE )
        </div>
        <h1 className="tw-serif" style={{ fontSize: 148, lineHeight: 0.92, margin: 0, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Save us a <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">seat.</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 540, margin: '32px auto 0', opacity: 0.75, fontWeight: 300 }}>
          Reservations, private hires, press and partnership enquiries. We reply
          within 24 hours, usually sooner, often from the bar.
        </p>
      </section>

      {/* MAIN GRID — form + info */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 32 }}>
          {/* FORM */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 48,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0))'
          }}>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-yellow)', marginBottom: 20 }}>
              ( 01 ) — RESERVE A TABLE
            </div>
            <h2 className="tw-serif" style={{ fontSize: 44, lineHeight: 1, margin: '0 0 32px', fontWeight: 400 }}>
              Book your <span style={{ fontStyle: 'italic' }}>evening.</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[['First name', 'Nina'], ['Last name', 'Wattana']].map(([label, placeholder], i) => (
                <label key={i} style={{ display: 'block' }}>
                  <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6, marginBottom: 8 }}>{label.toUpperCase()}</div>
                  <input placeholder={placeholder} style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(255,255,255,0.04)', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }} />
                </label>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[['Email', 'nina@mail.com'], ['Phone', '+66 ...']].map(([label, placeholder], i) => (
                <label key={i} style={{ display: 'block' }}>
                  <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6, marginBottom: 8 }}>{label.toUpperCase()}</div>
                  <input placeholder={placeholder} style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(255,255,255,0.04)', color: '#fff',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                    fontSize: 14, fontFamily: 'inherit', outline: 'none'
                  }} />
                </label>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[['Date', '27 Mar 2026'], ['Time', '19:30'], ['Party', '2 guests']].map(([label, v], i) => (
                <label key={i} style={{ display: 'block' }}>
                  <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6, marginBottom: 8 }}>{label.toUpperCase()}</div>
                  <div style={{
                    padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                    fontSize: 14
                  }}>
                    <span>{v}</span><span style={{ opacity: 0.5 }}>▾</span>
                  </div>
                </label>
              ))}
            </div>

            <label style={{ display: 'block', marginBottom: 20 }}>
              <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6, marginBottom: 8 }}>OCCASION · OPTIONAL</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Birthday', 'Anniversary', 'Date night', 'Business', 'Just because'].map((t, i) => (
                  <div key={i} style={{
                    padding: '9px 16px', borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: i === 2 ? 'rgba(253,224,71,0.12)' : 'rgba(255,255,255,0.03)',
                    color: i === 2 ? 'var(--twist-yellow)' : '#fff',
                    fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500
                  }}>{t}</div>
                ))}
              </div>
            </label>

            <label style={{ display: 'block', marginBottom: 28 }}>
              <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.6, marginBottom: 8 }}>NOTES FOR THE HOST</div>
              <textarea placeholder="Dietary needs, seat preference, champagne on arrival..." style={{
                width: '100%', padding: '14px 16px', minHeight: 100, resize: 'vertical',
                background: 'rgba(255,255,255,0.04)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                fontSize: 14, fontFamily: 'inherit', outline: 'none'
              }} />
            </label>

            <button style={{
              width: '100%', padding: '18px 30px', borderRadius: 999,
              background: 'linear-gradient(92deg, #FDE047, #EC4899 55%, #8B5CF6)',
              color: '#0A0318', border: 'none', fontWeight: 700,
              letterSpacing: '0.18em', fontSize: 13, textTransform: 'uppercase'
            }}>Confirm reservation →</button>
            <div className="tw-mono" style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.15em', marginTop: 14, textAlign: 'center' }}>
              CONFIRMATION BY EMAIL · CANCEL FREE 24H AHEAD
            </div>
          </div>

          {/* INFO COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Address card */}
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 28,
              background: 'linear-gradient(180deg, rgba(253,224,71,0.06), rgba(255,255,255,0))'
            }}>
              <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--twist-yellow)', marginBottom: 14 }}>◉ FIND US</div>
              <div className="tw-serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.3, marginBottom: 10 }}>
                19th Floor,<br/>Royal Phuket City Hotel
              </div>
              <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.65 }}>
                154 Phang Nga Road<br/>
                Phuket Old Town 83000<br/>
                Thailand
              </div>
              <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.15em', marginTop: 18, color: 'var(--twist-cyan)' }}>
                7.8804° N · 98.3923° E
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{
              height: 240, borderRadius: 18, overflow: 'hidden', position: 'relative',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `
                  radial-gradient(600px 400px at 50% 50%, rgba(236,72,153,0.25), transparent 60%),
                  linear-gradient(135deg, #0E0422 0%, #1A0A3A 100%)`,
              }} />
              <svg viewBox="0 0 400 240" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}>
                {[30, 60, 90, 120, 150, 180, 210].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#fff" strokeWidth="0.3" />)}
                {[50, 100, 150, 200, 250, 300, 350].map(x => <line key={x} y1="0" y2="240" x1={x} x2={x} stroke="#fff" strokeWidth="0.3" />)}
                <path d="M40,80 Q140,40 220,90 T380,200" stroke="#FDE047" strokeWidth="1.4" fill="none" />
              </svg>
              <div style={{
                position: 'absolute', left: '48%', top: '48%',
                width: 20, height: 20, borderRadius: 999,
                background: 'var(--twist-pink)',
                boxShadow: '0 0 30px var(--twist-pink), 0 0 60px rgba(236,72,153,0.5)'
              }} />
              <div style={{
                position: 'absolute', left: 'calc(48% + 24px)', top: 'calc(48% - 10px)',
                padding: '6px 12px', borderRadius: 6,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                fontSize: 12
              }} className="tw-mono">TWIST · 19F</div>
            </div>

            {/* Hours */}
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 28
            }}>
              <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--twist-pink)', marginBottom: 14 }}>◷ HOURS</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Bar</span><span className="tw-mono" style={{ opacity: 0.7, fontSize: 12 }}>17:00 → LATE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span>Kitchen</span><span className="tw-mono" style={{ opacity: 0.7, fontSize: 12 }}>17:00 → 23:00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0' }}>
                <span>Live music</span><span className="tw-mono" style={{ opacity: 0.7, fontSize: 12 }}>19:00 → 21:00</span>
              </div>
            </div>

            {/* Direct channels */}
            <div style={{
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 28
            }}>
              <div className="tw-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--twist-cyan)', marginBottom: 14 }}>☏ DIRECT</div>
              {[
                ['Reservations', '+66 76 233 333'],
                ['Events & private', 'events@twistphuket'],
                ['Press', 'press@twistphuket'],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '9px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <span style={{ opacity: 0.7 }}>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ position: 'relative', zIndex: 2, padding: '40px 64px 120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
          <div>
            <div className="tw-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--twist-purple)', marginBottom: 20 }}>
              ( 02 ) — QUESTIONS
            </div>
            <h2 className="tw-serif" style={{ fontSize: 56, margin: 0, lineHeight: 0.95, fontWeight: 400 }}>
              Often <span style={{ fontStyle: 'italic' }} className="tw-gradient-text">asked.</span>
            </h2>
          </div>
          <div>
            {[
              ['Where is TWIST located?', '19th floor of the Royal Phuket City Hotel, 154 Phang Nga Road, Phuket Old Town.'],
              ['Do you have a dress code?', 'Smart casual. No tank tops or beachwear — you came all the way up, look the part.'],
              ['Is there live music every night?', 'Yes — soft live music daily from 19:00 to 21:00. Louder sets on event nights.'],
              ['Can I host a private event?', 'Absolutely — from twelve-cover chef\'s tables to full buyouts. Write to events@twistphuket.'],
              ['What about kids?', 'Families welcome until 21:00; after that the room leans grown-up.'],
            ].map(([q, a], i) => (
              <details key={i} open={i === 0} style={{
                borderTop: '1px solid rgba(255,255,255,0.1)', padding: '22px 0'
              }}>
                <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                  <span className="tw-serif" style={{ fontSize: 24, fontWeight: 500 }}>{q}</span>
                  <span style={{ fontSize: 22, opacity: 0.5 }}>{i === 0 ? '−' : '+'}</span>
                </summary>
                <p style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.75, marginTop: 14, maxWidth: 640 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

window.AuroraContact = AuroraContact;
