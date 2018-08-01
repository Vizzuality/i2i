import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuItemsComponent from 'components/sidebar/menu-items';
import SectorsComponent from 'components/sidebar/sectors';
import ContextualLayersComponent from 'components/sidebar/contextual-layers';

// styles
import './styles.scss';

const MENU_CONTENT = {
  sectors: <SectorsComponent />,
  contextual_layers: <ContextualLayersComponent />
};

class SidebarLayersComponent extends React.Component {
  static propTypes = {
    menuItem: PropTypes.string,
    setMenuItem: PropTypes.func.isRequired,
    fetchSectors: PropTypes.func.isRequired,
    fetchContextualLayers: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchSectors();
    this.props.fetchContextualLayers();
  }

  render() {
    const layersTypes = [
      { value: 'sectors', label: 'Sectors', text: 'Select the industry/sector of data points you would like to view.' },
      { value: 'contextual_layers', label: 'Contextual layers', text: 'Bring other useful data layers to your map.' },
      { value: 'national_surveys', label: 'National surveys', text: 'View national surveys that got conducted in this region.' }
    ];

    const { menuItem } = this.props;

    return (
      <div className="c-layers-menu-item">
        <MenuItemsComponent
          items={layersTypes}
          onSelectMenuItem={this.props.setMenuItem}
        />

        {!!menuItem && React.cloneElement(
          MENU_CONTENT[menuItem]
        )}
      </div>
    );
  }
}

export default SidebarLayersComponent;
