import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class PopupComponent extends React.Component {
  static propTypes = {
    activeLayer: PropTypes.object.isRequired,
    onChangeYear: PropTypes.func.isRequired
  }

  onChange = (e) => {
    const { activeLayer } = this.props;
    this.props.onChangeYear(activeLayer.id, e.currentTarget.value);
  }

  render() {
    const { activeLayer } = this.props;
    const { year, years = [] } = activeLayer;

    return (
      <div className="c-legend-years">
        {years.map((y) => {
          const checked = year === y;

          return (
            <div key={y} className="legend-years--radio">
              <input id={`radio-${activeLayer.type_id}-${y}`} type="radio" name={`years-${activeLayer.type_id}`} value={y} checked={checked} onChange={this.onChange} />
              <label htmlFor={`radio-${activeLayer.type_id}-${y}`}>
                <div className="legend-years--symbol" />
                <div className="legend-years--name">{y}</div>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PopupComponent;
