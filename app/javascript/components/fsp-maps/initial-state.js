export default {
  common: {
    iso: '',
    bbox: []
  },
  intro: { data: [] },
  map: {
    open: true,
    zoom: 3,
    center: { lat: 0, lng: 0 },
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
  interactions: {}
};
