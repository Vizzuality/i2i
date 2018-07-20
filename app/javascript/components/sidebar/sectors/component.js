import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class SectorsComponent extends React.Component {
  static propTypes = { fetchSectors: PropTypes.func.isRequired }

  componentWillMount() {
    this.props.fetchSectors();
  }

  render() {
    // const { selected } = this.props;
    // const classNames = classnames({
    //   'c-sidebar': true,
    //   '-open': !!open
    // });

    // const SelectedComponent = TABS.find(t => t.value === selected).component;

    return (
      <div className="c-sectors">
        Sectors
      </div>
    );
  }
}

export default SectorsComponent;
