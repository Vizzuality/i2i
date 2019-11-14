import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class PopupComponent extends React.Component {
  static propTypes = {
    activeLayer: PropTypes.object.isRequired,
    years: PropTypes.array
  }

  static defaultProps = {
    years: [2017, 2015, 2012]
  }

  render() {
    const { activeLayer, years } = this.props;

    return (
      <div className="c-legend-years">
        {years.map(y => (
          <div key={y} className="legend-years--radio">
            <input id={`radio-${activeLayer.type_id}-${y}`} type="radio" name="years" value={y} />
            <label htmlFor={`radio-${activeLayer.type_id}-${y}`}>
              <div className="legend-years--symbol" />
              <div className="legend-years--name">{y}</div>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default PopupComponent;
