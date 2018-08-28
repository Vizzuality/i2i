import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import Promise from 'bluebird';

import WRIJsonApiSerializer from 'wri-json-api-serializer';

// SQL
import INTRO_SQL from './sql/intro.sql';
import SECTORS_SQL from './sql/sectors.sql';
import CONTEXTUAL_LAYERS_SQL from './sql/contextual_layers.sql';
import WIDGETS_SQL from './sql/widgets.sql';
import JURISDICTIONS_SQL from './sql/jurisdictions.sql';
import JURISDICTION_GEOMETRY_SQL from './sql/jurisdiction-geometry.sql';

// COMMON
export const setIso = createAction('COMMON/setIso');
export const setShortIso = createAction('COMMON/setShortIso');
export const setBBox = createAction('COMMON/setBBox');

// INTRO
export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');
export const fetchIntro = createThunkAction('INTRO/fetchIntro', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().fspMaps.common;

  dispatch(setIntroLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(replace(INTRO_SQL, { iso }))}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setIntroLoading(false));
      dispatch(setIntroError(null));

      const dataRows = data.rows[0];

      dispatch(setIntro([
        { label: `TOTAL POPULATION (${dataRows.year})`, value: Numeral(dataRows.total_population).format('0,0'), subvalue: null },
        { label: 'RURAL POPULATION PERCENTAGE', value: `${Numeral(dataRows.rural_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.rural_population).format('0,0') },
        { label: 'TOTAL POPULATION WITHIN 5KM OF ALL ACESS POINTS', value: `${Numeral(dataRows.population_5km_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.population_5km).format('0,0') },
        { label: 'URBAN POPULATION PERCENTAGE:', value: `${Numeral(dataRows.urban_population_percentage / 100).format('0.0%')}`, subvalue: Numeral(dataRows.urban_population).format('0,0') }
      ]));
    })
    .catch((err) => {
      dispatch(setIntroLoading(false));
      dispatch(setIntroError(err));
    });
});

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
export const setLayersList = createAction('LAYERS/setLayersList');
export const setLayersSelected = createAction('LAYERS/setLayersSelected');
export const setLayersSectorSelected = createAction('SECTORS/setLayersSectorSelected');
export const setLayersOrder = createAction('LAYERS/setLayersOrder');
export const setLayersInteractions = createAction('INTERACTIONS/setLayersInteractions');
export const setLayersSettings = createAction('LEGEND/setLayersSettings');

function getSectors(iso) {
  const { replace } = window.App.Helper.Utils;

  return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      const dataRows = data.rows.map(row => ({
        ...row,
        id: row.type_id.toString(),
        name: row.type,
        layerType: 'sector',
        count: Numeral(row.count).format('0,0'),
        provider: 'carto'
      }));
      return dataRows;
    });
}

function getContextualLayers() {
  return fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      const dataRows = data.rows;
      const cartoLayers = dataRows.filter(row => row.provider === 'cartodb');
      const rwLayers = dataRows.filter(row => row.provider === 'rw_api');

      const contextualLayers = cartoLayers.map(row => (
        {
          ...row,
          name: row.layer,
          layerType: 'contextual',
          id: row.type_id.toString(),
          provider: 'carto',
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: row.css,
                    sql: row.queries
                  },
                  type: 'cartodb'
                }
              ],
              minzoom: 3,
              maxzoom: 18
            },
            account: window.FSP_CARTO_ACCOUNT
          },
          legendConfig: {
            type: 'basic',
            items: [
              {
                name: row.layer,
                color: '#5CA2D1'
              }
            ]
          },
          interactionConfig: {}
        }
      ));

      const rwLayersPromises = rwLayers.map(row => fetch(`https://api.resourcewatch.org/v1/layer/${row.layer_id}`).then((r) => {
        if (r.ok) {
          return r.json();
        }
      }));

      return Promise.all(rwLayersPromises)
        .then((data) => {
          compact(data).forEach((d) => {
            const serializedData = WRIJsonApiSerializer(d);
            contextualLayers.push({
              ...serializedData,
              name: rwLayers.find(l => l.layer_id === serializedData.id).layer,
              layerType: 'contextual'
            });
          });
          return contextualLayers;
        });
    });
}

export const fetchLayers = createThunkAction('LAYERS/fetchLayers', () => (dispatch, getState) => {
  const { iso } = getState().fspMaps.common;
  const { layersSettings } = getState().fspMaps.layers;

  Promise.all([getSectors(iso, layersSettings), getContextualLayers()])
    .then((data) => {
      dispatch(setLayersList(flatten(data)));
    });
});


// MODAL
export const setModal = createAction('MODAL/setModal');
export const closeModal = createAction('MODAL/closeModal');


// Widgets
export const setWidgetsList = createAction('WIDGETS/setWidgetsList');
export const fetchWidgets = createThunkAction('WIDGETS/fetchWidgets', () => (dispatch, getState) => {
  fetch(`${window.FSP_CARTO_API}?q=${encodeURIComponent(WIDGETS_SQL)}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      dispatch(setWidgetsList(data.rows));
    });
});

// Analysis - nearby
export const setNearby = createAction('ANALYSIS/setNearby');
export const setNearbyArea = createAction('ANALYSIS/setNearbyArea');
export const setNearbyCenter = createAction('ANALYSIS/setNearbyCenter');
export const setNearbyError = createAction('ANALYSIS/setNearbyError');
export const fetchNearbyArea = createThunkAction('ANALYSIS/fetchNearby', () => (dispatch, getState) => {
  const { lat, lng } = getState().fspMaps.analysis.nearby.location.location;
  const { time } = getState().fspMaps.analysis.nearby;
  const location = `${lng},${lat}`;
  const seconds = time * 60;

  return fetch(`${window.OPEN_ROUTE_API}?api_key=${window.OPEN_ROUTE_API_KEY}&profile=foot-walking&range_type=time&locations=${location}&range=${seconds}`)
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
export const fetchJurisdictions = createThunkAction('ANALYSIS/fetchJurisdictions', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().fspMaps.common;
  const jurisdictionsSql = encodeURIComponent(replace(JURISDICTIONS_SQL, { iso }));

  fetch(`${window.FSP_CARTO_API}?q=${jurisdictionsSql}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      dispatch(setJurisdictionsList(data.rows));
    });
});

export const fetchJurisdictionArea = createThunkAction('ANALYSIS/fetchJurisdictionArea', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { selectedJurisdiction } = getState().fspMaps.analysis.jurisdiction;
  const { value: jurisdictionId } = selectedJurisdiction;
  const jurisdictionAreaSql = encodeURIComponent(
    replace(JURISDICTION_GEOMETRY_SQL, { jurisdictionId })
  );

  fetch(`${window.FSP_CARTO_API}?q=${jurisdictionAreaSql}&api_key=${window.FSP_CARTO_API_KEY}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      dispatch(setJurisdictionArea(JSON.parse(data.rows[0].st_asgeojson)));
    });
});
