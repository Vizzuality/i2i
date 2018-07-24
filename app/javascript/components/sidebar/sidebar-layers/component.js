import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import MenuItemsComponent from 'components/sidebar/menu-items';
import SectorsComponent from 'components/sidebar/sectors';

class SidebarLayersComponent extends React.Component {
  static propTypes = {
    setMenuItem: PropTypes.func.isRequired,
    fetchSectors: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchSectors();
  }

  render() {
    const layers = [
      { value: 'sectors', label: 'Sectors', text: 'Select the industry/sector of data points you would like to view.' },
      { value: 'contextual_layers', label: 'Contextual layers', text: 'Bring other useful data layers to your map.' },
      { value: 'national_surveys', label: 'National surveys', text: 'View national surveys that got conducted in this region.' }
    ];

    const { menuItem } = this.props;

    return (
      <div className="c-layers-menu-item">
        <MenuItemsComponent
          items={layers}
          onSelectMenuItem={this.props.setMenuItem}
        />

        {menuItem === 'sectors' && <SectorsComponent />}
      </div>
    );
  }
}

export default SidebarLayersComponent;
