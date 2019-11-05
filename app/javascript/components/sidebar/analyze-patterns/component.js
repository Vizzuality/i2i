import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class AnalyzePatterns extends PureComponent {
  static propTypes = {
    selectedLayers: PropTypes.array.isRequired,
    analysisActive: PropTypes.bool.isRequired,
    fetchIntro: PropTypes.func.isRequired,
    setClearing: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { setLayersSettings, layersSettings } = this.props;
    const heatmapsLayers = Object.keys(layersSettings).reduce((acc, _layerId) => ({
      ...acc,
      [_layerId]: {
        ...layersSettings[_layerId],
        visualizationType: 'heatmap',
        visibility: true,
        opacity: 1
      }
    }), {});

    setLayersSettings(heatmapsLayers);
  }

  onClear = () => {
    this.props.setClearing(true);
    this.props.fetchIntro();
  }


  render() {
    const { analysisActive, selectedLayers } = this.props;

    return (
      <div className="c-analyze-patterns">
        <div className="content-wrapper">
          <p>Find a hotspot and analyze it.</p>
        </div>


        <div className="buttons-container -analysis-report">
          <button
            className={classnames('c-button -small -sea', { '-disabled': !selectedLayers.length })}
            onClick={() => {
              this.props.setAnalysisActive(!analysisActive);
            }}
          >
            Summary Report
          </button>
        </div>

      </div>
    );
  }
}

export default AnalyzePatterns;
