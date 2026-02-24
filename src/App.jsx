import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene3D from './components/Scene3D'
import FeaturePanel from './components/FeaturePanel'
import Header from './components/Header'
import HeroOverlay from './components/HeroOverlay'
import LoadingScreen from './components/LoadingScreen'
import GuidedTour from './components/GuidedTour'
import FeatureHighlights from './components/FeatureHighlights'
import ComparisonTable from './components/ComparisonTable'
import './App.css'

export default function App() {
  const [activeFeature, setActiveFeature] = useState('default')
  const [isLoaded, setIsLoaded] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [showSpecsModal, setShowSpecsModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const handleFeatureClick = useCallback((feature) => {
    if (activeFeature === feature) {
      setActiveFeature('default')
      setAutoRotate(true)
    } else {
      setActiveFeature(feature)
      setAutoRotate(false)
    }
  }, [activeFeature])

  const handleClosePanel = useCallback(() => {
    setActiveFeature('default')
    setAutoRotate(true)
  }, [])

  const handleLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="app">
      {!isLoaded && <LoadingScreen onComplete={handleLoaded} />}

      <div className={`app-content ${isLoaded ? 'loaded' : ''}`}>
        <Header showHeader={isLoaded} />

        <div className="canvas-container">
          <div className="canvas-bg" />
          <Scene3D
            activeFeature={activeFeature}
            onHotspotClick={handleFeatureClick}
            autoRotate={autoRotate}
          />
        </div>

        <HeroOverlay
          visible={isLoaded && activeFeature === 'default'}
          onExplore={() => handleFeatureClick('display')}
        />

        <FeatureHighlights
          visible={isLoaded}
          activeFeature={activeFeature}
          onFeatureClick={handleFeatureClick}
        />

        <GuidedTour
          onFeatureClick={handleFeatureClick}
          visible={isLoaded && activeFeature === 'default'}
        />

        <FeaturePanel
          activeFeature={activeFeature === 'default' ? null : activeFeature}
          onClose={handleClosePanel}
        />


        {isLoaded && (
          <div className="footer-bar">
            <span className="footer-text">nubia Neo 3 GT &mdash; Game Beyond Limits</span>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setShowSpecsModal(true); }}>Specs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowComparison(true); }}>Compare</a>
              <a href="#">Support</a>
            </div>
          </div>
        )}

        {/* Specs Modal */}
        <AnimatePresence>
          {showSpecsModal && (
            <motion.div
              className="specs-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecsModal(false)}
            >
              <motion.div
                className="specs-modal"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="specs-modal-close"
                  onClick={() => setShowSpecsModal(false)}
                >
                  ✕
                </button>
                <h2 className="specs-modal-title">Nubia NEO 3 GT Specifications</h2>
                <p className="specs-modal-intro">Discover the complete technical specifications of the ultimate gaming phone</p>
                
                <div className="specs-modal-all-grid">
                  <div className="specs-card">
                    <div className="specs-card-icon">📱</div>
                    <h3>Display</h3>
                    <ul>
                      <li><strong>Screen:</strong> 6.8" AMOLED</li>
                      <li><strong>Resolution:</strong> 1080 x 2392 FHD+</li>
                      <li><strong>Refresh Rate:</strong> 120Hz</li>
                      <li><strong>Touch Sampling:</strong> 240Hz</li>
                      <li><strong>Brightness:</strong> 1000+ nits</li>
                      <li><strong>Color Gamut:</strong> DCI-P3 100%</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">📷</div>
                    <h3>Camera</h3>
                    <ul>
                      <li><strong>Main:</strong> 50MP f/1.8 wide</li>
                      <li><strong>Depth:</strong> 2MP sensor</li>
                      <li><strong>Front:</strong> 16MP f/2.0</li>
                      <li><strong>Video:</strong> 1080p @ 30fps</li>
                      <li><strong>Features:</strong> Night Mode, AI Scene</li>
                      <li><strong>Focus:</strong> Phase Detection AF</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">⚡</div>
                    <h3>Performance</h3>
                    <ul>
                      <li><strong>Chipset:</strong> UNISOC T9100</li>
                      <li><strong>CPU:</strong> Octa-core 2.7GHz</li>
                      <li><strong>GPU:</strong> Mali-G57</li>
                      <li><strong>RAM:</strong> 12GB LPDDR5</li>
                      <li><strong>Storage:</strong> 256GB UFS 3.1</li>
                      <li><strong>Process:</strong> 5nm</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">🎮</div>
                    <h3>Gaming</h3>
                    <ul>
                      <li><strong>Triggers:</strong> Capacitive Touch</li>
                      <li><strong>Latency:</strong> &lt; 8ms response</li>
                      <li><strong>Customization:</strong> Per-app mapping</li>
                      <li><strong>Haptic:</strong> 4D Vibration</li>
                      <li><strong>Game Space:</strong> Dedicated mode</li>
                      <li><strong>Cooling:</strong> Vapor chamber</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">🔋</div>
                    <h3>Battery & Charging</h3>
                    <ul>
                      <li><strong>Capacity:</strong> 6000mAh</li>
                      <li><strong>Charging:</strong> 80W Fast Charge</li>
                      <li><strong>Time:</strong> ~30 min to full</li>
                      <li><strong>Port:</strong> USB Type-C 2.0</li>
                      <li><strong>Speakers:</strong> Dual Stereo</li>
                      <li><strong>Standby:</strong> Up to 30 days</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">📡</div>
                    <h3>Connectivity</h3>
                    <ul>
                      <li><strong>Network:</strong> 5G + 4G LTE</li>
                      <li><strong>WiFi:</strong> 802.11 a/b/g/n/ac</li>
                      <li><strong>Bluetooth:</strong> 5.1, A2DP, LE</li>
                      <li><strong>GPS:</strong> Multi-system</li>
                      <li><strong>NFC:</strong> Supported</li>
                      <li><strong>USB:</strong> Type-C 2.0, OTG</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">🔐</div>
                    <h3>Security & OS</h3>
                    <ul>
                      <li><strong>OS:</strong> Android 15</li>
                      <li><strong>UI:</strong> Nubia UI 15</li>
                      <li><strong>Fingerprint:</strong> Side-mounted</li>
                      <li><strong>Face Unlock:</strong> AI-powered</li>
                      <li><strong>Storage:</strong> Non-expandable</li>
                      <li><strong>Updates:</strong> 3 years OS</li>
                    </ul>
                  </div>

                  <div className="specs-card">
                    <div className="specs-card-icon">📏</div>
                    <h3>Design & Build</h3>
                    <ul>
                      <li><strong>Dimensions:</strong> 163.5 x 75 x 9.2mm</li>
                      <li><strong>Weight:</strong> ~198g</li>
                      <li><strong>Build:</strong> Glass + Metal frame</li>
                      <li><strong>Drop:</strong> Gorilla Glass</li>
                      <li><strong>Rating:</strong> IP64 dust/water</li>
                      <li><strong>Colors:</strong> White, Black, Green</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Table */}
        <ComparisonTable
          visible={showComparison}
          onClose={() => setShowComparison(false)}
        />
      </div>
    </div>
  )
}
