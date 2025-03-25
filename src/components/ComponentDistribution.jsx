// src/ComponentDistribution.js
import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import '../css/ComponentDistribution.css';

function ComponentDistribution({ componentCounts }) {
  const data = Object.entries(componentCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3182CE', '#48BB78', '#DD6B20', '#ECC94B']; // Example colors

  return (
    <div className="component-distribution">
      <h2>Component Distribution</h2>
      <PieChart width={350} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
      <div className="legend">
        {data.map((entry, index) => (
          <div key={entry.name} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentDistribution;