import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import Promise from 'bluebird';

import WRIJsonApiSerializer from 'wri-json-api-serializer';

// SQL
import INTRO_SQL from './sql/intro.sql';
import SECTORS_SQL from './sql/sectors.sql';
import VORONOID_LAYER_SQL from './sql/voronoid_layer.sql';
import FSP_LAYER_SQL from './sql/fsp_layer.sql';
import CONTEXTUAL_LAYERS_SQL from './sql/contextual_layers.sql';

// CSS
import SECTORS_CSS from './cartocss/sectors.cartocss';
import HEATMAP_CSS from './cartocss/heatmap.cartocss';

export const setIso = createAction('COMMON/setIso');
export const setBBox = createAction('COMMON/setBBox');
export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');
export const setOpenMap = createAction('MAP/setOpenMap');
export const setOpenLegend = createAction('LEGEND/setOpenLegend');
export const setlayersSettings = createAction('LEGEND/setlayersSettings');
export const setOpenSidebar = createAction('SIDEBAR/setOpenSidebar');
export const setSelected = createAction('SIDEBAR/setSelected');
export const setMenuItem = createAction('SIDEBAR-MENU/setMenuItem');
export const setListSectors = createAction('SECTORS/setListSectors');
export const setListLoadingSectors = createAction('SECTORS/setListLoadingSectors');
export const setListErrorSectors = createAction('SECTORS/setListErrorSectors');
export const setSelectedSector = createAction('SECTORS/setSelectedSector');
export const setSelectedLayersSectors = createAction('SECTORS/setSelectedLayersSectors');
export const setList = createAction('CONTEXTUAL_LAYERS/setList');
export const setSelectedLayers = createAction('CONTEXTUAL_LAYERS/setSelectedLayers');
export const setListLoading = createAction('CONTEXTUAL_LAYERS/setListLoading');
export const setListError = createAction('CONTEXTUAL_LAYERS/setListError');
export const setLayersList = createAction('LAYERS/setLayersList');
export const setSelectedLayersNew = createAction('LAYERS/setSelectedLayersNew');

export const fetchIntro = createThunkAction('INTRO/fetchIntro', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().fspMaps.common;

  dispatch(setIntroLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(replace(INTRO_SQL, { iso }))}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
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

export const fetchSectors = createThunkAction('SECTORS/fetchSectors', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().fspMaps.common;

  dispatch(setListLoadingSectors(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setListLoadingSectors(false));
      dispatch(setListErrorSectors(null));

      const dataRows = data.rows.map(row => (
        {
          ...row,
          id: row.type_id.toString(),
          name: row.type,
          count: Numeral(row.count).format('0,0'),
          provider: 'carto',
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: replace(SECTORS_CSS, { color: row.color }),
                    sql: replace(FSP_LAYER_SQL, { iso, type: row.type, sector: row.sector })
                  },
                  type: 'cartodb'
                }
              ],
              minzoom: 3,
              maxzoom: 18
            },
            account: 'ikerey'
          },
          legendConfig: {
            type: 'basic',
            items: [
              {
                name: row.type,
                color: row.color
              }
            ]
          },
          interactionConfig: {}
        }
      ));

      dispatch(setListSectors(dataRows));
    })
    .catch((err) => {
      dispatch(setListLoadingSectors(false));
      dispatch(setListErrorSectors(err));
    });
});

export const fetchContextualLayers = createThunkAction('CONTEXTUAL_LAYERS/fetchContextualLayers', () => (dispatch, getState) => {
  dispatch(setListLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setListLoading(false));
      dispatch(setListError(null));

      const dataRows = data.rows;
      const cartoLayers = dataRows.filter(row => row.provider === 'cartodb');
      const rwLayers = dataRows.filter(row => row.provider === 'rw_api');

      const contextualLayers = cartoLayers.map(row => (
        {
          ...row,
          name: row.layer,
          id: row.cartodb_id,
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
            account: 'ikerey'
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

      Promise.all(rwLayersPromises)
        .then((data) => {
          compact(data).forEach((d) => {
            const serializedData = WRIJsonApiSerializer(d);
            contextualLayers.push({
              ...serializedData,
              name: rwLayers.find(l => l.layer_id === serializedData.id).layer
            });
          });
          dispatch(setList(contextualLayers));
        });
    })
    .catch((err) => {
      dispatch(setListLoading(false));
      dispatch(setListError(err));
    });
});

function getSectors(iso) {
  const { replace } = window.App.Helper.Utils;

  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      const dataRows = data.rows.map(row => (
        {
          ...row,
          id: row.type_id.toString(),
          name: row.type,
          layerType: 'sector',
          count: Numeral(row.count).format('0,0'),
          provider: 'carto',
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: replace(SECTORS_CSS, { color: row.color }),
                    sql: replace(FSP_LAYER_SQL, { iso, type: row.type, sector: row.sector })
                  },
                  type: 'cartodb'
                }
              ],
              minzoom: 3,
              maxzoom: 18
            },
            account: 'ikerey'
          },
          legendConfig: {
            type: 'basic',
            items: [
              {
                name: row.type,
                color: row.color
              }
            ]
          },
          interactionConfig: {}
        }
      ));

      return dataRows;
    });
}

function getContextualLayers() {
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
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
          id: row.cartodb_id.toString(),
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
            account: 'ikerey'
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
  // const layersPromises = [dispatch(getSectors(iso)), dispatch(fetchContextualLayers())];
  // getSectors(iso).then((data) => { console.log('data', data); });
  // getContextualLayers().then((data) => { console.log('data', data); });

  Promise.all([getSectors(iso), getContextualLayers()])
    .then((data) => {
      dispatch(setLayersList(flatten(data)));
    });

  // console.log('test', layersPromises);
});

export default {
  setIso,
  setBBox,
  setIntro,
  setOpenLegend,
  setlayersSettings,
  fetchSectors,
  fetchContextualLayers
};
