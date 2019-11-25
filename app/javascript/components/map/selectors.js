import { createSelector } from 'reselect';
import difference from 'lodash/difference';

import { SECTOR_CONFIGS } from './constants';

const iso = state => state.fspMaps.common.iso;
const layersList = state => state.fspMaps.layers.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const layersSettings = state => state.fspMaps.layers.layersSettings;
const layersOrder = state => state.fspMaps.layers.layersOrder;

function getSortedLayers(allLayersOrder, mapped) {
  let sortedLayers = [];
  let mappedLayers = mapped;

  if (allLayersOrder.length === 0) {
    sortedLayers = mappedLayers;
  } else {
    allLayersOrder.forEach((key) => {
      let found = false;
      mappedLayers = mappedLayers.filter((item) => {
        if (!found && item.id == key) {
          sortedLayers.push(item);
          found = true;
          return false;
        } return true;
      });
    });
  }

  return sortedLayers;
}

export const getActiveLayers = createSelector(
  [iso, layersList, selectedLayers, layersSettings, layersOrder],
  (_iso, _layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map((l) => {
      const { years = [] } = l;

      const layerSetting = _layersSettings[l.id];
      const visualizationType = (layerSetting && typeof layerSetting.visualizationType !== 'undefined') ? layerSetting.visualizationType : 'normal';
      const opacity = (layerSetting && typeof layerSetting.opacity !== 'undefined') ? layerSetting.opacity : 1;
      const visibility = (layerSetting && typeof layerSetting.visibility !== 'undefined') ? layerSetting.visibility : true;
      const year = (layerSetting && typeof layerSetting.year !== 'undefined') ? layerSetting.year : years[0];
      const sectorConfigParams = {
        l,
        iso: _iso,
        year
      };

      return {
        ...l,
        ...l.layerType === 'sector' && { ...SECTOR_CONFIGS[visualizationType](sectorConfigParams) },
        visibility,
        opacity,
        year
      };
    });

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export const getActiveLayerGroups = createSelector(
  [iso, layersList, selectedLayers, layersSettings, layersOrder],
  (_iso, _layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map((l) => {
      const layerSetting = _layersSettings[l.id];
      const visualizationType = (layerSetting && typeof layerSetting.visualizationType !== 'undefined') ? layerSetting.visualizationType : 'normal';
      const sectorConfigParams = {
        l,
        visualizationType,
        iso: _iso
      };

      const { years = [] } = l;

      const config = {
        dataset: l.id,
        id: l.id,
        visibility: (layerSetting && typeof layerSetting.visibility !== 'undefined') ? layerSetting.visibility : true,
        opacity: (layerSetting && typeof layerSetting.opacity !== 'undefined') ? layerSetting.opacity : 1,
        year: (layerSetting && typeof layerSetting.year !== 'undefined') ? layerSetting.year : years[0],
        layers: [{
          ...l,
          ...l.layerType === 'sector' && { ...SECTOR_CONFIGS[visualizationType](sectorConfigParams) },
          year: (layerSetting && typeof layerSetting.year !== 'undefined') ? layerSetting.year : years[0],
          active: true
        }],
        layerType: l.layerType
      };

      return config;
    });

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export default { getActiveLayers, getActiveLayerGroups };
