import { motion } from 'framer-motion'

export default function HeroOverlay({ visible, onExplore }) {
  if (!visible) return null

  return (
    <motion.div
      className="hero-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
    >
      <div className="hero-text-left">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="eyebrow-line" />
          <span className="eyebrow-text">INTRODUCING</span>
          <span className="eyebrow-line" />
        </motion.div>

        <motion.h2
          className="hero-tagline"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          GAME
          <br />
          <span className="hero-tagline-accent">BEYOND</span>
          <br />
          LIMITS
        </motion.h2>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          Shoulder triggers. 120Hz display.
          <br />
          Built for champions.
        </motion.p>
        <motion.div
          className="hero-price"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6 }}
        >
          <span className="price-label">Starting at</span>
          <span className="price-value">$199</span>
        </motion.div>
      </div>

      <div className="hero-text-right">
        <motion.div
          className="hero-instruction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="drag-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 5H9L12 2Z" fill="currentColor" opacity="0.5" />
              <path d="M12 22L9 19H15L12 22Z" fill="currentColor" opacity="0.5" />
              <path d="M2 12L5 9V15L2 12Z" fill="currentColor" opacity="0.5" />
              <path d="M22 12L19 15V9L22 12Z" fill="currentColor" opacity="0.5" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <p>Drag to rotate &bull; Click hotspots to explore</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

