import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';
import uniq from 'lodash/uniq';

// SQL
import SECTORS_SQL from './sql/sectors.sql';

export const setList = createAction('SECTORS/setList');
export const setSectorTitles = createAction('SECTORS/setSectorTitles');
export const setSelectedSector = createAction('SECTORS/setSelectedSector');
export const setSelectedLayer = createAction('SECTORS/setSelectedLayer');
export const setListLoading = createAction('SECTORS/setListLoading');
export const setListError = createAction('SECTORS/setListError');

export const fetchSectors = createThunkAction('SECTORS/fetchSectors', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().common;

  dispatch(setListLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://ikerey.carto.com/api/v2/sql?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=9DwNIFD_vTbtO5no55TZog`)
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
          count: Numeral(row.count).format('0,0'),
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: '#gadm28_adm1{  polygon-fill: #3bb2d0;  polygon-opacity: 0;  line-color: #5CA2D1;  line-width: 0.5;  line-opacity: 1;}',
                    sql: `SELECT st_asgeojson(the_geom), iso, sector, type FROM fsp_maps WHERE iso = '${iso}' AND sector in ('${row.sector}') AND type in ('${row.type}') ORDER BY sector, type`
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
                color: '#5CA2D1'
              }
            ]
          },
          interactionConfig: {}
        }
      ));
      const sectorTitles = uniq(dataRows.map(row => (
        row.sector
      )));

      dispatch(setList(dataRows));
      dispatch(setSectorTitles(sectorTitles));
    })
    .catch((err) => {
      dispatch(setListLoading(false));
      dispatch(setListError(err));
    });
});

export default { fetchSectors };
