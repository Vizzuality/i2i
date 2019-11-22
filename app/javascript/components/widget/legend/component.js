import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';

const Legend = ({ data }) => {
  const [menu, setMenu] = useState(false);
  const { length } = data;


  return (
    <div className="c-widget-legend">
      {!menu &&
        <p className="widget-ranking">{length >= 5 ? `TOP ${length}` : 'TOP 5'}</p>
      }
      <ul className={classnames('legend-list', { isOpen: menu })}>
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
      {length > 5 &&
        <button onClick={() => setMenu(!menu)} className="legend-btn">View more</button>
      }
    </div>
  );
};

Legend.propTypes = { data: PropTypes.shape({}) };

Legend.defaultProps = { data: {} };

export default Legend;
