import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Sectors from 'components/sidebar/sectors';
import ContextualLayers from 'components/sidebar/contextual-layers';
import NationalSurveys from 'components/sidebar/national-surveys';


// styles
import './styles.scss';

const MENU_CONTENT = {
  sectors: <Sectors />,
  contextual_layers: <ContextualLayers />,
  national_surveys: <NationalSurveys />
};

const LAYER_TYPES = [
  { value: 'sectors', label: 'Sectors', text: 'Select the industry/sector of data points you would like to view.', type: 'text' },
  { value: 'contextual_layers', label: 'Additional data', text: 'Bring other useful data layers to your map.', type: 'text' },
  { value: 'national_surveys', label: 'National Surveys', text: 'View national surveys that got conducted in this region.', type: 'button' }
];

class SidebarLayersComponent extends React.Component {
  static propTypes = {
    menuItem: PropTypes.string,
    layersSettings: PropTypes.object.isRequired,
    setMenuItem: PropTypes.func.isRequired
  }

  static defaultProps = { menuItem: '' }

  render() {
    const { menuItem, layersSettings } = this.props;
    const availableMenuItems = LAYER_TYPES.map(t => t.value);

    return (
      <div className="c-sidebar-layers">
        {(!menuItem || !availableMenuItems.includes(menuItem)) && (
          <MenuItems
            items={LAYER_TYPES}
            onSelect={this.props.setMenuItem}
          />
        )}
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
