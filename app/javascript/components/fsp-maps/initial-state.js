export default {
  common: {
    iso: '',
    bbox: []
  },
  intro: { data: [] },
  map: {
    open: true,
    basemap: 'light',
    label: 'none'
  },
  legend: {
    open: true,
    layersSettings: {}
  },
  sidebar: {
    open: true,
    selected: 'layers',
    menuItem: ''
  },
  modal: {
    open: false,
    options: null
  },
  sectorLayers: { selectedSector: '' },
  layers: {
    list: [],
    selectedLayers: [],
    layersOrder: []
  },
  interactions: {},
  analysis: {
    nearby: { location: {} },
    areaOfInterest: {},
    jurisdiction: {}
  }
};
