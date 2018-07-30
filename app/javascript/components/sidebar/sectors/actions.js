import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';

// SQL
import SECTORS_SQL from './sql/sectors.sql';
import VORONOID_LAYER_SQL from './sql/voronoid_layer.sql';
import FSP_LAYER_SQL from './sql/fsp_layer.sql';

// CSS
import SECTORS_CSS from './cartocss/sectors.cartocss';
import HEATMAP_CSS from './cartocss/heatmap.cartocss';

export const setList = createAction('SECTORS/setList');
export const setListLoading = createAction('SECTORS/setListLoading');
export const setListError = createAction('SECTORS/setListError');
export const setSelectedSector = createAction('SECTORS/setSelectedSector');
export const setSelectedLayers = createAction('SECTORS/setSelectedLayers');

export const fetchSectors = createThunkAction('SECTORS/fetchSectors', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().common;

  dispatch(setListLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=dV-0c6EWgySmsfwRvcGQmA`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setListLoading(false));
      dispatch(setListError(null));

      const dataRows = data.rows.map(row => (
        {
          ...row,
          id: row.type_id,
          count: Numeral(row.count).format('0,0'),
          provider: 'carto',
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: replace(HEATMAP_CSS, { color: row.color }),
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

      dispatch(setList(dataRows));
    })
    .catch((err) => {
      dispatch(setListLoading(false));
      dispatch(setListError(err));
    });
});

export default { fetchSectors };
