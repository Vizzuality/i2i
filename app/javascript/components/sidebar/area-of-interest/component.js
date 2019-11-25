import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Icon from 'components/icon';

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
        <div className="content-wrapper">
          {/* eslint-disable-next-line max-len */
            <p>Create an area of interest by clicking the "Create area" button below then drawing a shape on the map. Information about the created area such as population & financial services availability and access will be generated.</p>
          }
        </div>

        <div className={classnames('button-container', { '-hidden': drawing || !isEmpty(area) })}>
          <button
            className="c-button -small -white"
            onClick={() => {
              if (isEmpty(area)) this.toggleDrawing(drawing);
              if (!isEmpty(area)) this.onClear();
            }}
          >
            <Icon name="poligono" className="-sea -selected" />
            Create Area
          </button>
        </div>

        {(drawing || !isEmpty(area)) && (
          <div className="buttons-container -analysis-report">
            <button
              className={classnames('c-button -small -sea', { '-disabled': isEmpty(area) || !selectedLayers.length })}
              onClick={() => {
                this.props.setAnalysisActive(!analysisActive);
              }}
            >
              Area Report
            </button>

            <button
              className="c-button -small -white"
              onClick={() => {
                if (isEmpty(area)) this.toggleDrawing(drawing);
                if (!isEmpty(area)) this.onClear();
              }}
            >
              {isEmpty(area) ? 'Cancel' : 'Clear  '}
            </button>
          </div>
        )}

      </div>
    );
  }
}

export default AreaOfInterestComponent;
