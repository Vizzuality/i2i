import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Tabs from 'components/sidebar/tabs';
import SidebarLayers from 'components/sidebar/sidebar-layers';
import SidebarAnalysis from 'components/sidebar/sidebar-analysis';

// styles
import './styles.scss';

const TABS = [
  { value: 'layers', label: 'Layers', component: <SidebarLayers /> },
  { value: 'analysis', label: 'Analysis', component: <SidebarAnalysis /> }
];

class SidebarComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired
  }

  render() {
    const { selected, open } = this.props;
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
          onSelect={s => this.props.setSelected(s)}
        />

        {React.cloneElement(
          SelectedComponent
        )}
      </div>
    );
  }
}

export default SidebarComponent;
