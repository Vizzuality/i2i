import { createSelector } from 'reselect';

const sectorLayersList = state => state.sectorLayers.list;
const selectedSectorLayers = state => state.sectorLayers.selectedLayers;
const contextualLayersList = state => state.contextualLayers.list;
const selectedContextualLayers = state => state.contextualLayers.selectedLayers;

export const getActiveLayers = createSelector(
  [contextualLayersList, selectedContextualLayers, sectorLayersList, selectedSectorLayers],
  (_contextualLayersList, _selectedContextualLayers, _sectorLayersList, _selectedSectorLayers) => {
    const activeContextualLayers = _contextualLayersList.filter(layer =>
      _selectedContextualLayers.includes(layer.id));
    const activeSectorLayers = _sectorLayersList.filter(layer =>
      _selectedSectorLayers.includes(layer.type_id));

    return [...activeContextualLayers, ...activeSectorLayers];
  }
);


export const getActiveLayerGroups = createSelector(
  [contextualLayersList, selectedContextualLayers, sectorLayersList, selectedSectorLayers],
  (_contextualLayersList, _selectedContextualLayers, _sectorLayersList, _selectedSectorLayers) => {
    const activeContextualLayers = _contextualLayersList.filter(layer =>
      _selectedContextualLayers.includes(layer.id));
    const activeSectorLayers = _sectorLayersList.filter(layer =>
      _selectedSectorLayers.includes(layer.type_id));

    const layers = [...activeContextualLayers, ...activeSectorLayers];

    return layers.map(l => ({
      dataset: l.id,
      visibility: true,
      opacity: 1,
      layers: [{ ...l, active: true }]
    }));
  }
);

export default { getActiveLayers, getActiveLayerGroups };
