import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';
import isEmpty from 'lodash/isEmpty';

// styles
import './styles.scss';

const AnalyzePatterns = ({
  area,
  setLayersSettings,
  layersSettings,
  setClearing,
  fetchIntro,
  selectedLayers,
  analysisActive,
  setAnalysisActive,
  setLocationSelected,
  fetchLocationArea,
  options,
  selectedOption
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

  const handleChange = (selectedLocation) => {
    setLocationSelected(selectedLocation);
    fetchLocationArea();
  };

  return (
    <div className="c-analyze-patterns">
      <div className="content-wrapper">
        <p>Find a hotspot and analyze it.</p>

        <div className="patterns-content">
          <h2>SEARCH LOCATION:</h2>
          <Select
            value={isEmpty(selectedOption) ? null : selectedOption}
            classNamePrefix="react-select"
            onChange={handleChange}
            options={options}
            placeholder="Introduce location"
          />
        </div>
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
          className={classnames('c-button -small -sea', { '-disabled': !selectedLayers.length || !!isEmpty(area) })}
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
  area: PropTypes.object.isRequired,
  setLayersSettings: PropTypes.func.isRequired,
  layersSettings: PropTypes.shape({}).isRequired,
  setClearing: PropTypes.func.isRequired,
  fetchIntro: PropTypes.func.isRequired,
  selectedLayers: PropTypes.array.isRequired,
  analysisActive: PropTypes.bool.isRequired,
  setAnalysisActive: PropTypes.func.isRequired,
  setLocationSelected: PropTypes.func.isRequired,
  fetchLocationArea: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.object.isRequired
};

export default AnalyzePatterns;
