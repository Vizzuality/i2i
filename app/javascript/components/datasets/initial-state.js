export default {
  common: {
    iso: '',
    shortIso: '',
    bbox: [],
    latestYear: null
  },
  intro: { data: [] },
  map: {
    open: true,
    zoom: 3,
    center: { lat: 0, lng: 0 },
    basemap: 'light',
    label: 'dark'
  },
  legend: { open: true },
  sidebar: {
    open: true,
    selected: 'layers',
    menuItem: ''
  },
  modal: {
    open: false,
    options: null
  },
  layers: {
    list: [],
    selectedLayers: [],
    selectedSector: '',
    layersOrder: [],
    layersSettings: {}
  },
  interactions: {},
  analysis: {
    active: false,
    nearby: {
      location: {},
      time: 30,
      area: {},
      error: null,
      center: {}
    },
    areaOfInterest: {
      drawing: false,
      clearing: false,
      area: {}
    },
    jurisdiction: {
      list: [],
      selectedJurisdiction: {},
      area: {}
    }
  },
  widgets: { list: [] },
  currentLayer: null,
};
