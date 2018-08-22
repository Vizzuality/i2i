import { createSelector } from 'reselect';
import difference from 'lodash/difference';

const layersList = state => state.fspMaps.layers.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const layersSettings = state => state.fspMaps.legend.layersSettings;
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
  [layersList, selectedLayers, layersSettings, layersOrder],
  (_layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map((l) => {
      let interactivity = ['name', 'type'];

      // If layer is present and visualization type is voronoid, turn off interactivity
      if (_layersSettings[l.id] && _layersSettings[l.id].visualizationType && _layersSettings[l.id].visualizationType === 'voronoid') {
        interactivity = null;
      }

      // If layer if anything  other than a sectors type, turn off interactivity
      if (l.layerType !== 'sectors') {
        interactivity = null;
      }

      return {
        ...l,
        visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
        opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
        interactivity
      };
    });

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export const getActiveLayerGroups = createSelector(
  [layersList, selectedLayers, layersSettings, layersOrder],
  (_layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map(l => ({
      dataset: l.id,
      id: l.id,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
      layers: [{ ...l, active: true }]
    }));

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export default { getActiveLayers, getActiveLayerGroups };
