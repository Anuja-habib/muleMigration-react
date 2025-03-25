// src/ComponentDetails.js
import React, { useState } from 'react';
import ComponentDetailDisplay from './ComponentDetailDisplay'; // Import the new component
import '../css/ComponentDetails.css';
import ListComponent from './ListComponent';    

function ComponentDetails({ components }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTypeClick = (type) => {
    setSelectedType((prevType) => (prevType === type ? null : type));

  const itemsOfType = components[type] 
  setSelectedItem(itemsOfType);
};

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="component-details">
      <h2>Component Details</h2>
      {Object.entries(components).map(([type, items]) => (
        <div key={type} className="component-type-section">
          <h3>
            <a href="#" onClick={() => handleTypeClick(type)}>
              {type} ({items.length})
            </a>
          </h3>
          
        </div>
      ))}
     
      <ListComponent items={selectedItem} />
    </div>
  );
}

export default ComponentDetails;