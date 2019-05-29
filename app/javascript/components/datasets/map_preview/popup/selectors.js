import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { getActiveLayers } from 'components/datasets/map_preview/selectors';

const getInteractions = state => state.datasets.interactions;

export const getLayerIds = createSelector(
  [getActiveLayers],
  (_sortedLayers) => {
    if (isEmpty(_sortedLayers)) return null;

    return _sortedLayers.map(l => l.id);
  }
);

export const getInteraction = createSelector(
  [getLayerIds, getInteractions],
  (layerIds, _interactions) => {
    if (isEmpty(_interactions) || isEmpty(layerIds)) return null;

    const interactions = Object.values(_interactions).filter(i => i.data);
    const interactionIds = interactions.map(i => i.id);
    const interactionId = layerIds.find(l => interactionIds.indexOf(l) > -1);

    return interactions.find(i => i.id === interactionId);
  }
);

export default { getInteraction };
