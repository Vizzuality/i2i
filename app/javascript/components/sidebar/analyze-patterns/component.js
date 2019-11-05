import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

const AnalyzePatterns = ({
  setLayersSettings,
  layersSettings,
  setClearing,
  fetchIntro,
  selectedLayers,
  analysisActive,
  setAnalysisActive
}) => {
  useEffect(() => {
    const heatmapsLayers = Object.keys(layersSettings).reduce((acc, _layerId) => ({
      ...acc,
      [_layerId]: {
        // eslint-disable-next-line no-underscore-dangle
        ...layersSettings[_layerId],
        visualizationType: 'heatmap',
        visibility: true,
        opacity: 1
      }
    }), {});

    setLayersSettings(heatmapsLayers);
  });


  const onClear = () => {
    setClearing(true);
    fetchIntro();
  };

  return (
    <div className="c-analyze-patterns">
      <div className="content-wrapper">
        <p>Find a hotspot and analyze it.</p>
      </div>


      <div className="buttons-container -analysis-report">
        <button
          className="c-button -small -white"
          onClick={() => {
            onClear();
          }}
        >
          Cancel
        </button>
        <button
          className={classnames('c-button -small -sea', { '-disabled': !selectedLayers.length })}
          onClick={() => {
            setAnalysisActive(!analysisActive);
          }}
        >
          Summary Report
        </button>
      </div>

    </div>
  );
};


AnalyzePatterns.propTypes = {
  setLayersSettings: PropTypes.func.isRequired,
  layersSettings: PropTypes.shape({}).isRequired,
  setClearing: PropTypes.func.isRequired,
  fetchIntro: PropTypes.func.isRequired,
  selectedLayers: PropTypes.array.isRequired,
  analysisActive: PropTypes.bool.isRequired,
  setAnalysisActive: PropTypes.func.isRequired
};

export default AnalyzePatterns;

