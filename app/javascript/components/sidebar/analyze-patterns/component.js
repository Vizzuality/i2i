import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Range } from 'wri-api-components/dist/form';
import isEmpty from 'lodash/isEmpty';

// styles
import './styles.scss';

const AnalyzePatterns = ({
  area,
  setLayersSettings,
  layersSettings,
  selectedLayers,
  analysisActive,
  setAnalysisActive,
  time,
  setPattern,
  fetchPatternArea,
  togglePatternPinDrop,
  pattern,
  pin
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

    const normalLayersView = Object.keys(layersSettings).reduce((acc, _layerId) => ({
      ...acc,
      [_layerId]: {
        // eslint-disable-next-line no-underscore-dangle
        ...layersSettings[_layerId],
        visualizationType: 'normal',
        visibility: true,
        opacity: 1
      }
    }), {});

    setLayersSettings(heatmapsLayers);
    return () => {
      setLayersSettings(normalLayersView);
    }
  }, [pattern, time]);

  const onChange = (value) => {
    setPattern({ ...pattern, time: value });
  };

  const onAfterChange = (value) => {
    setPattern({ ...pattern, time: value });
    fetchPatternArea();
  };

  const onDrop = () => {
    togglePatternPinDrop({ dropped: pin.dropped, active: !pin.active });
  };

  return (
    <div className="c-analyze-patterns">
      <div className="content-wrapper">
        <p>Find a hotspot and analyze it.</p>

        <div className="c-field">
          <label htmlFor="analyze-time">
            TIME: <span>{time} minutes</span>
          </label>

          <Range
            // Styles
            railStyle={{ background: 'repeating-linear-gradient(90deg, $color-1, $color-1 2px, #FFF 2px, #FFF 4px)', height: 1 }}
            trackStyle={{ backgroundColor: '$color-1', height: 1 }}
            handleStyle={{ backgroundColor: '$color-1', width: '14px', height: '14px', border: 0, marginTop: -7, marginLeft: -7 }}
            activeDotStyle={{ display: 'none' }}
            dotStyle={{ display: 'none' }}

            marks={{
              1: {
                label: '1',
                style: { fontSize: 10 }
              },
              720: {
                label: '720',
                style: { fontSize: 10 }
              }
            }}
            id="nearby-time"
            min={1}
            max={720}
            value={time}
            onChange={onChange}
            onAfterChange={onAfterChange}
          />
        </div>
      </div>

      <div className="buttons-container">
        <button
          className="c-button -small -white"
          onClick={onDrop}
        >
          {(!pin.active) ? 'Click on map' : 'Clear area'}
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
  selectedLayers: PropTypes.array.isRequired,
  analysisActive: PropTypes.bool.isRequired,
  setAnalysisActive: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
  setPattern: PropTypes.func.isRequired,
  fetchPatternArea: PropTypes.func.isRequired,
  togglePatternPinDrop: PropTypes.func.isRequired,
  pattern: PropTypes.shape({}).isRequired,
  pin: PropTypes.shape({}).isRequired
};

export default AnalyzePatterns;
