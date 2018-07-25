import React from 'react';
import PropTypes from 'prop-types';

// Components
import FSPMaps from 'components/fsp-maps';

// Styles
import 'wri-api-components/dist/components.css';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './fsp-maps-store';

const store = initStore();

export default class FSPMapsPage extends React.Component {
  static propTypes = { iso: PropTypes.string.isRequired }

  render() {
    return (
      <Provider store={store}>
        <FSPMaps {...this.props} />
      </Provider>
    );
  }
}
