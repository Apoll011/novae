import { motion } from "motion/react";

export function UnsupportedScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(2,2,4,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: 24,
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        padding: "40px 36px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.06)",
        border: "0.5px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        maxWidth: 320,
        textAlign: "center",
      }}>
        {/* Laptop icon */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="36" height="24" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" />
          <rect x="12" y="15" width="24" height="14" rx="1.5" fill="rgba(204,255,0,0.15)" stroke="rgba(204,255,0,0.4)" strokeWidth="1" />
          <path d="M2 34h44l-3 4H5L2 34z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <circle cx="24" cy="37" r="1.2" fill="rgba(255,255,255,0.3)" />
        </svg>

        {/* Headline */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.90)",
          margin: 0,
          lineHeight: 1.5,
        }}>
          Best experienced on desktop or tablet in landscape mode
        </p>

        {/* Divider */}
        <div style={{
          width: "100%",
          height: "0.5px",
          background: "rgba(255,255,255,0.12)",
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 300,
          color: "rgba(255,255,255,0.40)",
          margin: 0,
          letterSpacing: "0.04em",
          lineHeight: 1.6,
        }}>
          Please rotate your device or switch to a larger screen.
        </p>

        {/* NOVAe yellow accent dot */}
        <div style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: "#ccff00",
          boxShadow: "0 0 8px rgba(204,255,0,0.6)",
        }} />
      </div>
    </motion.div>
  );
}