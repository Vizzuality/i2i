import * as actions from './actions';

export default {
  [actions.setList]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setSectorTitles]: (state, { payload }) => ({ ...state, sectorTitles: payload }),
  [actions.setSelectedSector]: (state, { payload }) => ({ ...state, selectedSector: payload }),
  [actions.setSelectedLayer]: (state, { payload }) => ({ ...state, selectedLayers: payload })
};
