import React from 'react';
import PropTypes from 'prop-types';


import './styles.scss';

const Legend = ({ data }) => (
  <div className="c-widget-legend">
    <ul className="legend-list">
      {data.map(d => (
        <li
          key={d.dateKey}
        >
          <svg height="12" width="12">
            <rect
              className="legend-color"
              fill={d.color}
            />
          </svg>

          {d.dataKey}
        </li>
      ))}

    </ul>
  </div>
);

Legend.propTypes = { data: PropTypes.shape({}) };

Legend.defaultProps = {
  data: {}
};

export default Legend;
