import React, { PureComponent, cloneElement } from 'react';
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

class SidebarComponent extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    selected: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    setSelected: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired,
    setOpenSidebar: PropTypes.func.isRequired
  }

  onToggleSidebar = () => {
    const { setOpenSidebar, open } = this.props;

    setOpenSidebar(!open);
  }

  render() {
    const { selected, open, active } = this.props;
    const classNames = classnames({
      'c-sidebar': true,
      '-big': active,
      '-open': !!open
    });

    const SelectedComponent = TABS.find(t => t.value === selected).component;

    return (
      <div className={classNames}>
        <Tabs
          items={TABS}
          selected={this.props.selected}
          onSelect={(s) => {
            this.props.setSelected(s);
            this.props.setAnalysisActive(false);
          }}
        />

        <div className="overflow-container">
          {cloneElement(SelectedComponent)}
        </div>

        <button
          className="toggle-btn"
          onClick={this.onToggleSidebar}
        >
          <span className="arrow" />
        </button>
      </div>
    );
  }
}

export default SidebarComponent;
