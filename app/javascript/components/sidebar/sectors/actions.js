import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';
import uniq from 'lodash/uniq';

// SQL
import SECTORS_SQL from './sql/sectors.sql';

export const setSectors = createAction('SECTORS/setSectors');
export const setSectorTitles = createAction('SECTORS/setSectorTitles');
export const setSelectedSector = createAction('SECTORS/setSelectedSector');
export const setSelectedType = createAction('SECTORS/setSelectedType');
export const setSectorsLoading = createAction('SECTORS/setSectorsLoading');
export const setSectorsError = createAction('SECTORS/setSectorsError');

export const fetchSectors = createThunkAction('SECTORS/fetchSectors', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().common;

  dispatch(setSectorsLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  return fetch(`https://fsp-maps.carto.com/api/v2/sql?q=${encodeURIComponent(replace(SECTORS_SQL, { iso }))}&api_key=8kFyv1NsG2qllfDd972LJQ`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setSectorsLoading(false));
      dispatch(setSectorsError(null));
      const dataRows = data.rows.map(row => (
        {
          ...row,
          count: Numeral(row.count).format('0,0')
        }
      ));
      const sectorTitles = uniq(dataRows.map(row => (
        row.sector
      )));

      dispatch(setSectors(dataRows));
      dispatch(setSectorTitles(sectorTitles));
    })
    .catch((err) => {
      dispatch(setSectorsLoading(false));
      dispatch(setSectorsError(err));
    });
});

export default { fetchSectors };
