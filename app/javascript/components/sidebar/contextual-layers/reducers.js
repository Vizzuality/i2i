import * as actions from './actions';

export default {
  [actions.setList]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setContextualLayersTitles]: (state, { payload }) => ({ ...state, contextualLayerTitles: payload }),
  [actions.setSelectedLayers]: (state, { payload }) => ({ ...state, selectedLayers: payload })
};
