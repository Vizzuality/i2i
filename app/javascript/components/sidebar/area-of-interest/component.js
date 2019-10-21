import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

// styles
import './styles.scss';

class AreaOfInterestComponent extends PureComponent {
  static propTypes = {
    area: PropTypes.object.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    drawing: PropTypes.bool.isRequired,
    analysisActive: PropTypes.bool.isRequired,
    fetchIntro: PropTypes.func.isRequired,
    setClearing: PropTypes.func.isRequired,
    setAreaOfInterest: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired
  }

  onClear = () => {
    this.props.setClearing(true);
    this.props.fetchIntro();
  }

  toggleDrawing = (value) => {
    this.props.setAreaOfInterest({ ...this.props, drawing: !value });
  }

  render() {
    const { drawing, area, analysisActive, selectedLayers } = this.props;

    return (
      <div className="c-area-of-interest">
        <div className="text-container">
          {/* eslint-disable-next-line max-len */
            <p>Create an area of interest by clicking the &quotCreate area&quot button below then drawing a shape on the map. Information about the created area such as population & financial services availability and access will be generated.</p>
          }
        </div>

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

        {(!!selectedLayers.length && !isEmpty(area)) &&
          <div className="button-container -analysis-report">
            <button
              className="c-button -small -sea"
              onClick={() => this.props.setAnalysisActive(!analysisActive)}
            >
              Analysis Report
            </button>
          </div>
        }
      </div>
    );
  }
}

export default AreaOfInterestComponent;
