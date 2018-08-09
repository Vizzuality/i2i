import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Sectors from 'components/sidebar/sectors';
import ContextualLayers from 'components/sidebar/contextual-layers';

// styles
import './styles.scss';

const MENU_CONTENT = {
  sectors: <Sectors />,
  contextual_layers: <ContextualLayers />
};

const LAYER_TYPES = [
  { value: 'sectors', label: 'Sectors', text: 'Select the industry/sector of data points you would like to view.' },
  { value: 'contextual_layers', label: 'Contextual layers', text: 'Bring other useful data layers to your map.' },
  { value: 'national_surveys', label: 'National surveys', text: 'View national surveys that got conducted in this region.' }
];

class SidebarLayersComponent extends React.Component {
  static propTypes = {
    menuItem: PropTypes.string,
    setMenuItem: PropTypes.func.isRequired,
    layersSettings: PropTypes.object.isRequired,
    fetchLayers: PropTypes.func.isRequired
  }

  static defaultProps = { menuItem: '' }

  componentWillMount() {
    this.props.fetchLayers();
  }

  render() {
    const { menuItem, layersSettings } = this.props;

    return (
      <div className="c-sidebar-layers">
        {!menuItem &&
          <MenuItems
            items={LAYER_TYPES}
            onSelect={this.props.setMenuItem}
          />
        }

        {!!menuItem &&
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
