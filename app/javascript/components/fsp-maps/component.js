import React from 'react';
import PropTypes from 'prop-types';

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
    map: PropTypes.object.isRequired,
    iso: PropTypes.string.isRequired,
    shortIso: PropTypes.string.isRequired,
    bbox: PropTypes.array.isRequired,
    setIso: PropTypes.func.isRequired,
    setShortIso: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { iso, shortIso, bbox } = this.props;

    // LOCATION PARAMS
    const { location } = window;
    const {
      lat,
      lng,
      zoom
    } = qs.parse(location.search);

    this.props.setIso(iso);
    this.props.setShortIso(shortIso);

    if (
      typeof zoom === 'undefined' &&
      typeof lat === 'undefined' &&
      typeof lng === 'undefined'
    ) {
      this.props.setBBox(bbox);
    }

    if (typeof zoom !== 'undefined') this.props.setZoom(+zoom);
    if (typeof lat !== 'undefined' && typeof lng !== 'undefined') this.props.setCenter({ lat: +lat, lng: +lng });
  }

  componentDidUpdate() {
    const { location, history } = window;

    const { map } = this.props;

    const search = qs.stringify({
      zoom: map.zoom,
      lat: map.center.lat,
      lng: map.center.lng
    });

    // Replace url
    history.replaceState({}, 'fsp-maps', `${location.pathname}?${search}`);
  }

  render() {
    return (
      <div className="c-fsp-maps">
        <Intro />

        <Widget />

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
