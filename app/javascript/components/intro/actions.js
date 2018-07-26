import { createAction, createThunkAction } from 'redux-tools';
import Numeral from 'numeral';

// SQL
import INTRO_SQL from './sql/intro.sql';

export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');

export const fetchIntro = createThunkAction('INTRO/fetchIntro', () => (dispatch, getState) => {
  const { replace } = window.App.Helper.Utils;
  const { iso } = getState().common;

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

export default { setIntro };
