import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import uniq from 'lodash/uniq';

const layers = state => state.fspMaps.layers.list;
const selectedSector = state => state.fspMaps.sectorLayers.selectedSector;

export const getSectors = createSelector(
  [layers],
  _layers => compact(uniq(_layers.map(sectorData => (sectorData.sector))))
);

export const getLayersBySector = createSelector(
  [layers, selectedSector],
  (_layers, _selectedSector) => _layers.filter(layer =>
    layer.sector === _selectedSector)
);

export default {
  getSectors,
  getLayersBySector
};
