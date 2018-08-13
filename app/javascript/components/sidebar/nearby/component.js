import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Geosuggest from 'react-geosuggest';

class NearbyComponent extends PureComponent {
  static propTypes = {
    nearby: PropTypes.object,
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

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  render() {
    return (
      <div className="c-nearby">
        <Geosuggest
          ref={(r) => { this.geosuggest = r; }}
          onSuggestSelect={this.onSuggestSelect}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

export default NearbyComponent;
