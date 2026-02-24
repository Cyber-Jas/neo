import { motion } from 'framer-motion'

const HIGHLIGHT_FEATURES = [
  {
    icon: '📱',
    title: '120Hz AMOLED',
    subtitle: '6.8" immersive display',
    color: '#ff0a0a',
  },
  {
    icon: '⚡',
    title: '12GB RAM',
    subtitle: 'UNISOC T9100 power',
    color: '#ff4444',
  },
  {
    icon: '🎮',
    title: 'Shoulder Triggers',
    subtitle: 'Console-grade gaming',
    color: '#ff0a0a',
  },
  {
    icon: '🔋',
    title: '6000mAh',
    subtitle: '80W fast charging',
    color: '#ff4444',
  },
]

export default function FeatureHighlights({ visible }) {
  if (!visible) return null

  return (
    <motion.div
      className="feature-highlights"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.8 }}
    >
      <div className="highlights-grid">
        {HIGHLIGHT_FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            className="highlight-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.03 }}
          >
            <div className="highlight-icon-wrap">
              <span className="highlight-icon">{feat.icon}</span>
              <div className="highlight-glow" style={{ background: feat.color }} />
            </div>
            <div className="highlight-text">
              <span className="highlight-title">{feat.title}</span>
              <span className="highlight-subtitle">{feat.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
