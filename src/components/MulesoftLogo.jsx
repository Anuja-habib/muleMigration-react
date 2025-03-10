// components/MulesoftLogo.jsx
import React from 'react';

const MulesoftLogo = ({ size = 28, color = "#009de2" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill={color}
    viewBox="0 0 24 24" 
    width={size} 
    height={size}
    aria-hidden="true"
  >
    <path d="M19.502 12.003a7.502 7.502 0 0 1-4.338 6.802l-.662-2.468a5.002 5.002 0 0 0 1.926-6.668l-3.386 4.834h-2.084L7.572 9.67a5.002 5.002 0 0 0 1.925 6.668l-.66 2.468A7.502 7.502 0 0 1 7.87 5.74L12 11.635l4.129-5.895a7.494 7.494 0 0 1 3.373 6.263Zm2.5 0c0 5.524-4.478 10.002-10.002 10.002-5.524 0-10.003-4.478-10.003-10.002C1.997 6.478 6.476 2 12 2s10.003 4.478 10.003 10.003Zm-.833 0a9.17 9.17 0 1 0-18.338 0 9.17 9.17 0 0 0 18.338 0Z"></path>
  </svg>
);

export default MulesoftLogo;