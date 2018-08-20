import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Geosuggest from 'react-geosuggest';
import Range from './range';

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

  clearNearbyArea = () => {
    this.props.setNearbyArea({});
  }

  render() {
    const { shortIso } = this.props;
    const { error } = this.props.nearby;

    return (
      <div className="c-nearby">
        {!!error &&
          <div className="nearby-error">
            Error building area
          </div>
        }

        <Geosuggest
          ref={(r) => { this.geosuggest = r; }}
          onSuggestSelect={this.onSuggestSelect}
          onKeyDown={this.onKeyDown}
          country={shortIso}
        />

        <Range
          min={1}
          max={1200}
          defaultValue={30}
          onAfterChange={this.onRangeSelect}
        />

        <button
          onClick={() => this.clearNearbyArea()}
        >
          Clear
        </button>
      </div>
    );
  }
}

export default NearbyComponent;
