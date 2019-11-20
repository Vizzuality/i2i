import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';


const Tooltip = ({ payload, hideZeros, style }) => (
  <div>
    {payload && payload.length && (
      <div className="c-widget-tooltip" style={style}>
        {payload.map(
          d => (hideZeros ? null : (
            <div
              key={d.key}
              className="tooltip-title"
            >
              {/* LABEL */}
              {(d.label || d.value) && (
                <div className="tooltip-label">
                  {d.color && (
                    <div
                      className="tooltip-color"
                      style={{ backgroundColor: d.color }}
                    />
                  )}

                  {d.key === 'break'
                    ? <span className="">{`${d.label}: ${d.label}`}</span>
                    : <span>{`${d.name}: ${d.value}`}</span>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    )}
  </div>
);

Tooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  hideZeros: PropTypes.bool
};

Tooltip.defaultProps = {
  payload: [],
  style: {},
  hideZeros: false
};

export default Tooltip;

// color: "#33a02c"
// dataKey: "Microfinance deposit taking institution"
// fill: "#33a02c"
// formatter: undefined
// name: "Microfinance deposit taking institution"
// payload: {Microfinance deposit taking institution: 8, name: "Number of services", Offsite ATMs: 2}
// stroke: "#33a02c"
// type: undefined
// unit: undefined
// value: 8
