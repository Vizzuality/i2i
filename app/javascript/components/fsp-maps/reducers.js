import * as actions from './actions';

export default {
  [actions.setIso]: (state, { payload }) => {
    const common = { ...state.common, iso: payload };
    return { ...state, common };
  },
  [actions.setBBox]: (state, { payload }) => {
    const common = { ...state.common, bbox: payload };
    return { ...state, common };
  },
  [actions.setIntro]: (state, { payload }) => {
    const intro = { ...state.intro, data: payload };
    return { ...state, intro };
  },
  [actions.setIntroLoading]: (state, { payload }) => {
    const intro = { ...state.intro, loading: payload };
    return { ...state, intro };
  },
  [actions.setIntroError]: (state, { payload }) => {
    const intro = { ...state.intro, error: payload };
    return { ...state, intro };
  },
  [actions.setOpenMap]: (state, { payload }) => {
    const map = { ...state.map, open: payload };
    return { ...state, map };
  },
  [actions.setOpenLegend]: (state, { payload }) => {
    const legend = { ...state.legend, open: payload };
    return { ...state, legend };
  },
  [actions.setlayersSettings]: (state, { payload }) => {
    const legend = { ...state.legend, layersSettings: payload };
    return { ...state, legend };
  }
};
