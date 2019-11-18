import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Legend = ({ data }) => (
  <div className="c-widget-legend">
    <ul className="legend-list">
      {data.map(d => (
        <li
          key={d.dataKey || d.label || d.value}
        >
          <span style={{
            color: d.color,
            backgroundColor: d.color
          }}
          />
          {d.label || d.dataKey || d.value}
        </li>
      ))}
    </ul>
  </div>
);

Legend.propTypes = { data: PropTypes.shape({}) };

Legend.defaultProps = { data: {} };

export default Legend;
