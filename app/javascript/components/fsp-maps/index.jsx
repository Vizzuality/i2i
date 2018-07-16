import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store';

// Components
import Sidebar from 'components/sidebar';

const store = initStore();

export default class FSPMaps extends React.Component {
  static defaultProps = {
    name: 'David'
  }

  static propTypes = {
    name: PropTypes.string
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          {this.props.name}
          <Sidebar />
        </div>
      </Provider>
    );
  }
}