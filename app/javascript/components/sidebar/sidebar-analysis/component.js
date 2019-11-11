import React from 'react';
import PropTypes from 'prop-types';

// components
import MenuMessage from 'components/sidebar/menu-message';
import MenuItems from 'components/sidebar/menu-items';
import MenuItem from 'components/sidebar/menu-item';
import Nearby from 'components/sidebar/nearby';
import AreaOfInterest from 'components/sidebar/area-of-interest';
import AnalyzePatterns from 'components/sidebar/analyze-patterns';
import Jurisdiction from 'components/sidebar/jurisdiction';
import AnalysisResult from 'components/sidebar/analysis-result';

// styles
import './styles.scss';

const MENU_CONTENT = {
  nearby: <Nearby />,
  analyze_patterns: <AnalyzePatterns />,
  area_of_interest: <AreaOfInterest />,
  jurisdiction: <Jurisdiction />
};

const ANALYSIS_TYPES = [
  {
    value: 'jurisdiction',
    label: 'Summaries',
    text: 'Find statistics about financial services that fall in a specified jurisdiction.',
    type: 'text'
  },
  {
    value: 'analyze_patterns',
    label: 'Analyze Patterns',
    text: 'Discover financial services hot & cold spots through spatial clustering.',
    type: 'text'
  },
  {
    value: 'nearby',
    label: 'Calculate proximity',
    text: 'View financial service locations within your own radius.',
    type: 'text'
  },
  {
    value: 'area_of_interest',
    label: 'Area enrichment',
    text: 'Draw an area of interest to retrieve information about people, availability of financial services & distances to the services.',
    type: 'text'
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
    list: PropTypes.array
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
          <AnalysisResult />
        }
      </div>
    );
  }
}

export default SidebarAnalysisComponent;
