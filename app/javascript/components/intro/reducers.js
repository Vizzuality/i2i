import * as actions from './actions';

export default {
  [actions.setIntro]: (state, { payload }) => ({ ...state, data: payload }),
  [actions.setIntroLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setIntroError]: (state, { payload }) => ({ ...state, error: payload })
};
