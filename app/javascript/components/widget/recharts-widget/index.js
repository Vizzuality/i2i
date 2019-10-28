import { connect } from 'react-redux';
// import {  } from '';
// import {  } from '';
import Component from './component';

const mapStateToProps = state => ({
  widgetsList: state.fspMaps.widgets.list,
  analysisType: state.fspMaps.analysis
  // currentLocation: currentLocation(state),
  // highlightedPlaces: highlightedPlaces(state),
  // locations: state.locations.list
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
