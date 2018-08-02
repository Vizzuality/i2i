import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonRemove
} from 'wri-api-components';

// styles
import './styles.scss';

class LegendComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool,
    layersSettings: PropTypes.object,
    activeLayerGroups: PropTypes.array.isRequired,
    // selectedSectorLayers: PropTypes.array.isRequired,
    // selectedContextualLayers: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    setSelectedLayersNew: PropTypes.func.isRequired,
    setlayersSettings: PropTypes.func.isRequired
  }

  onChangeOpacity = debounce((l, opacity) => {
    const layerId = l.id ? l.id : l.cartodb_id;
    const layersSettings = { ...this.props.layersSettings };
    layersSettings[layerId] = { ...layersSettings[layerId], opacity };

    this.props.setlayersSettings(layersSettings);
  }, 250)

  onChangeVisibility = (l, visibility) => {
    const layerId = l.id ? l.id : l.cartodb_id;
    const layersSettings = { ...this.props.layersSettings };
    layersSettings[layerId] = { ...layersSettings[layerId], visibility };

    this.props.setlayersSettings(layersSettings);
  }

  onRemoveLayer = (l) => {
    const layersSettings = { ...this.props.layersSettings };
    const selectedLayers = [...this.props.selectedLayers];
    const index = selectedLayers.indexOf(l.id);
    selectedLayers.splice(index, 1);

    layersSettings[l.id] =
      { ...layersSettings[l.id], visibility: true, opacity: 1 };
    this.props.setlayersSettings(layersSettings);
    this.props.setSelectedLayersNew(selectedLayers);
  }

  render() {
    const { open, activeLayerGroups } = this.props;

    const classNames = classnames({
      'c-legend': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Legend
          maxHeight={300}
          layerGroups={activeLayerGroups}
        >
          {activeLayerGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={
                <LegendItemToolbar>
                  <LegendItemButtonLayers />
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
