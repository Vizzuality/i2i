import React from 'react';
import PropTypes from 'prop-types';

// Components
import Datasets from 'components/datasets';

// Styles
import 'wri-api-components/dist/bundle.css';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './datasets-store';

const store = initStore();

export default class DatasetsPage extends React.Component {
  static propTypes = { iso: PropTypes.string.isRequired }

  render() {
    return (
      <Provider store={store}>
        <Datasets {...this.props} />
      </Provider>
    );
  }
}
