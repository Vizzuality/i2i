import * as actions from './actions';

export default {
  [actions.setOpen]: (state, { payload }) => ({ ...state, open: payload }),
  [actions.setlayersSettings]: (state, { payload }) => ({ ...state, layersSettings: payload })
};
