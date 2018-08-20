export const DRAWING_CONTROLS_OPTIONS = {
  position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
  drawMarker: false, // adds button to draw markers
  drawPolyline: false, // adds button to draw a polyline
  drawRectangle: false, // adds button to draw a rectangle
  drawPolygon: true, // adds button to draw a polygon
  drawCircle: false, // adds button to draw a cricle
  cutPolygon: false, // adds button to cut a hole in a polygon
  editMode: true, // adds button to toggle edit mode for all layers
  removalMode: true // adds a button to remove layers
};

export const DRAWING_OPTIONS = { cursorMarker: true };

export default {
  DRAWING_CONTROLS_OPTIONS,
  DRAWING_OPTIONS
};
