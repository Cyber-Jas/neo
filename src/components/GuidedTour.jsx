import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOUR_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to the NEO 3 GT Experience',
    description: 'Take an interactive tour of the ultimate gaming phone. Explore each feature in stunning 3D.',
    icon: '🎮',
    action: null,
  },
  {
    id: 'rotate',
    title: 'Rotate the Phone',
    description: 'Click and drag anywhere on the screen to rotate the 3D model. Use your scroll wheel to zoom in and out.',
    icon: '🔄',
    action: null,
  },
  {
    id: 'display',
    title: 'Explore the Display',
    description: 'Click on the glowing hotspots to learn about each feature. Let\'s start with the 120Hz AMOLED display!',
    icon: '📱',
    action: 'display',
  },
  {
    id: 'nav',
    title: 'Use the Feature Navigation',
    description: 'Use the bottom navigation bar to quickly jump between features. Try clicking any icon!',
    icon: '🧭',
    action: null,
  },
  {
    id: 'done',
    title: 'You\'re All Set!',
    description: 'Explore all the features at your own pace. Click hotspots or use the navigation below.',
    icon: '✨',
    action: null,
  },
]

export default function GuidedTour({ onFeatureClick, visible }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showTour, setShowTour] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (visible && !dismissed) {
      const hasSeenTour = localStorage.getItem('neo3gt-tour-seen')
      if (!hasSeenTour) {
        const timer = setTimeout(() => setShowTour(true), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [visible, dismissed])

  const handleNext = useCallback(() => {
    const step = TOUR_STEPS[currentStep]
    if (step.action && onFeatureClick) {
      onFeatureClick(step.action)
    }
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleDismiss()
    }
  }, [currentStep, onFeatureClick])

  const handleDismiss = useCallback(() => {
    setShowTour(false)
    setDismissed(true)
    localStorage.setItem('neo3gt-tour-seen', 'true')
    if (onFeatureClick) onFeatureClick('default')
  }, [onFeatureClick])

  const handleSkip = useCallback(() => {
    handleDismiss()
  }, [handleDismiss])

  if (!showTour) return null

  const step = TOUR_STEPS[currentStep]
  const isLast = currentStep === TOUR_STEPS.length - 1

  return (
    <AnimatePresence>
      <motion.div
        className="guided-tour-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="guided-tour-card"
          key={step.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tour-progress">
            {TOUR_STEPS.map((_, i) => (
              <div
                key={i}
                className={`tour-progress-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>

          <div className="tour-icon">{step.icon}</div>
          <h3 className="tour-title">{step.title}</h3>
          <p className="tour-desc">{step.description}</p>

          <div className="tour-actions">
            <button className="tour-skip" onClick={handleSkip}>
              Skip Tour
            </button>
            <button className="tour-next" onClick={handleNext}>
              {isLast ? 'Get Started' : 'Next'}
              {!isLast && <span className="tour-arrow">→</span>}
            </button>
          </div>

          <div className="tour-step-count">
            {currentStep + 1} / {TOUR_STEPS.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
