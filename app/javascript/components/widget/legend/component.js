import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Legend = ({ data }) => (
  <div className="c-widget-legend">
    <ul className="legend-list">
      {data.map(d => (
        <li
          key={d.dataKey || d.value}
        >
          <span style={{
            color: d.color,
            backgroundColor: d.color
          }}
          />
          {d.dataKey || d.value}
        </li>
      ))}
    </ul>
  </div>
);

Legend.propTypes = { data: PropTypes.shape({}) };

Legend.defaultProps = { data: {} };

export default Legend;
