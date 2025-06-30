// src/LoadingOverlay.js
import React from 'react'
import '../css/overlay.css'

function LoadingOverlay({ isLoading }) {
  if (!isLoading) {
    return null // Don't render if not loading
  }

  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div> {/* You can customize the spinner here */}
    </div>
  )
}

export default LoadingOverlay
