import { motion, AnimatePresence } from 'framer-motion'

const FEATURES = {
  display: {
    title: '6.8" 120Hz AMOLED Display',
    subtitle: 'Immersive Visual Experience',
    specs: [
      { label: 'Screen Size', value: '6.8 inches' },
      { label: 'Resolution', value: '1080 x 2392 FHD+' },
      { label: 'Refresh Rate', value: '120Hz AMOLED' },
      { label: 'Touch Sampling', value: '240Hz' },
      { label: 'Color Gamut', value: 'DCI-P3 100%' },
      { label: 'Brightness', value: '1000+ nits peak' },
      { label: 'Aspect Ratio', value: '20:9' },
      { label: 'Screen-to-Body', value: '~91%' },
    ],
    description: 'The stunning 6.8" AMOLED display features a 120Hz refresh rate for buttery-smooth scrolling and gaming. With peak brightness of 1000+ nits, vibrant DCI-P3 colors, and 240Hz touch sampling, every interaction feels responsive and immersive. The high refresh rate adapts intelligently for battery optimization while delivering visual excellence.',
    icon: '📱',
  },
  camera: {
    title: '50MP AI Camera System',
    subtitle: 'Capture Every Detail',
    specs: [
      { label: 'Main Sensor', value: '50MP f/1.8 wide' },
      { label: 'Secondary', value: '2MP depth sensor' },
      { label: 'Front Camera', value: '16MP f/2.0' },
      { label: 'Video Recording', value: '1080p @ 30fps' },
      { label: 'Features', value: 'Night Mode, AI Scene' },
      { label: 'Image Stabilization', value: 'Digital' },
      { label: 'Flash', value: 'LED Flash' },
      { label: 'Focus', value: 'Phase Detection AF' },
    ],
    description: 'The dual 50MP + 2MP camera system captures stunning photos with exceptional detail in any lighting condition. AI scene detection automatically optimizes settings for landscapes, portraits, food, and more. Night mode produces bright, clear low-light shots. The 16MP front camera with AI beautification ensures perfect selfies. 1080p video recording with digital stabilization brings your moments to life.',
    icon: '📷',
  },
  processor: {
    title: 'UNISOC T9100 Processor',
    subtitle: 'Gaming-Grade Performance',
    specs: [
      { label: 'Chipset', value: 'UNISOC T9100' },
      { label: 'CPU Cores', value: 'Octa-core 2.7GHz' },
      { label: 'GPU', value: 'Mali-G57' },
      { label: 'RAM', value: '12GB LPDDR5' },
      { label: 'Storage', value: '256GB UFS 3.1' },
      { label: 'Process Node', value: '5nm' },
      { label: 'Max Clock', value: '2.7GHz' },
      { label: 'Cache', value: 'Smart Caching' },
    ],
    description: 'The UNISOC T9100 is a powerful octa-core processor built for gaming and high-performance tasks. With a 2.7GHz peak clock, Mali-G57 GPU, and 12GB of LPDDR5 RAM, it handles AAA games and multitasking effortlessly. The 256GB UFS 3.1 storage ensures fast app launches and file transfers. Dedicated hardware acceleration for gaming optimizes frame rates and thermal performance.',
    icon: '⚡',
  },
  triggers: {
    title: 'Shoulder Gaming Triggers',
    subtitle: 'Console-Level Control',
    specs: [
      { label: 'Type', value: 'Capacitive Touch' },
      { label: 'Response Time', value: '< 8ms' },
      { label: 'Positioning', value: 'Left & Right sides' },
      { label: 'Customization', value: 'Per-app mapping' },
      { label: 'Haptic Feedback', value: '4D Vibration' },
      { label: 'Pressure Levels', value: 'Multi-stage' },
      { label: 'Game Space', value: 'Dedicated Mode' },
      { label: 'Sensitivity', value: 'Adjustable' },
    ],
    description: 'The dual shoulder triggers positioned on the left and right edges provide console-grade precision for mobile gaming. With ultra-low < 8ms latency, they respond instantly to your input. 4D haptic vibration feedback adds immersion. Full customization per-app lets you map buttons exactly as needed. Game Space creates a dedicated gaming environment with optimized performance, notification blocking, and trigger profiles for each game.',
    icon: '🎮',
  },
  battery: {
    title: '6000mAh Mega Battery',
    subtitle: 'All-Day Power',
    specs: [
      { label: 'Capacity', value: '6000mAh' },
      { label: 'Charging Speed', value: '80W Fast Charge' },
      { label: 'Charging Time', value: '~30 minutes full' },
      { label: 'Port', value: 'USB Type-C 2.0' },
      { label: 'Battery Type', value: 'Li-Po' },
      { label: 'Standby Time', value: 'Up to 30 days' },
      { label: 'Audio Output', value: 'Dual Stereo Speakers' },
      { label: 'Power Saving', value: 'Adaptive' },
    ],
    description: 'The massive 6000mAh battery ensures all-day usage even with heavy gaming and multitasking. With 80W ultra-fast charging, reach full battery in just 30 minutes. The efficient power management system adapts intelligently based on usage patterns. Dual stereo speakers deliver immersive surround sound for gaming, movies, and music. Extended standby time of up to 30 days means staying connected longer. The adaptive power-saving modes extend battery life without compromising performance.',
    icon: '🔋',
  },
}

export default function FeaturePanel({ activeFeature, onClose }) {
  const feature = FEATURES[activeFeature]

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          className="feature-panel"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="feature-panel-close" onClick={onClose}>
            <span>✕</span>
          </button>

          <motion.div
            className="feature-panel-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {feature.icon}
          </motion.div>

          <motion.h2
            className="feature-panel-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {feature.title}
          </motion.h2>

          <motion.p
            className="feature-panel-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {feature.subtitle}
          </motion.p>

          <motion.p
            className="feature-panel-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {feature.description}
          </motion.p>

          <motion.div
            className="feature-panel-specs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Specifications</h3>
            <div className="specs-grid">
              {feature.specs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  className="spec-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + index * 0.08 }}
                >
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
