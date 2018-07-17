import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Redux
import { Provider, connect } from 'react-redux';
import { initStore } from './store';

// Components
import Sidebar from 'components/sidebar';
import Intro from 'components/intro';

// Actions
import { fetchIntro } from 'components/intro/actions';

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
          <Intro />
          <Sidebar />
        </div>
      </Provider>
    );
  }
}

// export default connect(
//   state => ({}),
//   { fetchIntro }
// )(FSPMaps);
