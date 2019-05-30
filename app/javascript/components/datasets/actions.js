import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'layer-manager';
import Numeral from 'numeral';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import Promise from 'bluebird';
import csv from 'csvtojson';
import WRIJsonApiSerializer from 'wri-json-api-serializer';

// SQL
// import INTRO_SQL from './sql/intro.sql';
// import SECTORS_SQL from './sql/sectors.sql';
// import CONTEXTUAL_LAYERS_SQL from './sql/contextual_layers.sql';
// import WIDGETS_SQL from './sql/widgets.sql';
// import JURISDICTIONS_SQL from './sql/jurisdictions.sql';
// import JURISDICTION_GEOMETRY_SQL from './sql/jurisdiction-geometry.sql';

// CONSTANTS
import { LAYERS_INFO } from './constants';

// COMMON
export const setIso = createAction('COMMON/setIso');
export const setShortIso = createAction('COMMON/setShortIso');
export const setBBox = createAction('COMMON/setBBox');
export const setLatestyear = createAction('COMMON/setLatestyear');

// INTRO
export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');
// export const fetchIntro = createThunkAction('INTRO/fetchIntro', () => (dispatch, getState) => {
//   const { iso } = getState().datasets.common;
//
//   dispatch(setIntroLoading(true));
//
//   // return fetch(new Request(`${process.env.API_URL}/`))
//   return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(replace(INTRO_SQL, { iso }))}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//       throw new Error(response.statusText);
//     })
//     .then((data) => {
//       dispatch(setIntroLoading(false));
//       dispatch(setIntroError(null));
//
//       const dataRows = data.rows[0];
//
//       dispatch(setIntro([
//         { label: `TOTAL POPULATION (${dataRows.year})`, value: Numeral(dataRows.total_population).format('0,0'), subvalue: null },
//         { label: 'RURAL POPULATION PERCENTAGE', value: `${Numeral(dataRows.rural_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.rural_population).format('0,0') },
//         { label: 'URBAN POPULATION PERCENTAGE:', value: `${Numeral(dataRows.urban_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.urban_population).format('0,0') },
//         { label: 'TOTAL POPULATION WITHIN 5KM OF ALL ACESS POINTS', value: `${Numeral(dataRows.population_5km_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.population_5km).format('0,0') }
//       ]));
//     })
//     .catch((err) => {
//       dispatch(setIntroLoading(false));
//       dispatch(setIntroError(err));
//     });
// });

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
export const removeCurrentLayer = createAction('PREVIEW_LAYERS/removeCurrentLayer');

const datasetsToLayers = (datasets) => datasets.map(d => {
  return {
    id: d.id.toString(),
    name: d.name,
    provider: 'leaflet',
    layerConfig: {
      type: 'geoJSON',
      parse: false,
      body: null,
      options: {},
    },
  };
});

export const fetchLayers = createThunkAction('PREVIEW_LAYERS/fetchLayers', (datasets) => (dispatch) => {
  dispatch(setLayersList(datasetsToLayers(datasets)));
});

export const fetchGeoJSON = createThunkAction('PREVIEW_LAYERS/fetchGeoJSON', (dataset) => (dispatch, getState) => {
  const { layers } = getState().datasets;
  const selectedLayer = layers.list.find(l => l.id.toString() === dataset.id.toString());

  if (!selectedLayer.layerConfig.body) {
    fetch(dataset.file_absolute_url)
      .then((response) => {
        if (response.ok) return response.text()
      })
      .then((data) => {
        csv({ colParser: { 'the_geom': 'omit', 'cartodb_id': 'omit' }, checkType: true })
          .fromString(data)
          .then(json => {
            selectedLayer.layerConfig.body = {
              "type": "FeatureCollection",
              "features": json.map(d => ({
                "type": "Feature",
                "properties": { ...d },
                "geometry": {
                  "type": "Point",
                  "coordinates": [d.lng, d.lat]
                }
              }))
            };

            dispatch(setCurrentLayer(selectedLayer));
          });
      });
  } else {
    dispatch(setCurrentLayer(selectedLayer));
  }
});

// function getSectors(iso) {
//   return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//     })
//     .then((data) => {
//       const dataRows = data.rows.map(row => ({
//         ...row,
//         id: row.type_id.toString(),
//         name: row.type,
//         info: LAYERS_INFO[row.type],
//         layerType: 'sector',
//         count: Numeral(row.count).format('0,0'),
//         provider: 'carto'
//       }));
//
//       return dataRows;
//     });
// }

// function getContextualLayers() {
//   return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//     })
//     .then((data) => {
//       const dataRows = data.rows;
//       const cartoLayers = dataRows.filter(row => row.provider === 'cartodb');
//       const rwLayers = dataRows.filter(row => row.provider === 'rw_api');
//
//       const contextualLayers = cartoLayers.map(row => (
//         {
//           ...row,
//           name: row.layer,
//           info: LAYERS_INFO[row.layer],
//           layerType: 'contextual',
//           id: row.type_id.toString(),
//           provider: 'carto',
//           layerConfig: {
//             body: {
//               layers: [
//                 {
//                   options: {
//                     cartocss_version: '2.3.0',
//                     cartocss: row.css,
//                     sql: row.queries
//                   },
//                   type: 'cartodb'
//                 }
//               ],
//               minzoom: 3,
//               maxzoom: 18
//             },
//             account: window.FSP_CARTO_ACCOUNT
//           },
//           legendConfig: {
//             type: 'basic',
//             items: [
//               {
//                 name: row.layer,
//                 color: '#5CA2D1'
//               }
//             ]
//           },
//           interactionConfig: {}
//         }
//       ));
//
//       const rwLayersPromises = rwLayers.map(row => fetch(`https://api.resourcewatch.org/v1/layer/${row.layer_id}`).then((r) => {
//         if (r.ok) {
//           return r.json();
//         }
//       }));
//
//       return Promise.all(rwLayersPromises)
//         .then((data) => {
//           compact(data).forEach((d) => {
//             const serializedData = WRIJsonApiSerializer(d);
//
//             contextualLayers.push({
//               ...serializedData,
//               name: rwLayers.find(l => l.layer_id === serializedData.id).layer,
//               info: LAYERS_INFO[rwLayers.find(l => l.layer_id === serializedData.id).layer],
//               layerType: 'contextual'
//             });
//           });
//
//           return contextualLayers;
//         });
//     });
// }

// export const fetchLayers = createThunkAction('LAYERS/fetchLayers', () => (dispatch, getState) => {
//   const { iso } = getState().datasets.common;
//   const { layersSettings } = getState().datasets.layers;
//
//   Promise.all([getSectors(iso, layersSettings), getContextualLayers()])
//     .then((data) => {
//       dispatch(setLayersList(flatten(data)));
//     });
// });

// MODAL
export const setModal = createAction('MODAL/setModal');
export const closeModal = createAction('MODAL/closeModal');


// Widgets
export const setWidgetsList = createAction('WIDGETS/setWidgetsList');
// export const fetchWidgets = createThunkAction('WIDGETS/fetchWidgets', () => (dispatch, getState) => {
//   fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(WIDGETS_SQL)}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//     })
//     .then((data) => {
//       dispatch(setWidgetsList(data.rows));
//     });
// });

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
// export const fetchJurisdictions = createThunkAction('ANALYSIS/fetchJurisdictions', () => (dispatch, getState) => {
//   const { iso } = getState().datasets.common;
//   const jurisdictionsSql = encodeURIComponent(replace(JURISDICTIONS_SQL, { iso }));
//
//   fetch(`${window.FSP_CARTO_API}?q=${jurisdictionsSql}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//     })
//     .then((data) => {
//       dispatch(setJurisdictionsList(data.rows));
//     });
// });
//
// export const fetchJurisdictionArea = createThunkAction('ANALYSIS/fetchJurisdictionArea', () => (dispatch, getState) => {
//   const { selectedJurisdiction } = getState().datasets.analysis.jurisdiction;
//   const { value: jurisdictionId } = selectedJurisdiction;
//   const jurisdictionAreaSql = encodeURIComponent(
//     replace(JURISDICTION_GEOMETRY_SQL, { jurisdictionId })
//   );
//
//   fetch(`${window.FSP_CARTO_API}?q=${jurisdictionAreaSql}&api_key=${window.FSP_CARTO_API_KEY}`)
//     .then((response) => {
//       if (response.ok) return response.json();
//     })
//     .then((data) => {
//       dispatch(setJurisdictionArea(JSON.parse(data.rows[0].st_asgeojson)));
//     });
// });
