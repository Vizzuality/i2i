import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuMessage from 'components/sidebar/menu-message';
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Nearby from 'components/sidebar/nearby';
import AreaOfInterest from 'components/sidebar/area-of-interest';
import Jurisdiction from 'components/sidebar/jurisdiction';
import AnalysisResult from 'components/widget/analysis-result';
import WidgetWrapperComponent from 'components/widget';

// styles
import './styles.scss';

const MENU_CONTENT = {
  nearby: <Nearby />,
  area_of_interest: <AreaOfInterest />,
  jurisdiction: <Jurisdiction />
};

const ANALYSIS_TYPES = [
  {
    value: 'nearby',
    label: 'Nearby',
    text: 'Drop a pin at a specific point on the map to viewfinancial service locations within your own radius.'
  },
  {
    value: 'area_of_interest',
    label: 'Area of Interest',
    text: 'Create your own shape to view more information about that area.'
  },
  {
    value: 'jurisdiction',
    label: 'Jurisdiction',
    text: 'Zoom into a particular jurisdiction.'
  }
];

class SidebarAnalysisComponent extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    menuItem: PropTypes.string,
    selected: PropTypes.string,
    selectedLayers: PropTypes.array,
    setMenuItem: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    list: PropTypes.shape
  }

  static defaultProps = {
    menuItem: '',
    selected: '',
    selectedLayers: [],
    list: {}
  }

  render() {
    const {
      menuItem,
      active,
      selected,
      list,
      setMenuItem,
      selectedLayers,
      setAnalysisActive,
      setSelected
    } = this.props;

    const availableMenuItems = ANALYSIS_TYPES.map(t => t.value);
    const analysisLayers = (list
      .filter(layer => layer.layerType === 'sector' || (layer.type_id && layer.type_id.length !== 0)))
      .map(sector => sector.id)
      .some(ele => selectedLayers.includes(ele));

    if (!active && !analysisLayers) {
      return (
        <div className="c-sidebar-analysis">
          <MenuMessage
            onSelect={setSelected}
          />
        </div>
      );
    }

    return (
      <div className="c-sidebar-analysis">
        {(!active && (!menuItem || !availableMenuItems.includes(menuItem))) &&
          <MenuItems
            items={ANALYSIS_TYPES}
            onSelect={setMenuItem}
            selected={selected}
            setAnalysisActive={setAnalysisActive}
          />
        }

        {(!active && (!!menuItem && availableMenuItems.includes(menuItem))) &&
          <MenuItem
            item={ANALYSIS_TYPES.find(at => at.value === menuItem)}
            onBack={setMenuItem}
          >
            {!!MENU_CONTENT[menuItem] &&
              React.cloneElement(MENU_CONTENT[menuItem])}
          </MenuItem>
        }
        {active &&
        // <WidgetWrapperComponent />
         <AnalysisResult />
        }
      </div>
    );
  }
}

export default SidebarAnalysisComponent;
