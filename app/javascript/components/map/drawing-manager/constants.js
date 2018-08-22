export const DRAWING_STYLES = {
  color: 'red',
  fillColor: 'orange',
  fillOpacity: 0.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

export const DRAWING_OPTIONS = {
  snappable: true,
  // Styles
  templineStyle: {
    ...DRAWING_STYLES
  },
  hintlineStyle: {
    ...DRAWING_STYLES,
    dashArray: [5, 5],
  },
  pathOptions: DRAWING_STYLES,
  
  cursorMarker: true,
  markerStyle: {
    opacity: 0.5,
    draggable: false
  },

  finishOnDoubleClick: true
};

export default { DRAWING_OPTIONS };
