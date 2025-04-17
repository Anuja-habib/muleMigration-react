// Filename - pages/Events.js

import React from 'react'
import TibcoConverter from './TibcoParser'
export const IntegrationTools = () => {
  return (
    <div className="events">
      <h1>Mulesoft Migration Accelerator Integration Tools</h1>
    </div>
  )
}

export const TibcoIntegrationTools = () => {
  return (
    <div className="events">
      <TibcoConverter />
    </div>
  )
}

export const EventsTwo = () => {
  return (
    <div className="events">
      <h1>Mulesoft Migration Accelerator Event2</h1>
    </div>
  )
}
