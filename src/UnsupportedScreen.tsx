import { motion } from "motion/react";

export function UnsupportedScreen({ isRotate }: { isRotate: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#080808",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "min(420px, 85vw)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          background: "rgba(255,255,255,0.07)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          borderRadius: 24,
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src="images/nova_e.png"
          alt="NOVAe"
          style={{ width: 64, height: 64, objectFit: "contain" }}
        />

        {/* Icon */}
        <span style={{ fontSize: 40 }}>
          {isRotate ? "🔄" : "💻"}
        </span>

        {/* Message */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.72)",
          letterSpacing: "0.02em",
          margin: 0,
        }}>
          {isRotate
            ? "Please rotate your device to landscape mode for the best experience."
            : "Best experienced on desktop or tablet in landscape mode."
          }
        </p>
      </motion.div>
    </motion.div>
  );
}