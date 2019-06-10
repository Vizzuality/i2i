import { createAction, createThunkAction } from 'redux-tools';
import isEmpty from 'lodash/isEmpty';
import csv from 'csvtojson';

// COMMON
export const setIso = createAction('COMMON/setIso');
export const setShortIso = createAction('COMMON/setShortIso');
export const setBBox = createAction('COMMON/setBBox');
export const setLatestyear = createAction('COMMON/setLatestyear');

// INTRO
export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');

// MAP
export const setOpenMap = createAction('MAP/setOpenMap');
export const setZoom = createAction('MAP/setZoom');
export const setCenter = createAction('MAP/setCenter');
export const setBasemap = createAction('MAP/setBasemap');
export const setLabel = createAction('MAP/setLabel');

// LEGEND
export const setOpenLegend = createAction('LEGEND/setOpenLegend');

// SIDEBAR
export const setOpenSidebar = createAction('SIDEBAR/setOpenSidebar');
export const setSelected = createAction('SIDEBAR/setSelected');
export const setMenuItem = createAction('SIDEBAR-MENU/setMenuItem');

// LAYERS
export const setLayersList = createAction('PREVIEW_LAYERS/setLayersList');
export const setLayersSelected = createAction('PREVIEW_LAYERS/setLayersSelected');
export const setLayersSectorSelected = createAction('SECTORS/setLayersSectorSelected');
export const setLayersOrder = createAction('PREVIEW_LAYERS/setLayersOrder');
export const setLayersInteractions = createAction('INTERACTIONS/setLayersInteractions');
export const setLayersSettings = createAction('LEGEND/setLayersSettings');
export const setCurrentLayer = createAction('PREVIEW_LAYERS/setCurrentLayer');
export const removeCurrentLayer = createThunkAction('PREVIEW_LAYERS/removeCurrentLayer');
export const toggleDataset = createAction('PREVIEW_LAYERS/toggleDataset');

// DATASETS
const datasetsToLayers = datasets => datasets.map(d => ({
  id: d.id.toString(),
  name: d.name,
  provider: 'leaflet',
  layerConfig: {
    type: 'geoJSON',
    parse: false,
    body: null,
    options: {}
  }
}));

export const setDatasets = createThunkAction('PREVIEW_LAYERS/setDatasets', datasets => (dispatch) => {
  dispatch(setLayersList(datasetsToLayers(datasets)));
});

export const fetchGeoJSON = createThunkAction('PREVIEW_LAYERS/fetchGeoJSON', dataset => (dispatch, getState) => {
  const { layers } = getState().datasets;
  const selectedLayer = layers.list.find(l => l.id.toString() === dataset.id.toString());

  console.log('loading...');

  if (!selectedLayer.layerConfig.body) {
    fetch(dataset.file_absolute_url)
      .then((response) => {
        if (response.ok) return response.text();
        return response;
      })
      .then((data) => {
        csv({ colParser: { the_geom: 'omit', cartodb_id: 'omit' }, checkType: true })
          .fromString(data)
          .then((json) => {
            selectedLayer.layerConfig.body = {
              type: 'FeatureCollection',
              features: json.map(d => ({
                type: 'Feature',
                properties: { ...d },
                geometry: {
                  type: 'Point',
                  coordinates: [d.lng, d.lat]
                }
              }))
            };
            console.log('done!');
            dispatch(setCurrentLayer(selectedLayer));
          });
      });
  } else {
    console.log('done!');
    dispatch(setCurrentLayer(selectedLayer));
  }
});

// MODAL
export const setModal = createAction('MODAL/setModal');
export const closeModal = createAction('MODAL/closeModal');


// Widgets
export const setWidgetsList = createAction('WIDGETS/setWidgetsList');

// Analysis
export const setAnalysisActive = createAction('ANALYSIS/setAnalysisActive');

// Analysis - nearby
export const setNearby = createAction('ANALYSIS/setNearby');
export const setNearbyArea = createAction('ANALYSIS/setNearbyArea');
export const setNearbyCenter = createAction('ANALYSIS/setNearbyCenter');
export const setNearbyError = createAction('ANALYSIS/setNearbyError');
export const fetchNearbyArea = createThunkAction('ANALYSIS/fetchNearby', () => (dispatch, getState) => {
  const { time, location } = getState().datasets.analysis.nearby;
  if (isEmpty(location) || !time) {
    return false;
  }

  const { lat, lng } = location.location;
  const seconds = time * 60;

  return fetch(`${window.OPEN_ROUTE_API}?api_key=${window.OPEN_ROUTE_API_KEY}&profile=foot-walking&range_type=time&locations=${lng},${lat}&range=${seconds}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw response;
    })
    .then((data) => {
      dispatch(setNearbyArea(data.features[0].geometry));
      dispatch(setNearbyCenter({
        lng: data.features[0].properties.center[0],
        lat: data.features[0].properties.center[1]
      }));
    })
    .catch((err) => {
      if (err && typeof err.json === 'function') {
        err.json()
          .then((errs) => {
            dispatch(setNearbyError(errs));
          });
      } else {
        dispatch(setNearbyError(err));
      }
    });
});

// Analysis - area of interest
export const setAreaOfInterest = createAction('ANALYSIS/setAreaOfInterest');
export const setAreaOfInterestArea = createAction('ANALYSIS/setAreaOfInterestArea');
export const setDrawing = createAction('ANALYSIS/setDrawing');
export const setClearing = createAction('ANALYSIS/setClearing');

// Analysis - jurisdiction
export const setJurisdictionSelected = createAction('ANALYSIS/setJurisdictionSelected');
export const setJurisdictionsList = createAction('ANALYSIS/setJurisdictionsList');
export const setJurisdictionArea = createAction('ANALYSIS/setJurisdictionArea');
