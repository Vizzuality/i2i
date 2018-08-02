export default {
  common: {
    iso: '',
    bbox: []
  },
  intro: { data: [] },
  map: { open: true },
  legend: {
    open: true,
    layersSettings: {}
  },
  sidebar: {
    open: true,
    selected: 'layers',
    menuItem: ''
  },
  sectorLayers: {
    list: [],
    loading: false,
    errors: null,
    selectedSector: '',
    selectedLayers: []
  },
  contextualLayers: {
    list: [],
    selectedLayers: []
  },
  layers: {
    list: [],
    selectedLayers: []
  }
};
