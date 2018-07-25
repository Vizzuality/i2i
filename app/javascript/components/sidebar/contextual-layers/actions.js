import { createAction, createThunkAction } from 'redux-tools';
import compact from 'lodash/compact';
import Promise from 'bluebird';

import WRIJsonApiSerializer from 'wri-json-api-serializer';

// SQL
import CONTEXTUAL_LAYERS_SQL from './sql/contextual_layers.sql';

export const setList = createAction('CONTEXTUAL_LAYERS/setList');
export const setSelectedLayers = createAction('CONTEXTUAL_LAYERS/setSelectedLayers');
export const setListLoading = createAction('CONTEXTUAL_LAYERS/setListLoading');
export const setListError = createAction('CONTEXTUAL_LAYERS/setListError');

export const fetchContextualLayers = createThunkAction('SECTORS/fetchContextualLayers', () => (dispatch, getState) => {
  dispatch(setListLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(CONTEXTUAL_LAYERS_SQL)}&api_key=FBqvmLoNs3frmfwsajHUeA`)
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

export default { fetchContextualLayers };
