import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "#novae" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Knowledge Base", href: "#knowledge-base" },
];

export function MobileHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      {/* Cropped background — centers on the 'e' card area */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url('images/background4.png')",
        backgroundSize: "320% auto",
        backgroundPosition: "38% 22%",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }} />

      {/* Dark overlay for readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.05) 30%, rgba(8,8,8,0.05) 60%, rgba(8,8,8,0.9) 100%)",
        zIndex: 1,
      }} />

      {/* Hamburger menu button */}
      <button
        onClick={() => setMenuOpen(true)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 100,
          width: 40,
          height: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          background: "rgba(255,255,255,0.08)",
          border: "0.5px solid rgba(255,255,255,0.14)",
          borderRadius: 10,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <span style={{ width: 18, height: 1.5, background: "rgba(255,255,255,0.85)" }} />
        <span style={{ width: 18, height: 1.5, background: "rgba(255,255,255,0.85)" }} />
        <span style={{ width: 18, height: 1.5, background: "rgba(255,255,255,0.85)" }} />
      </button>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(4,4,4,0.96)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                background: "rgba(255,255,255,0.08)",
                border: "0.5px solid rgba(255,255,255,0.14)",
                borderRadius: 10,
                color: "rgba(255,255,255,0.85)",
                fontSize: 18,
              }}
            >
              ✕
            </button>

            {NAV_LINKS.map((link) => (
              
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.82)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo + slogan */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 28,
          left: 24,
          zIndex: 10,
        }}
      >
        <img
          src="images/logo.png"
          alt="NOVAe"
          style={{ width: 56, height: "auto", marginBottom: 6 }}
        />
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "17px",
          fontWeight: 800,
          color: "rgba(255,255,255,0.95)",
          margin: 0,
          lineHeight: 1.1,
        }}>
          BUILD <span style={{ color: "#ccff00" }}>SOMETHING.</span>
        </p>
      </motion.div>

      {/* Static 'e' — no animation, no click, just shadow */}
      <div style={{
        position: "absolute",
        top: "44%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 5,
        width: 180,
        height: 180,
      }}>
        <img
          src="images/nova_e.png"
          alt="NOVAe"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(-8px 14px 9px rgba(15,12,8,0.55)) drop-shadow(-2px 4px 3px rgba(15,12,8,0.35))",
          }}
        />
      </div>

      {/* Simple CTA — bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 36,
          left: 24,
          right: 24,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          margin: 0,
        }}>
          Upcoming Event · FORGE Hackaton
        </p>
        
          href="#event"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%",
            padding: "13px 0",
            borderRadius: 24,
            background: "rgba(204,255,0,0.10)",
            border: "0.5px solid rgba(204,255,0,0.30)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ccff00",
            textDecoration: "none",
          }}
        >
          Register
        </a>
      </motion.div>
    </section>
  );
}