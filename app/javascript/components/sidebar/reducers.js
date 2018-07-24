import * as actions from './actions';

export default {
  [actions.setOpen]: (state, { payload }) => ({ ...state, open: payload }),
  [actions.setSelected]: (state, { payload }) => ({ ...state, selected: payload }),
  [actions.setMenuItem]: (state, { payload }) => ({ ...state, menuItem: payload })
};
