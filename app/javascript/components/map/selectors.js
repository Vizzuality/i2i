import { createSelector } from 'reselect';
import difference from 'lodash/difference';

const layersList = state => state.fspMaps.layers.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const layersSettings = state => state.fspMaps.legend.layersSettings;
const layersOrder = state => state.fspMaps.layers.layersOrder;

export const getActiveLayers = createSelector(
  [layersList, selectedLayers, layersSettings, layersOrder],
  (_layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    let sortedLayers = [];
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    let mapped = activeLayers.map(l => ({
      ...l,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1
    }));

    if (allLayersOrder.length === 0) {
      sortedLayers = mapped;
    } else {
      allLayersOrder.forEach((key) => {
        let found = false;
        mapped = mapped.filter((item) => {
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
);

export const getActiveLayerGroups = createSelector(
  [layersList, selectedLayers, layersSettings, layersOrder],
  (_layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    let sortedLayers = [];
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    let mapped = activeLayers.map(l => ({
      dataset: l.id,
      id: l.id,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
      layers: [{ ...l, active: true }]
    }));

    if (allLayersOrder.length === 0) {
      sortedLayers = mapped;
    } else {
      allLayersOrder.forEach((key) => {
        let found = false;
        mapped = mapped.filter((item) => {
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
);

export default { getActiveLayers, getActiveLayerGroups };
