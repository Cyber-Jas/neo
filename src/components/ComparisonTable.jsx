import { motion, AnimatePresence } from 'framer-motion'

const COMPETITORS = [
  { name: 'nubia NEO 3 GT', highlight: true },
  { name: 'Redmi Note 13' },
  { name: 'Samsung A35' },
]

const COMPARISON_SPECS = [
  {
    category: 'Display',
    specs: [
      { label: 'Size', values: ['6.8" AMOLED', '6.67" AMOLED', '6.6" AMOLED'] },
      { label: 'Refresh Rate', values: ['120Hz', '120Hz', '120Hz'] },
      { label: 'Brightness', values: ['1000+ nits', '1200 nits', '1000 nits'] },
    ],
  },
  {
    category: 'Performance',
    specs: [
      { label: 'Chipset', values: ['UNISOC T9100', 'Snapdragon 685', 'Exynos 1380'] },
      { label: 'RAM', values: ['12GB LPDDR5', '8GB LPDDR4X', '8GB LPDDR4X'] },
      { label: 'Storage', values: ['256GB UFS 3.1', '256GB UFS 2.2', '256GB UFS 2.2'] },
    ],
  },
  {
    category: 'Camera',
    specs: [
      { label: 'Main', values: ['50MP f/1.8', '108MP f/1.8', '50MP f/1.8'] },
      { label: 'Front', values: ['16MP', '16MP', '13MP'] },
    ],
  },
  {
    category: 'Battery',
    specs: [
      { label: 'Capacity', values: ['6000mAh', '5000mAh', '5000mAh'] },
      { label: 'Charging', values: ['80W Fast', '33W Fast', '25W Fast'] },
    ],
  },
  {
    category: 'Gaming',
    specs: [
      { label: 'Shoulder Triggers', values: ['Yes ✓', 'No ✗', 'No ✗'] },
      { label: 'Game Space', values: ['Dedicated', 'Basic', 'Basic'] },
      { label: 'Haptic Feedback', values: ['4D Vibration', 'Standard', 'Standard'] },
    ],
  },
  {
    category: 'Price',
    specs: [
      { label: 'Starting', values: ['$199', '$199', '$299'] },
    ],
  },
]

export default function ComparisonTable({ visible, onClose }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="comparison-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="comparison-modal"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="comparison-close" onClick={onClose}>✕</button>

            <h2 className="comparison-title">How NEO 3 GT Compares</h2>
            <p className="comparison-subtitle">See how the NEO 3 GT stacks up against the competition</p>

            {/* Phone headers */}
            <div className="comparison-header-row">
              <div className="comparison-label-cell" />
              {COMPETITORS.map((phone) => (
                <div
                  key={phone.name}
                  className={`comparison-phone-cell ${phone.highlight ? 'highlighted' : ''}`}
                >
                  <span className="comparison-phone-name">{phone.name}</span>
                  {phone.highlight && <span className="comparison-badge">OUR PICK</span>}
                </div>
              ))}
            </div>

            {/* Spec categories */}
            <div className="comparison-body">
              {COMPARISON_SPECS.map((category) => (
                <div key={category.category} className="comparison-category">
                  <div className="comparison-category-header">{category.category}</div>
                  {category.specs.map((spec) => (
                    <div key={spec.label} className="comparison-row">
                      <div className="comparison-label-cell">{spec.label}</div>
                      {spec.values.map((val, i) => (
                        <div
                          key={i}
                          className={`comparison-value-cell ${i === 0 ? 'highlighted' : ''}`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
