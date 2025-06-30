// src/ComponentDetailDisplay.js
import React from 'react'
import '../css/ComponentDetailDisplay.css' // Create this CSS file

function ComponentDetailDisplay({ item }) {
  if (!item) {
    return null // Don't render if no item is selected
  }

  return (
    <div className="detail-display">
      <h2>{item.name} Details</h2>
      {item.operations && <p>Operations: {item.operations.join(', ')}</p>}
      {item.activities && Object.keys(item.activities).length > 0 && (
        <p>
          Activities:{' '}
          {Object.entries(item.activities)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')}
        </p>
      )}
      <p>Path: {item.path}</p>
    </div>
  )
}

export default ComponentDetailDisplay
