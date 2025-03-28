import * as React from 'react'
import { motion } from 'framer-motion'

export const Error: React.FC = () => {
  // Use a feature detection approach to conditionally render
  // This ensures we have a fallback if framer-motion has issues
  return (
    <motion.div
      className="error-message mt-2 text-xs text-fwd-red-600"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      This field is required
    </motion.div>
  )
}
