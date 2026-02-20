import { motion } from 'framer-motion'

const FEATURES_LIST = [
  { id: 'display', label: 'Display', icon: '📱', shortDesc: '120Hz AMOLED' },
  { id: 'camera', label: 'Camera', icon: '📷', shortDesc: '50MP AI Camera' },
  { id: 'processor', label: 'Processor', icon: '⚡', shortDesc: 'UNISOC T7025' },
  { id: 'triggers', label: 'Triggers', icon: '🎮', shortDesc: 'Shoulder Buttons' },
  { id: 'battery', label: 'Battery', icon: '🔋', shortDesc: '5000mAh' },
]

export default function FeatureNav({ activeFeature, onFeatureClick }) {
  return (
    <motion.nav
      className="feature-nav"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {FEATURES_LIST.map((feature) => (
        <motion.button
          key={feature.id}
          className={`feature-nav-btn ${activeFeature === feature.id ? 'active' : ''}`}
          onClick={() => onFeatureClick(feature.id)}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="feature-nav-icon">{feature.icon}</span>
          <span className="feature-nav-label">{feature.label}</span>
          <span className="feature-nav-desc">{feature.shortDesc}</span>
          {activeFeature === feature.id && (
            <motion.div
              className="feature-nav-indicator"
              layoutId="activeIndicator"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </motion.nav>
  )
}
