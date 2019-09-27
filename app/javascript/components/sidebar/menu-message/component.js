import React from 'react';

// styles
import './styles.scss';

const MenuMessage = ({ onSelect }) => (
  <div className="c-message">
    <img src="" alt="search-layer" />
    <span className="text">
      First you need to
      <button 
        type='button'
        className='button'
        onClick={() => onSelect('layers')}>
        Select a Layer 
        </button> 
      to create your own analysis
    </span>
  </div>
);

export default MenuMessage;
