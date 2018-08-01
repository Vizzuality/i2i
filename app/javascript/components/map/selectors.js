import { createSelector } from 'reselect';

const sectorLayersList = state => state.fspMaps.sectorLayers.list;
const selectedSectorLayers = state => state.fspMaps.sectorLayers.selectedLayers;
const contextualLayersList = state => state.fspMaps.contextualLayers.list;
const selectedContextualLayers = state => state.fspMaps.contextualLayers.selectedLayers;
const layersSettings = state => state.fspMaps.legend.layersSettings;

export const getActiveLayers = createSelector(
  [contextualLayersList, selectedContextualLayers, sectorLayersList, selectedSectorLayers, layersSettings],
  (_contextualLayersList, _selectedContextualLayers, _sectorLayersList, _selectedSectorLayers, _layersSettings) => {
    const activeContextualLayers = _contextualLayersList.filter(layer =>
      _selectedContextualLayers.includes(layer.id));
    const activeSectorLayers = _sectorLayersList.filter(layer =>
      _selectedSectorLayers.includes(layer.type_id));

    const layers = [...activeContextualLayers, ...activeSectorLayers];
    return layers.map(l => ({
      ...l,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1
    }));
  }
);


export const getActiveLayerGroups = createSelector(
  [contextualLayersList, selectedContextualLayers, sectorLayersList, selectedSectorLayers, layersSettings],
  (_contextualLayersList, _selectedContextualLayers, _sectorLayersList, _selectedSectorLayers, _layersSettings) => {
    const activeContextualLayers = _contextualLayersList.filter(layer =>
      _selectedContextualLayers.includes(layer.id));
    const activeSectorLayers = _sectorLayersList.filter(layer =>
      _selectedSectorLayers.includes(layer.type_id));

    const layers = [...activeContextualLayers, ...activeSectorLayers];

    return layers.map(l => ({
      dataset: l.id,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
      layers: [{ ...l, active: true }]
    }));
  }
);

export default { getActiveLayers, getActiveLayerGroups };
