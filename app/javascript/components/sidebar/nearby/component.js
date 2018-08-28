import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import { Range } from 'wri-api-components';
import Geosuggest from 'react-geosuggest';

class NearbyComponent extends PureComponent {
  static propTypes = {
    nearby: PropTypes.object,
    shortIso: PropTypes.string.isRequired,
    setNearby: PropTypes.func.isRequired,
    setNearbyArea: PropTypes.func.isRequired,
    setNearbyError: PropTypes.func.isRequired,
    fetchNearbyArea: PropTypes.func.isRequired
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

  onRangeSelect = (value) => {
    this.props.setNearby({ ...this.props.nearby, time: value });
    this.props.fetchNearbyArea();
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  render() {
    const { shortIso } = this.props;
    const { time, error } = this.props.nearby;

    return (
      <div className="c-nearby">
        {!!error &&
          <div className="nearby-error">
            Error building area
          </div>
        }

        <p>Search to view Financial Service locations within a given location</p>


        <div className="c-field">
          <label htmlFor="nearby-geosuggest">
            Search location:
          </label>

          <Geosuggest
            ref={(r) => { this.geosuggest = r; }}
            id="nearby-geosuggest"
            className="c-geosuggest"
            placeholder="Introduce location"
            country={shortIso}
            autoActivateFirstSuggest
            autoComplete="off"
            onSuggestSelect={this.onSuggestSelect}
            onKeyDown={this.onKeyDown}
          />
        </div>

        <div className="c-field">
          <label htmlFor="nearby-time">
            Time: {time} minutes
          </label>

          <Range
            trackStyle={[
              { backgroundColor: '#2F939C' },
              { backgroundColor: 'grey' }
            ]}
            handleStyle={[
              { backgroundColor: '#2F939C', width: '14px', height: '14px', border: 0 }
            ]}
            activeDotStyle={{ display: 'none' }}
            dotStyle={{ display: 'none' }}
            marks={{
              1: {
                label: '1',
                style: { fontSize: 12 }
              },
              720: {
                label: '720',
                style: { fontSize: 12 }
              }
            }}
            id="nearby-time"
            min={1}
            max={720}
            value={time}
            onAfterChange={this.onRangeSelect}
          />
        </div>
      </div>
    );
  }
}

export default NearbyComponent;
