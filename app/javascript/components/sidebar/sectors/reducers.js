import * as actions from './actions';

export default {
  [actions.setSectors]: (state, { payload }) => ({ ...state, sectorsData: payload }),
  [actions.setSectorTitles]: (state, { payload }) => ({ ...state, sectorTitles: payload }),
  [actions.setSelectedSector]: (state, { payload }) => ({ ...state, selectedSector: payload }),
  [actions.setSelectedType]: (state, { payload }) => ({ ...state, selectedTypes: payload })
};
