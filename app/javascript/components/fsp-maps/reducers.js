import * as actions from './actions';
import initialState from './initial-state';

export default {
  // COMMON
  [actions.setIso]: (state, { payload }) => {
    const common = { ...state.common, iso: payload };
    return { ...state, common };
  },
  [actions.setBBox]: (state, { payload }) => {
    const common = { ...state.common, bbox: payload };
    return { ...state, common };
  },

  // INTRO
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

  // MAP
  [actions.setOpenMap]: (state, { payload }) => {
    const map = { ...state.map, open: payload };
    return { ...state, map };
  },

  [actions.setBasemap]: (state, { payload }) => {
    const map = { ...state.map, basemap: payload };
    return { ...state, map };
  },

  [actions.setLabel]: (state, { payload }) => {
    const map = { ...state.map, label: payload };
    return { ...state, map };
  },


  // LEGEND
  [actions.setOpenLegend]: (state, { payload }) => {
    const legend = { ...state.legend, open: payload };
    return { ...state, legend };
  },
  [actions.setlayersSettings]: (state, { payload }) => {
    const legend = { ...state.legend, layersSettings: payload };
    return { ...state, legend };
  },

  // SIDEBAR
  [actions.setOpenSidebar]: (state, { payload }) => {
    const sidebar = { ...state.sidebar, open: payload };
    return { ...state, sidebar };
  },
  [actions.setSelected]: (state, { payload }) => {
    const sidebar = { ...state.sidebar, selected: payload };
    return { ...state, sidebar };
  },
  [actions.setMenuItem]: (state, { payload }) => {
    const sidebar = { ...state.sidebar, menuItem: payload };
    return { ...state, sidebar };
  },

  // LAYERS
  [actions.setListSectors]: (state, { payload }) => {
    const sectorLayers = { ...state.sectorLayers, list: payload };
    return { ...state, sectorLayers };
  },
  [actions.setListLoadingSectors]: (state, { payload }) => {
    const sectorLayers = { ...state.sectorLayers, loading: payload };
    return { ...state, sectorLayers };
  },
  [actions.setListErrorSectors]: (state, { payload }) => {
    const sectorLayers = { ...state.sectorLayers, error: payload };
    return { ...state, sectorLayers };
  },
  [actions.setSelectedSector]: (state, { payload }) => {
    const sectorLayers = { ...state.sectorLayers, selectedSector: payload };
    return { ...state, sectorLayers };
  },
  [actions.setSelectedLayersSectors]: (state, { payload }) => {
    const sectorLayers = { ...state.sectorLayers, selectedLayers: payload };
    return { ...state, sectorLayers };
  },
  [actions.setList]: (state, { payload }) => {
    const contextualLayers = { ...state.contextualLayers, list: payload };
    return { ...state, contextualLayers };
  },
  [actions.setSelectedLayers]: (state, { payload }) => {
    const contextualLayers = { ...state.contextualLayers, selectedLayers: payload };
    return { ...state, contextualLayers };
  },
  [actions.setLayersList]: (state, { payload }) => {
    const layers = { ...state.layers, list: payload };
    return { ...state, layers };
  },
  [actions.setSelectedLayersNew]: (state, { payload }) => {
    const layers = { ...state.layers, selectedLayers: payload };
    return { ...state, layers };
  },
  [actions.setLayersOrder]: (state, { payload }) => {
    const layers = { ...state.layers, layersOrder: payload };
    return { ...state, layers };
  },
  [actions.setInteractions]: (state, { payload }) => {
    const interactions = { ...state.interactions, ...payload };
    return { ...state, interactions };
  },

  // MODAL
  [actions.setModal]: (state, { payload }) => ({
    ...state,
    modal: {
      ...state.modal,
      ...payload
    }
  }),
  [actions.closeModal]: state => ({ ...state, modal: initialState.modal })
};
