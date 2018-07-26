import * as actions from './actions';

export default {
  [actions.setIso]: (state, { payload }) => ({ ...state, iso: payload }),
  [actions.setBBox]: (state, { payload }) => ({ ...state, bbox: payload })
};
