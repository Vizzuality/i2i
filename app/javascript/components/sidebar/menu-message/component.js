import React from 'react';
import PropTypes from 'prop-types';

// components
//import Icon from 'components/icon';

// styles
import './styles.scss';

const MenuMessage = ({ onSelect }) => (
  <div className="c-message">
    {/* <Icon className="icon-info" name="icon-layer" /> */}
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

MenuMessage.propTypes =  {
  onSelect: PropTypes.func.isRequired
}

export default MenuMessage;
