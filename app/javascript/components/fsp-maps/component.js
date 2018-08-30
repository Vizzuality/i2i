import React from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';


import qs from 'query-string';

// Components
import Intro from 'components/intro';
import Sidebar from 'components/sidebar';
import Map from 'components/map';
import Widget from 'components/widget';
import PreFooter from 'components/pre-footer';
import { Icons } from 'wri-api-components';

import './styles.scss';

export default class FSPMaps extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    shortIso: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    layers: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    setIso: PropTypes.func.isRequired,
    setShortIso: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired,
    fetchLayers: PropTypes.func.isRequired,
    fetchWidgets: PropTypes.func.isRequired,
    fetchJurisdictions: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { iso, shortIso, bbox } = this.props;

    // LOCATION PARAMS
    const { location } = window;
    const {
      lat,
      lng,
      zoom,
      layers
    } = qs.parse(location.search);

    this.props.setIso(iso);
    this.props.setShortIso(shortIso);

    // Fetch
    this.props.fetchLayers();
    this.props.fetchWidgets();
    this.props.fetchJurisdictions();

    if (
      typeof zoom === 'undefined' &&
      typeof lat === 'undefined' &&
      typeof lng === 'undefined'
    ) {
      this.props.setBBox(bbox);
    }

    if (typeof zoom !== 'undefined') this.props.setZoom(+zoom);
    if (typeof lat !== 'undefined' && typeof lng !== 'undefined') this.props.setCenter({ lat: +lat, lng: +lng });
    if (typeof layers !== 'undefined') {
      try {
        const layerGroups = JSON.parse(layers);

        const parsedLayerGroups = layerGroups.reduce((acc, lg) => ({
          ...acc,
          [lg.id]: lg
        }), {});

        this.props.setLayersSettings(parsedLayerGroups);
        this.props.setLayersSelected(layerGroups.map(lg => lg.id));
      } catch (error) {
        console.error(error);
      }
    }
  }

  componentDidUpdate() {
    const { location, history } = window;

    const { map, layers } = this.props;

    const layerGroups = layers.selectedLayers.map(l => ({
      id: l,
      opacity: layers.layersSettings[l].opacity,
      visibility: layers.layersSettings[l].visibility,
      visualizationType: layers.layersSettings[l].visualizationType
    }));

    const search = qs.stringify({
      zoom: map.zoom,
      lat: map.center.lat,
      lng: map.center.lng,
      ...!!layerGroups.length && { layers: JSON.stringify(layerGroups) }
    });

    // Replace url
    history.replaceState({}, 'fsp-maps', `${location.pathname}?${search}`);
  }

  render() {
    return (
      <div className="c-fsp-maps">
        <Intro />

        <div className="fsp-maps-tool">
          <Sidebar />
          <Map />
          <Icons />
        </div>
        <PreFooter />
      </div>
    );
  }
}
