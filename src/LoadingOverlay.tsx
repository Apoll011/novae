import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Phase =
  | "streaming"   // pixels flying from corners toward center
  | "holding"     // logo fully formed, brief pause
  | "revealing";  // overlay fades out, page fades in

interface Particle {
  x: number;
  y: number;
  tx: number;       // target x (center cluster)
  ty: number;       // target y (center cluster)
  sx: number;       // start x
  sy: number;       // start y
  size: number;
  speed: number;    // 0–1 progress per frame multiplier
  progress: number; // 0 → 1
  color: string;
  delay: number;    // frames before starting
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 180;
const STREAM_DURATION_MS = 1800;
const HOLD_DURATION_MS = 1500;
const FADE_DURATION_MS = 1000;

const COLORS = [
  "rgba(204, 255, 0, 0.9)",   // NOVAe yellow-green
  "rgba(204, 255, 0, 0.6)",
  "rgba(255, 255, 255, 0.7)",
  "rgba(180, 230, 0, 0.8)",
  "rgba(255, 255, 255, 0.4)",
];

// ─── PARTICLE CANVAS ──────────────────────────────────────────────────────────

function ParticleCanvas({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const cx = W / 2;
    const cy = H / 2;

    // Corners: spread particles evenly from 4 corners
    const corners = [
      { x: 0, y: 0 },
      { x: W, y: 0 },
      { x: 0, y: H },
      { x: W, y: H },
    ];

    // Target cluster: small random spread around center (simulates logo mass)
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const corner = corners[i % 4];
      const spread = 180;
      return {
        x: corner.x,
        y: corner.y,
        sx: corner.x + (Math.random() - 0.5) * 120,
        sy: corner.y + (Math.random() - 0.5) * 120,
        tx: cx + (Math.random() - 0.5) * spread,
        ty: cy + (Math.random() - 0.5) * spread,
        size: Math.random() * 6 + 4,
        speed: 0.004 + Math.random() * 0.007,
        progress: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.floor(Math.random() * 28),
      };
    });

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      ctx.clearRect(0, 0, W, H);

      let allArrived = true;

      particlesRef.current.forEach((p) => {
        if (p.delay > 0) {
          p.delay--;
          allArrived = false;
          return;
        }

        if (p.progress < 1) {
          allArrived = false;
          // Ease in-out cubic
          p.progress = Math.min(1, p.progress + p.speed);
        }

        const t = easeInOutCubic(p.progress);
        p.x = p.sx + (p.tx - p.sx) * t;
        p.y = p.sy + (p.ty - p.sy) * t;

        // Trail effect: draw fading tail
        const tailLength = 6;
        for (let j = tailLength; j >= 0; j--) {
          const tj = easeInOutCubic(Math.max(0, p.progress - j * 0.025));
          const tx_ = p.sx + (p.tx - p.sx) * tj;
          const ty_ = p.sy + (p.ty - p.sy) * tj;
          const alpha = ((tailLength - j) / tailLength) * 0.35;
          ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.fillRect(tx_ - p.size / 2, ty_ - p.size / 2, p.size * 0.6, p.size * 0.6);
        }

        // Main pixel
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      });

      if (allArrived && !doneRef.current) {
        doneRef.current = true;
        onComplete();
        return;
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── LOADING OVERLAY ──────────────────────────────────────────────────────────

interface LoadingOverlayProps {
  onRevealComplete: () => void;
}

export function LoadingOverlay({ onRevealComplete }: LoadingOverlayProps) {
  const [phase, setPhase] = useState<Phase>("streaming");
  const [logoScale, setLogoScale] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  // When particles finish → show logo → hold → reveal
  const handleParticlesDone = () => {
    // Snap logo in
    setLogoScale(1);
    setPhase("holding");

    setTimeout(() => {
  onRevealComplete(); // ← page starts fading in NOW, while e is still glowing
  setTimeout(() => {
    setPhase("revealing"); // ← e starts fading out a bit later
  }, 600);
}, HOLD_DURATION_MS);
  };

  return (
    <AnimatePresence>
      {phase !== "revealing" || overlayOpacity > 0 ? (
        <motion.div
          key="overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "revealing" ? 0 : 1 }}
          transition={{ duration: FADE_DURATION_MS / 1000, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (phase === "revealing") setOverlayOpacity(0);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Blurred bg image — so dark it reads as near-black
            backgroundImage: "url('images/background.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          {/* Heavy blur + dark overlay to make bg near-black */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(40px) brightness(0.08)",
              WebkitBackdropFilter: "blur(40px) brightness(0.08)",
              background: "rgba(4,4,4,0.82)",
            }}
          />

          {/* Pixel particle canvas */}
          {phase === "streaming" && (
            <ParticleCanvas onComplete={handleParticlesDone} />
          )}

          {/* Radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: phase === "holding" || phase === "revealing" ? 0.6 : 0,
              scale: phase === "holding" || phase === "revealing" ? 1.2 : 0.4,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(204,255,0,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Logo — the 'e' image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: logoScale,
              scale: logoScale === 1 ? 1 : 0.6,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="images/nova_e.png"
              alt="NOVAe"
              style={{
                width: 400,
                height: 400,
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 32px rgba(204,255,0,0.5)) drop-shadow(0 0 8px rgba(204,255,0,0.8))",
              }}
            />

            {/* Pixel scatter ring around logo on formation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: phase === "holding" ? [0, 0.7, 0] : 0,
                scale: phase === "holding" ? [0.7, 1.4, 1.8] : 0.7,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: -40,
                borderRadius: "50%",
                border: "1px solid rgba(204,255,0,0.3)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Scanline texture overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              pointerEvents: "none",
              zIndex: 4,
              opacity: 0.4,
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}