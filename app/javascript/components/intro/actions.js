import { createAction, createThunkAction } from 'redux-tools';

export const setIntro = createAction('INTRO/setIntro');
export const setIntroLoading = createAction('INTRO/setIntroLoading');
export const setIntroError = createAction('INTRO/setIntroError');

export const fetchIntro = createThunkAction('INTRO/fetchIntro', () => (dispatch) => {
  dispatch(setIntroLoading(true));

  // return fetch(new Request(`${process.env.API_URL}/`))
  //   .then((response) => {
  //     if (response.ok) return response.json();
  //     throw new Error(response.statusText);
  //   })
  //   .then((data) => {
  //     dispatch(setIntroLoading(false));
  //     dispatch(setIntroError(null));

  //     dispatch(setIntro(data));
  //   })
  //   .catch((err) => {
  //     dispatch(setIntroLoading(false));
  //     dispatch(setIntroError(err));
  //   });

  dispatch(setIntro([{ label: 'TOTAL POPULATION (2015)', percentage: null, value: '39,066,910' },
                     { label: 'RURAL POPULATION PERCENTAGE', percentage: '87.2%', value: '28,010,974' },
                     { label: 'TOTAL POPULATION WITHIN 5KM OF ALL ACESS POINTS', percentage: '71.7%', value: '28,010,974' },
                     { label: 'URBAN POPULATION PERCENTAGE:', percentage: '12.8%', value: '28,010,974' }]))
});

export default {
  setIntro
};
