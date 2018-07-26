import { createAction } from 'redux-tools';

export const setIso = createAction('COMMON/setIso');
export const setBBox = createAction('COMMON/setBBox');

export default {
  setIso,
  setBBox
};
