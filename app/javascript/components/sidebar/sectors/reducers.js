import * as actions from './actions';

export default {
  [actions.setSectors]: (state, { payload }) => ({ ...state, sectorsData: payload }),
  [actions.setSectorTitles]: (state, { payload }) => ({ ...state, sectorTitles: payload })
};
