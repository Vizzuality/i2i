import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class SidebarComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired
  }

  render() {
    const classNames = classnames({
      'c-sidebar': true,
      '-open': !!open
    })

    return (
      <div className={classNames}>
        Sidebar
      </div>
    );
  }
}

export default SidebarComponent;