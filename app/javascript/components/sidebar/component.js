import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import Tabs from 'components/sidebar/tabs';
import SidebarLayers from 'components/sidebar/sidebar-layers';
import SidebarAnalysis from 'components/sidebar/sidebar-analysis';

const TABS = [
  { value: 'layers', label: 'Layers', component: <SidebarLayers /> },
  { value: 'analysis', label: 'Analysis', component: <SidebarAnalysis /> }
];

class SidebarComponent extends React.Component {
  static propTypes = { open: PropTypes.bool.isRequired }

  render() {
    const { selected } = this.props;
    const classNames = classnames({
      'c-sidebar': true,
      '-open': !!open
    });

    const SelectedComponent = TABS.find(t => t.value === selected).component;

    return (
      <div className={classNames}>
        <Tabs
          items={TABS}
          selected={this.props.selected}
          onSelect={selected => this.props.setSelected(selected)}
        />

        {React.cloneElement(
          SelectedComponent
        )}
      </div>
    );
  }
}

export default SidebarComponent;
