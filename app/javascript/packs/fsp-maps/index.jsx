import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store';


// Components
import Sidebar from 'components/sidebar';

const store = initStore();

class Hello extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Sidebar />
        </div>
      </Provider>
    );
  }
}

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.getElementById('fsp-maps'),
  )
})
