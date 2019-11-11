import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

// Components
import { Range } from 'wri-api-components/dist/form';
import Geosuggest from 'react-geosuggest';

//Styles
import './styles.scss';
import { setNearbyCenter } from '../../datasets/actions';

class NearbyComponent extends PureComponent {
  static propTypes = {
    nearby: PropTypes.object,
    shortIso: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    setNearby: PropTypes.func.isRequired,
    setNearbyError: PropTypes.func.isRequired,
    fetchNearbyArea: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired,
    togglePinDrop: PropTypes.func.isRequired,
    toggleLocation: PropTypes.func.isRequired
  }

  static defaultProps = { nearby: {} }

  state = { showSearchInput: false };

  componentWillUnmount() {
    this.props.setNearbyError(null);
  }

  // UI EVENTS
  onToggleSearchInput = (to) => {
    this.setState({ showSearchInput: to }, () => {
      if (this.state.showSearchInput) {
        this.geosuggest.focus();
      }
    });
  }

  onSuggestSelect = (e) => {
    if (e === undefined) {
      this.props.setNearby({ ...this.props.nearby, location: {} });
    } else {
      this.props.setNearby({ ...this.props.nearby, location: e });
      this.props.fetchNearbyArea();
    }

    this.onToggleSearchInput(false);
  }


  onChange = (value) => {
    console.log(value);
    const { toggleLocation } = this.props;
    toggleLocation(true);
    // this.props.setNearby({ ...this.props.nearby, time: value });
  }

  onAfterChange = (value) => {
    this.props.setNearby({ ...this.props.nearby, time: value });
    this.props.fetchNearbyArea();
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  onDrop = () => {
    const { togglePinDrop, toggleLocation, nearby } = this.props;
    const { pin } = nearby;
    const { active } = pin;

    toggleLocation(false);
    togglePinDrop({ ...pin, active: !active });
  }

  render() {
    const { shortIso, active: analysisActive, selectedLayers } = this.props;
    const { time, error, location, area, pin } = this.props.nearby;
    const { active, dropped } = pin;

    return (
      <div className="c-nearby">
        {!!error &&
          <div className="nearby-error">
            Error building area
          </div>
        }
        <div className="content-wrapper">

          <p>Find financial services which are available within your preferred drive-time by searching for a specific place then setting the time.</p>


          <div className="c-field">
            <label htmlFor="nearby-geosuggest">
              SEARCH LOCATION:
            </label>

            <Geosuggest
              ref={(r) => { this.geosuggest = r; }}
              id="nearby-geosuggest"
              className="c-geosuggest"
              initialValue={location.label}
              placeholder="Introduce location"
              country={shortIso}
              autoActivateFirstSuggest
              autoComplete="off"
              onSuggestSelect={this.onSuggestSelect}
              onKeyDown={this.onKeyDown}
            />
          </div>

          <p>OR</p>

          <button
            className={classnames('c-button -small -white',
              { '-disabled': (active && !dropped) })}
            onClick={this.onDrop}
          >
            {(!active) ? 'Click on map' : 'Clear area'}
          </button>

          <div className="c-field">
            <label htmlFor="nearby-time">
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
              onChange={this.onChange}
              onAfterChange={this.onAfterChange}
            />
          </div>
        </div>

        <div className={classnames('buttons-container -analysis-report', { '-disabled': (!selectedLayers.length || !!isEmpty(area)) })}>

          <button
            className="c-button -small -sea"
            onClick={() => this.props.setAnalysisActive(!analysisActive)}
          >
            Summary Report
          </button>
        </div>
      </div>
    );
  }
}

export default NearbyComponent;
