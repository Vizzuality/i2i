import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Redux
import { Provider, connect } from 'react-redux';
import { initStore } from './fsp-maps-store';

// Components
import FSPMaps from 'components/fsp-maps';

const store = initStore();

export default class FSPMapsPage extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired
  }

  render() {
    return (
      <Provider store={store}>
        <FSPMaps {...this.props} />
      </Provider>
    );
  }
}
