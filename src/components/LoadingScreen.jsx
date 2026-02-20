import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 600)
          }, 400)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="loading-content">
            <motion.div
              className="loading-logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="loading-nubia">nubia</span>
              <span className="loading-model">NEO 3 GT</span>
            </motion.div>

            <motion.div
              className="loading-bar-container"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '280px' }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="loading-bar">
                <motion.div
                  className="loading-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="loading-percent">{progress}%</span>
            </motion.div>

            <motion.p
              className="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
            >
              Loading 3D Experience...
            </motion.p>
          </div>

          <div className="loading-bg-lines">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="loading-bg-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1, duration: 1.5, ease: 'easeOut' }}
                style={{ top: `${20 + i * 15}%` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
