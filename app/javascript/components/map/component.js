import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class SidebarComponent extends React.Component {
  static propTypes = { open: PropTypes.bool.isRequired }

  render() {
    const { open } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        Map
      </div>
    );
  }
}

export default SidebarComponent;
