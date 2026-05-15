import { motion, AnimatePresence, useMotionValue } from "motion/react"
import { useState } from "react";
 
 
const CARDS_CONFIG = [
  {
    id: "c1",
    label: "Partnerships",
    image: "images/cards.png",
    position: { top: "70%", left: "40%" },
    rotation: 10,
    link: "#partnerships",
    size: { w: 260, h: 160 },
    zIndex: 3,
    labelPosition: "top"
  },
  {
    id: "c2",
    label: "NOVAe",
    image: "images/e.png",
    position: { top: "20%", left: "40%" },
    rotation: 2.0,
    link: "#novae",
    size: { w: 260, h: 340 },
    zIndex: 2,
    labelPosition: "top",
    labelOffset: 0,

  },
  {
    id: "c3",
    label: "Newsletter",
    image: "images/newsletter.png",
    position: { top: "8%", right: "-4%" },
    rotation: 20,
    link: "#newsletter",
    size: { w: 400, h: 150 },
    zIndex: 4,
  },
  {
    id: "c4",
    label: "Projects",
    image: "images/notebook.png",
    position: { bottom: "48%", right: "70%" },
    rotation: -15,
    link: "#projects",
    size: { w: 260, h: 340 },
    zIndex: 2,
    labelOffset: 0,
  },
  {
    id: "c5",
    label: "Meet the Team",
    image: "images/photo.png",
    position: { bottom: "20%", left: "65%" },
    rotation: 10,
    link: "#team",
    size: { w: 350, h: 260 },
    zIndex: 3,
  },
  {
    id: "c6",
    label: "Knowledge Base",
    image: "images/folder.png",
    position: { bottom: "-8%", right: "70%" },
    rotation: -5,
    link: "#knowledge-base",
    size: { w: 340, h: 340 },
    zIndex: 2,
    labelPosition: "top",
    labelOffset: 18,
  },
];
 
 
export function Navbar() { 
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        position: "fixed",
        top: 8, left: "35%", right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "70px",
        width: "350px",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        background: "rgba(8,8,8,0.45)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        margin: 24,
        borderRadius: 40,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: 8,
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.7)" />
            <rect x="8" y="1" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.35)" />
            <rect x="1" y="8" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.35)" />
            <rect x="8" y="8" width="5" height="5" rx="1.5" fill="rgba(255,255,255,0.7)" />
          </svg>
        </div>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "18px",
          color: "rgba(255,255,255,0.88)",
          letterSpacing: "0.04em",
        }}>
          NOVAe
        </span>
      </div>
    </motion.nav>
  );
}
 
 
function FloatingCard({ card, index}) {
  const [isHovered, setIsHovered] = useState(false);
  const positionStyle = {
    position: "absolute",
    width: card.size.w,
    height: card.size.h,
    zIndex: isHovered ? 50 : card.zIndex,
    ...card.position,
  };
 
  const baseRotate = card.rotation;
  const hoverRotateShift = card.rotation > 0 ? -1.2 : 1.2;
 
  return (
    
    <motion.a
      href={card.link}
      style={positionStyle}
      initial={{ opacity: 0, y: 30, rotate: baseRotate }}
      animate={{ opacity: 1, y: 0, rotate: baseRotate }}
      transition={{
        opacity: { duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.1, delay: 0.4 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
        rotate: { duration: 0 },
      }}
      whileHover={{
        y: -14,
        x: card.rotation > 0 ? 5 : -5,
        scale: 1.03,
        rotate: baseRotate + hoverRotateShift,
        zIndex: 50,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card body */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 18,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
 
       


      </motion.div>
 
      {/* Floating label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "absolute",
                ...(card.labelPosition === "top"
                    ? { top: card.labelOffset !== undefined ? card.labelOffset : -38, bottom: "auto" }
                    : { bottom: card.labelOffset !== undefined ? card.labelOffset : -38, top: "auto" }),
                left: "50%",
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 60,
            }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 24,
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              background: "rgba(255,255,255,0.09)",
              border: "0.5px solid rgba(255,255,255,0.16)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <div style={{
                width: 5, height: 5,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.65)",
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.78)",
                textTransform: "uppercase",
              }}>
                {card.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
 
export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-deep)",
      }}
    >
      {/* Background — swap this div's backgroundImage for any asset */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "url('images/background.png')",
        zIndex: 0,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} />
 
      {/* Subtle noise grain */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
        pointerEvents: "none",
      }} />
 
      {/* Center fine grid decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, delay: 0.8 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 80%)",
          pointerEvents: "none",
        }}
      />
 
      {/* Floating cards */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
        {CARDS_CONFIG.map((card, i) => (
          <FloatingCard key={card.id} card={card} index={i} />
        ))}
      </div>
 
      {/* Center ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(120, 80, 200, 0.06) 0%, transparent 70%)",
        zIndex: 2,
        pointerEvents: "none",
      }} />
 
      {/* Bottom fade */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "25%",
        background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 100%)",
        zIndex: 8,
        pointerEvents: "none",
      }} />
 
      {/* Top fade for navbar blending */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "20%",
        background: "linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, transparent 100%)",
        zIndex: 8,
        pointerEvents: "none",
      }} />
 
      {/* Minimal center wordmark — decorative only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
            opacity: 1,
            y: [0, -6, 0],
        }}
        transition={{
            opacity: { duration: 1.2, delay: 1.2, ease: "easeOut" },
            y: { duration: 3.2, delay: 2.4, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          bottom: 12,
          left: "41%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        <div style={{
          width: 1,
          height: 32,
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))",
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 300,
          letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.22)",
          textTransform: "uppercase",
        }}>
          Click on the elements to explore
        </span>
      </motion.div>
    </section>
  );
}
 