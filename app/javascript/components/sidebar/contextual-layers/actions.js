import { createAction, createThunkAction } from 'redux-tools';
import uniq from 'lodash/uniq';

// SQL
import CONTEXTUAL_LAYERS_SQL from './sql/contextual_layers.sql';

export const setList = createAction('CONTEXTUAL_LAYERS/setList');
export const setContextualLayersTitles = createAction('CONTEXTUAL_LAYERS/setContextualLayersTitles');
export const setSelectedLayers = createAction('CONTEXTUAL_LAYERS/setSelectedLayers');
export const setListLoading = createAction('CONTEXTUAL_LAYERS/setListLoading');
export const setListError = createAction('CONTEXTUAL_LAYERS/setListError');

export const fetchContextualLayers = createThunkAction('SECTORS/fetchContextualLayers', () => (dispatch, getState) => {
  dispatch(setListLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=9DwNIFD_vTbtO5no55TZog`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setListLoading(false));
      dispatch(setListError(null));
      const dataRows = data.rows.map(row => (
        {
          ...row
          // layerConfig: {
          //   body: {
          //     layers: [
          //       {
          //         options: {
          //           cartocss_version: '2.3.0',
          //           cartocss: '#gadm28_adm1{  polygon-fill: #3bb2d0;  polygon-opacity: 0;  line-color: #5CA2D1;  line-width: 0.5;  line-opacity: 1;}',
          //           sql: `SELECT st_asgeojson(the_geom), iso, sector, type FROM fsp_maps WHERE iso = '${iso}' AND sector in ('${row.sector}') AND type in ('${row.type}') ORDER BY sector, type`
          //         },
          //         type: 'cartodb'
          //       }
          //     ],
          //     minzoom: 3,
          //     maxzoom: 18
          //   },
          //   account: 'ikerey'
          // },
          // legendConfig: {
          //   type: 'basic',
          //   items: [
          //     {
          //       name: row.type,
          //       color: '#5CA2D1'
          //     }
          //   ]
          // },
          // interactionConfig: {}
        }
      ));
      const contextualLayerTitles = uniq(dataRows.map(row => (
        {
          layer: row.layer,
          id: row.cartodb_id
        }
      )));

      dispatch(setList(dataRows));
      dispatch(setContextualLayersTitles(contextualLayerTitles));
    })
    .catch((err) => {
      dispatch(setListLoading(false));
      dispatch(setListError(err));
    });
});

export default { fetchContextualLayers };
