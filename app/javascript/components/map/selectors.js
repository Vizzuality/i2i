import { createSelector } from 'reselect';

const layersList = state => state.fspMaps.layers.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const layersSettings = state => state.fspMaps.legend.layersSettings;

export const getActiveLayers = createSelector(
  [layersList, selectedLayers, layersSettings],
  (_layersList, _selectedLayers, _layersSettings) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));

    return activeLayers.map(l => ({
      ...l,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1
    }));
  }
);


export const getActiveLayerGroups = createSelector(
  [layersList, selectedLayers, layersSettings],
  (_layersList, _selectedLayers, _layersSettings) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));

    return activeLayers.map(l => ({
      dataset: l.id,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
      layers: [{ ...l, active: true }]
    }));
  }
);

export default { getActiveLayers, getActiveLayerGroups };
