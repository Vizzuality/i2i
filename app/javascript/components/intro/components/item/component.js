import React, { useState, Fragment } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';


import styles from './styles.scss';

function Item({ options, selectedOption, item }) {
  const [optionState, setOption] = useState({
    label: '',
    value: ''
  });

  const onChange = (option) => {
    setOption({ value: option, label: option });
  };

  const distanceOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 }
  ];
  const accessPointsOptions = [
    { label: 'all accesspoints', value: 1 },
    { label: 'one', value: 2 },
    { label: 'two', value: 3 },
    { label: 'three', value: 4 }
  ];

  const selectedDistance = { label: 5, value: 5 };
  const selectedPoints = { label: 'all accesspoints', value: 1 };

  const distance = (
    <ReactSelect
      className="react-select-container"
      classNamePrefix="react-select"
      options={distanceOptions}
      onChange={onChange}
      value={selectedDistance}
    />
  );

  return (
    <Fragment>
      TOTAL POPULATION WITHIN {distance} KM OF ALL ACCESS POINTS
    </Fragment>
  );
}

Item.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

//

export default Item;
