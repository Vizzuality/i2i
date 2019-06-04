import React from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

// Components
import Icons from 'wri-api-components/dist/icons';
import SidebarComponent from './sidebar';
import Map from './map_preview';

import './styles.scss';


export default class Datasets extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    shortIso: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired,
    layers: PropTypes.object.isRequired,
    bbox: PropTypes.array.isRequired,
    datasets: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    latestYear: PropTypes.number,
    setIso: PropTypes.func.isRequired,
    setShortIso: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired,
    setLatestyear: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired
  };

  static defaultProps = { latestYear: null }

  componentWillMount() {
    const { iso, shortIso, bbox, latestYear, setDatasets, datasets } = this.props;

    // LOCATION PARAMS
    const { location } = window;
    const {
      lat,
      lng,
      zoom,
      layers
    } = qs.parse(location.search);

    // this.props.setIso(iso);
    // this.props.setShortIso(shortIso);
    // this.props.setLatestyear(latestYear);

    // Fetch
    setDatasets(datasets);
    // this.props.fetchWidgets();
    // this.props.fetchJurisdictions();

    // if (
    //   typeof zoom === 'undefined' &&
    //   typeof lat === 'undefined' &&
    //   typeof lng === 'undefined'
    // ) {
    //   this.props.setBBox(bbox);
    // }

    if (typeof zoom !== 'undefined') this.props.setZoom(+zoom);
    if (typeof lat !== 'undefined' && typeof lng !== 'undefined') this.props.setCenter({ lat: +lat, lng: +lng });
    // if (typeof layers !== 'undefined') {
    //   try {
    //     const layerGroups = JSON.parse(layers);

    //     const parsedLayerGroups = layerGroups.reduce((acc, lg) => ({
    //       ...acc,
    //       [lg.id]: lg
    //     }), {});

    //     this.props.setLayersSettings(parsedLayerGroups);
    //     this.props.setLayersSelected(layerGroups.map(lg => lg.id));
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
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
        <div className="fsp-maps-tool">
          <SidebarComponent
            open
            datasets={this.props.datasets}
            categories={this.props.categories}
            countries={this.props.countries}
          />
          <Map />
          <Icons />
        </div>
      </div>
    );
  }
}
