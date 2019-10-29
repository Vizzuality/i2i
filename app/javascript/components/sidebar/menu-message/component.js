import React from 'react';
import PropTypes from 'prop-types';

import Book from 'images/data-portal/layersneeded.png';

// styles
import './styles.scss';

const MenuMessage = ({ onSelect }) => (
  <div className="c-message">
    <img src={Book} alt="search" className="message-image" />
    <span className="text">
      First you need to
      <button
        type="button"
        className="button"
        onClick={() => onSelect('layers')}
      >
        Select a Layer
      </button>
      to create your own analysis
    </span>
  </div>
);

MenuMessage.propTypes = { onSelect: PropTypes.func.isRequired }
export default MenuMessage;
