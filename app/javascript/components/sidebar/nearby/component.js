import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import Geosuggest from 'react-geosuggest';
import Range from './range';

class NearbyComponent extends PureComponent {
  static propTypes = {
    nearby: PropTypes.object,
    shortIso: PropTypes.string.isRequired,
    setNearby: PropTypes.func.isRequired
  }

  static defaultProps = { nearby: {} }

  state = { showSearchInput: false };

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
    }

    this.onToggleSearchInput(false);
  }

  onRangeSelect = (value) => {
    this.props.setNearby({ ...this.props.nearby, time: value });
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  render() {
    const { shortIso } = this.props;

    return (
      <div className="c-nearby">
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
      </div>
    );
  }
}

export default NearbyComponent;
