// src/Dashboard.js
import React from 'react'
import ComponentDistribution from './ComponentDistribution'
import ComponentDetails from './ComponentDetails'
import '../css/dashboard.css' // Create this CSS file

function Dashboard({ data }) {
  if (!data || !data.result) {
    return <div>Loading...</div>
  }

  const componentCounts = data.result.componentCounts
  const components = data.result.components

  return (
    <div className="dashboard">
      <div className="header">
        <h1>TIBCO to MuleSoft Migration Suite</h1>
        <div className="tabs">
          <button className="tab">Overview</button>
          <button className="tab">Component Inventory</button>
          <button className="tab">Migration Planning</button>
          <button className="tab">Progress Tracking</button>
          <button className="tab">Quality & Testing</button>
        </div>
      </div>
      <div className="content">
        <div className="search-bar">
          <input type="text" placeholder="Search components..." />
          <select>
            <option>All Components</option>
          </select>
        </div>
        <div className="main-content">
          <ComponentDistribution componentCounts={componentCounts} />
          <ComponentDetails components={components} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
