import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// styles
// import './styles.scss';

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
        <button
          onClick={() => this.toggleDrawing(drawing)}
        >
          { drawing ? 'Cancel' : 'Create Area' }
        </button>

        {!isEmpty(area) &&
          <button
            onClick={() => this.onClear()}
          >
            Clear
          </button>
        }
      </div>
    );
  }
}

export default AreaOfInterestComponent;
