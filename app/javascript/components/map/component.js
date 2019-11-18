import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import Map, { MapControls, ZoomControl } from 'wri-api-components/dist/map';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';

// components
import Legend from 'components/map/legend';
import Popup from 'components/map/popup';
import DrawingManager from 'components/map/drawing-manager';
import BasemapControl from 'components/map/controls/basemap';
import ShareControl from 'components/map/controls/share';


// Images and icons
import BookIcon from 'images/data-portal/book.svg';

import { BASEMAPS, LABELS, FINANCIAL_DIARIES_MARKERS } from './constants';

// styles
import './styles.scss';

import { togglePinDrop } from '../fsp-maps/actions';

const POLYGON_AREA_STYLE = {
  color: '#2F939C',
  fillColor: '#2F939C',
  fillOpacity: 0.5
};

class MapComponent extends PureComponent {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    basemap: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    menuItem: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    areaOfInterest: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    nearby: PropTypes.object.isRequired,
    jurisdiction: PropTypes.object.isRequired,
    activeLayers: PropTypes.array.isRequired,
    active: PropTypes.bool.isRequired,
    bbox: PropTypes.array.isRequired,
    setLayersInteractions: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { nearby, menuItem, selected: selectedTab } = this.props;
    const { nearby: prevNearby } = prevProps;

    const { area: nearbyArea, pin, center } = nearby;
    const { area: prevNearbyArea, center: prevCenter } = prevNearby;

    const { active } = pin;

    // NEARBY
    // This is something that I'm not proud of but it was impossible to add the new Layer Manager
    if (!isEmpty(nearbyArea) && !isEqual(nearbyArea, prevNearbyArea) && active && menuItem === 'nearby' && selectedTab === 'analysis') {
      if (this.nearbyAreaLayer) {
        this.map.removeLayer(this.nearbyAreaLayer);
      }

      this.nearbyAreaLayer = L.featureGroup([
        L.geoJSON(nearbyArea, { style: () => POLYGON_AREA_STYLE })
      ]);

      this.nearbyAreaLayer.setStyle(POLYGON_AREA_STYLE);

      this.map.addLayer(this.nearbyAreaLayer);
    }

    if (!!center && !isEqual(center, prevCenter) && active && menuItem === 'nearby' && selectedTab === 'analysis') {
      if (this.nearbyMarkerLayer) {
        this.map.removeLayer(this.nearbyMarkerLayer);
      }

      this.nearbyMarkerLayer = L.featureGroup([
        L.circleMarker(
          center,
          {
            color: '#f9d031',
            radius: 5
          }
        )
      ]);

      this.map.addLayer(this.nearbyMarkerLayer);
    }

    if (!active || menuItem !== 'nearby' || selectedTab !== 'analysis') {
      if (this.nearbyAreaLayer) { this.map.removeLayer(this.nearbyAreaLayer); }
      if (this.nearbyMarkerLayer) { this.map.removeLayer(this.nearbyMarkerLayer); }
    }
  }

  render() {
    const { open, zoom, center, basemap, label, activeLayers, bbox, menuItem, selected: selectedTab, nearby, setNearbyCenter, fetchNearbyArea } = this.props;
    const { pin, center: coordinates } = nearby;
    const { active } = pin;
    const { area: jurisdictionArea } = this.props.jurisdiction;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    const patternsIconsLayer = (!!coordinates && menuItem === 'analyze_patterns' && selectedTab === 'analysis') ? [{
      id: 'analyze-pattern-icons',
      provider: 'leaflet',
      layerConfig: {
        body: [L.circleMarker(
          coordinates,
          {
            color: '#f9d031',
            radius: 20
          }
        )],
        parse: false,
        type: 'featureGroup'
      }
    }] : [];


    const jurisdictionAreaLayer = (!isEmpty(jurisdictionArea) && menuItem === 'jurisdiction' && selectedTab === 'analysis') ? [{
      id: 'jurisdiction',
      provider: 'leaflet',
      layerConfig: {
        body: jurisdictionArea,
        type: 'geoJSON',
        options: { style: POLYGON_AREA_STYLE }
      }
    }] : [];

    const financialIconsLayer = [{
      id: 'financial-icons',
      provider: 'leaflet',
      layerConfig: {
        body: FINANCIAL_DIARIES_MARKERS.map(m => L.marker(
          m.coordinates,
          {
            ...m.options,
            icon: L.icon({
              iconUrl: BookIcon,
              iconSize: [16, 16]
            })
          }
        )
          .on('click', () => window.open(m.url))),
        parse: false,
        type: 'featureGroup'
      }
    }];
    const layersResult = [
      ...jurisdictionAreaLayer,
      ...activeLayers,
      ...financialIconsLayer,
      ...patternsIconsLayer
    ];

    return (
      <div className={classNames}>
        <Map
          mapOptions={{
            zoom,
            center
          }}
          basemap={{
            url: BASEMAPS[basemap].value,
            options: BASEMAPS[basemap].options
          }}
          label={{
            url: LABELS[label].value,
            options: LABELS[label].options
          }}
          {...!!bbox && !!bbox.length && {
            bounds: {
              bbox,
              options: {}
            }
          }}
          events={{
            click: (e) => {
              const { lat, lng } = e.latlng;
              const { setCenter } = this.props;
              const nearbyIcon = layersResult.filter(layer => layer.id === 'nearby-icons');

              setCenter(coordinates);
              if (menuItem === 'nearby') {
                Promise.all([
                  setNearbyCenter({ lat, lng })
                ])
                  .then(() => { fetchNearbyArea(); });
              }
              if (active && !nearbyIcon) {
                togglePinDrop({ ...pin, dropped: true });
              } else if (active && nearbyIcon) {
                togglePinDrop({ ...pin, dropped: false });
              }
            },
            zoomend: (e, map) => { this.props.setZoom(map.getZoom()); },
            moveend: (e, map) => { this.props.setCenter(map.getCenter()); }
          }}
          scrollZoomEnabled={false}
          customClass="custom-map"
          onReady={(map) => { this.map = map; }}
        >
          {map => map.invalidateSize() && (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {
                  layersResult.map((layer, index) => (
                    <Layer
                      key={layer.isUserDataset ? `fsp_maps_user_${layer.id}` : `fsp_maps_${layer.id}`}
                      {...layer}
                      zIndex={1000 - index}
                      {...(layer.layerType === 'sector') && {
                        interactivity: layer.interactivity,
                        events: {
                          click: (e) => {
                            const { ...info } = e;

                            this.props.setLayersInteractions({
                              [layer.id]: {
                                ...info,
                                id: layer.id
                              }
                            });
                          }
                        }
                      }}
                    />
                  ))
                }
              </LayerManager>

              <DrawingManager map={map} />

              <MapControls customClass="custom-container-map-controls">
                <ZoomControl
                  map={map}
                  customClass="custom-map-controls"
                />

                <div className="custom-map-controls">
                  <BasemapControl />
                  <ShareControl />
                </div>
              </MapControls>

              <Popup
                map={map}
              />

            </React.Fragment>
          )}
        </Map>
        <Legend />
      </div>
    );
  }
}

export default MapComponent;
