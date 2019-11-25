import React from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';


import './styles.scss';

function Item({ setDistance, distance, fetchIntro }) {
  const onChange = ({ value, label }) => {
    setDistance({ label, value });
    fetchIntro();
  };

  const distanceOptions = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '15 km', value: 15 },
    { label: '20 km', value: 20 },
    { label: '30 km', value: 30 },
    { label: '50 km', value: 50 },
    { label: '100 km', value: 100 }
  ];

  const distanceSelect = (
    <ReactSelect
      className="react-select-container"
      classNamePrefix="react-select"
      options={distanceOptions}
      onChange={onChange}
      value={distance}
    />
  );

  return (
    <div>
      TOTAL POPULATION WITHIN {distanceSelect} OF ALL ACCESS POINTS
    </div>
  );
}

Item.propTypes = {
  setDistance: PropTypes.func.isRequired,
  fetchIntro: PropTypes.func.isRequired,
  distance: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  }).isRequired
};


export default Item;
