import { motion } from "motion/react";

interface EntryScreenProps {
  onEnter: () => void;
}

export function EntryScreen({ onEnter }: EntryScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      onClick={onEnter}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}>
        <motion.img
          src="images/nova_e.png"
          alt="NOVAe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: 200,
            height: 200,
            objectFit: "contain",
          }}
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.6)",
            textTransform: "uppercase",
          }}
        >
          Press anywhere to enter
        </motion.span>
      </div>
    </motion.div>
  );
}