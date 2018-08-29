import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// styles
import './styles.scss';

class AreaOfInterestComponent extends PureComponent {
  static propTypes = {
    area: PropTypes.object.isRequired,
    drawing: PropTypes.bool.isRequired,
    setClearing: PropTypes.func.isRequired,
    setAreaOfInterest: PropTypes.func.isRequired
  }

  onClear = () => {
    this.props.setClearing(true);
  }

  toggleDrawing = (value) => {
    this.props.setAreaOfInterest({ ...this.props, drawing: !value });
  }

  render() {
    const { drawing, area } = this.props;

    return (
      <div className="c-area-of-interest">
        <p>Create an area of interest and know more information about it, <span>click on the “create area” button below</span> to know more information.</p>

        <div className="button-container">
          <button
            className="c-button -small -white"
            onClick={() => {
              if (isEmpty(area)) this.toggleDrawing(drawing);
              if (!isEmpty(area)) this.onClear();
            }}
          >
            {drawing && 'Cancel'}
            {!drawing && isEmpty(area) && 'Create Area'}
            {!drawing && !isEmpty(area) && 'Clear'}
          </button>
        </div>
      </div>
    );
  }
}

export default AreaOfInterestComponent;
