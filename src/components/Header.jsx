import { motion, AnimatePresence } from 'framer-motion'

export default function Header({ showHeader }) {
  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          className="header"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="banner"
        >
          <div className="header-left">
            <div className="logo">
              <span className="logo-nubia">nubia</span>
            </div>
          </div>
          <div className="header-center">
            <h1 className="header-title">NEO 3 GT</h1>
            <span className="header-badge">GAMING EDITION</span>
          </div>
          <div className="header-right">
            <motion.a
              href="#"
              className="header-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Buy nubia NEO 3 GT"
            >
              Buy Now
            </motion.a>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
