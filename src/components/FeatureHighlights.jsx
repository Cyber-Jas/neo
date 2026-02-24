import { motion } from 'framer-motion'

const HIGHLIGHT_FEATURES = [
  {
    id: 'display',
    icon: '📱',
    title: 'Display',
    subtitle: '120Hz AMOLED',
    color: '#ff0a0a',
  },
  {
    id: 'camera',
    icon: '📷',
    title: 'Camera',
    subtitle: '50MP AI Camera',
    color: '#ff4444',
  },
  {
    id: 'processor',
    icon: '⚡',
    title: 'Processor',
    subtitle: 'UNISOC T9100',
    color: '#ff0a0a',
  },
  {
    id: 'triggers',
    icon: '🎮',
    title: 'Triggers',
    subtitle: 'Shoulder Buttons',
    color: '#ff4444',
  },
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery',
    subtitle: '6000mAh',
    color: '#ff0a0a',
  },
]

export default function FeatureHighlights({ visible, activeFeature, onFeatureClick }) {
  if (!visible) return null

  return (
    <motion.nav
      className="feature-highlights"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      role="navigation"
      aria-label="Phone features"
    >
      <div className="highlights-grid">
        {HIGHLIGHT_FEATURES.map((feat, i) => (
          <motion.button
            key={feat.id}
            className={`highlight-card ${activeFeature === feat.id ? 'active' : ''}`}
            onClick={() => onFeatureClick(feat.id)}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${feat.title}: ${feat.subtitle}`}
            aria-pressed={activeFeature === feat.id}
          >
            <div className="highlight-icon-wrap">
              <span className="highlight-icon">{feat.icon}</span>
              <div className="highlight-glow" style={{ background: feat.color }} />
            </div>
            <div className="highlight-text">
              <span className="highlight-title">{feat.title}</span>
              <span className="highlight-subtitle">{feat.subtitle}</span>
            </div>
            {activeFeature === feat.id && (
              <motion.div
                className="highlight-active-indicator"
                layoutId="highlightIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  )
}
