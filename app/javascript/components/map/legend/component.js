import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonRemove
} from 'wri-api-components';

import LegendItemButtonVisualizations from './legend-item-button-visualizations';

// styles
import './styles.scss';

class LegendComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    layersSettings: PropTypes.object,
    activeLayerGroups: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired,
    setLayersOrder: PropTypes.func.isRequired,
    fetchVoronoidLegends: PropTypes.func.isRequired
  }

  static defaultProps = {
    open: true,
    layersSettings: {}
  }

  onChangeLegendLayerVisualization = (layerId, visualizationType) => {
    const layersSettings = { ...this.props.layersSettings };
    layersSettings[layerId] = { ...layersSettings[layerId], visualizationType, visibility: true };

    this.props.setLayersSettings(layersSettings);
  }

  onChangeOpacity = debounce((l, opacity) => {
    const layerId = l.id ? l.id : l.cartodb_id;
    const layersSettings = { ...this.props.layersSettings };
    layersSettings[layerId] = { ...layersSettings[layerId], opacity };

    this.props.setLayersSettings(layersSettings);
  }, 250)

  onChangeVisibility = (l, visibility) => {
    const layerId = l.id ? l.id : l.cartodb_id;
    const layersSettings = { ...this.props.layersSettings };
    layersSettings[layerId] = { ...layersSettings[layerId], visibility };

    this.props.setLayersSettings(layersSettings);
  }

  onRemoveLayer = (l) => {
    const layersSettings = { ...this.props.layersSettings };
    const selectedLayers = [...this.props.selectedLayers];
    const index = selectedLayers.indexOf(l.id);
    selectedLayers.splice(index, 1);

    layersSettings[l.id] =
      { ...layersSettings[l.id], visibility: true, opacity: 1 };

    this.props.setLayersSettings(layersSettings);
    this.props.setLayersSelected(selectedLayers);
  }

  onChangeOrder = (layersOrder) => {
    this.props.setLayersOrder(layersOrder);
  }

  componentDidMount() {
    this.props.fetchVoronoidLegends();
  }

  componentDidUpdate(prevProps) {
    const { selectedLayers: prevSelectedLayers, list: prevList } = prevProps;
    const { selectedLayers: nextSelectedLayers } = this.props;

    if ((prevSelectedLayers !== nextSelectedLayers) || !prevList.length) {
      this.props.fetchVoronoidLegends();
    }
  }

  render() {
    const { open, activeLayerGroups, layersSettings } = this.props;

    const classNames = classnames({
      'c-legend': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Legend
          maxHeight={300}
          layerGroups={activeLayerGroups}
          onChangeOrder={this.onChangeOrder}
        >
          {activeLayerGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={
                <LegendItemToolbar>
                  {lg.layerType !== 'contextual' &&
                    <LegendItemButtonVisualizations
                      onClick={(layerId, visualizationType) => this.onChangeLegendLayerVisualization(layerId, visualizationType)}
                      layerId={lg.dataset}
                      layersSettings={layersSettings}
                    />
                  }
                  <LegendItemButtonOpacity />
                  <LegendItemButtonVisibility />
                  <LegendItemButtonRemove />
                </LegendItemToolbar>
              }
              onChangeOpacity={this.onChangeOpacity}
              onChangeVisibility={this.onChangeVisibility}
              onRemoveLayer={this.onRemoveLayer}
            >
              <LegendItemTypes />
            </LegendListItem>
          ))}
        </Legend>
      </div>
    );
  }
}

export default LegendComponent;
