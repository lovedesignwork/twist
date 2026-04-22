type Variant = "default" | "cool" | "warm";

const PRESETS = {
  default: (i: number) => `
    radial-gradient(800px 600px at 85% 20%, rgba(253,224,71,${0.28 * i}), transparent 60%),
    radial-gradient(900px 700px at 15% 75%, rgba(139,92,246,${0.48 * i}), transparent 60%),
    radial-gradient(700px 500px at 60% 95%, rgba(236,72,153,${0.38 * i}), transparent 55%),
    radial-gradient(600px 450px at 95% 65%, rgba(96,165,250,${0.28 * i}), transparent 55%),
    linear-gradient(180deg, #0A0318 0%, #06020F 100%)`,
  cool: (i: number) => `
    radial-gradient(900px 700px at 20% 20%, rgba(96,165,250,${0.4 * i}), transparent 60%),
    radial-gradient(800px 600px at 90% 80%, rgba(139,92,246,${0.5 * i}), transparent 60%),
    radial-gradient(600px 500px at 50% 50%, rgba(236,72,153,${0.2 * i}), transparent 55%),
    linear-gradient(180deg, #06021A 0%, #06020F 100%)`,
  warm: (i: number) => `
    radial-gradient(900px 700px at 80% 15%, rgba(253,224,71,${0.35 * i}), transparent 60%),
    radial-gradient(800px 600px at 10% 85%, rgba(236,72,153,${0.45 * i}), transparent 60%),
    radial-gradient(700px 500px at 50% 60%, rgba(139,92,246,${0.3 * i}), transparent 55%),
    linear-gradient(180deg, #0A0318 0%, #06020F 100%)`,
} as const;

interface Props {
  intensity?: number;
  variant?: Variant;
  fixed?: boolean;
}

export function AuroraBackdrop({
  intensity = 1,
  variant = "default",
  fixed = false,
}: Props) {
  const position = fixed ? "fixed" : "absolute";
  return (
    <>
      <div
        aria-hidden
        style={{
          position,
          inset: 0,
          zIndex: 0,
          background: PRESETS[variant](intensity),
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        className="tw-noise"
        style={{ position, inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
    </>
  );
}
