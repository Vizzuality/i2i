import { createAction, createThunkAction } from 'redux-tools';

// Constants
import { INTRO_LABELS } from './constants';

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
  return fetch(`https://fsp-maps.carto.com/api/v2/sql?q=${encodeURIComponent(replace(INTRO_SQL, { iso }))}&api_key=API_KEY`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(setIntroLoading(false));
      dispatch(setIntroError(null));

      // dispatch(setIntro(data));
      dispatch(setIntro([
        { label: 'TOTAL POPULATION (2015)', percentage: null, value: '39,066,910' },
        { label: 'RURAL POPULATION PERCENTAGE', percentage: '87.2%', value: '28,010,974' },
        { label: 'TOTAL POPULATION WITHIN 5KM OF ALL ACESS POINTS', percentage: '71.7%', value: '28,010,974' },
        { label: 'URBAN POPULATION PERCENTAGE:', percentage: '12.8%', value: '28,010,974' }
      ]))

    })
    .catch((err) => {
      dispatch(setIntroLoading(false));
      dispatch(setIntroError(err));
    });

});

export default {
  setIntro
};
