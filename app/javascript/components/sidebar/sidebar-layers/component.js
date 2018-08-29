import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Sectors from 'components/sidebar/sectors';
import ContextualLayers from 'components/sidebar/contextual-layers';
import ActiveLayersIndicator from 'components/sidebar/active-layers-indicator';

// styles
import './styles.scss';

const MENU_CONTENT = {
  sectors: <Sectors />,
  contextual_layers: <ContextualLayers />
};

const LAYER_TYPES = [
  { value: 'sectors', label: 'Sectors', text: 'Select the industry/sector of data points you would like to view.' },
  { value: 'contextual_layers', label: 'Contextual layers', text: 'Bring other useful data layers to your map.' }
  // { value: 'national_surveys', label: 'National surveys', text: 'View national surveys that got conducted in this region.' }
];

class SidebarLayersComponent extends React.Component {
  static propTypes = {
    menuItem: PropTypes.string,
    selectedLayers: PropTypes.array.isRequired,
    layersSettings: PropTypes.object.isRequired,
    setMenuItem: PropTypes.func.isRequired
  }

  static defaultProps = { menuItem: '' }

  render() {
    const { menuItem, selectedLayers, layersSettings } = this.props;
    const availableMenuItems = LAYER_TYPES.map(t => t.value);

    return (
      <div className="c-sidebar-layers">
        {!!selectedLayers.length &&
          <div className="active-layers-indicator-container">
            <ActiveLayersIndicator />
          </div>
        }
        {(!menuItem || !availableMenuItems.includes(menuItem)) &&
          <MenuItems
            items={LAYER_TYPES}
            onSelect={this.props.setMenuItem}
          />
        }

        {(!!menuItem && availableMenuItems.includes(menuItem)) &&
          <MenuItem
            item={LAYER_TYPES.find(lt => lt.value === menuItem)}
            onBack={this.props.setMenuItem}
          >
            {!!MENU_CONTENT[menuItem] &&
              React.cloneElement(MENU_CONTENT[menuItem], { layersSettings })}
          </MenuItem>
        }
      </div>
    );
  }
}

export default SidebarLayersComponent;
