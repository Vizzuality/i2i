import { createAction } from 'redux-tools';

export const setOpen = createAction('LEGEND/setOpen');
export const setlayersSettings = createAction('LEGEND/setlayersSettings');

export default { setOpen, setlayersSettings };
