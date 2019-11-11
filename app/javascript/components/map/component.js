import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

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
import Pin from 'components/icons/SVG/pin.svg';

import { BASEMAPS, LABELS, FINANCIAL_DIARIES_MARKERS, NEARBY_MARKER } from './constants';

// styles
import './styles.scss';
import { fetchNearbyArea } from '../datasets/actions';

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
    bbox: PropTypes.array.isRequired,
    setLayersInteractions: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired
  }

  render() {
    const { open, zoom, center, basemap, label, activeLayers, bbox, menuItem, selected: selectedTab, nearby, setNearby, setLatLng, setNearbyCenter, fetchNearbyArea, center: coordinates } = this.props;
    const { area: nearbyArea, time: nearbyTime, pin } = this.props.nearby;
    const { area: jurisdictionArea } = this.props.jurisdiction;

    const polygonAreaStyle = {
      color: '#2F939C',
      fillColor: '#2F939C',
      fillOpacity: 0.5
    };

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    const nearbyAreaLayer = (!isEmpty(nearbyArea) && menuItem === 'nearby' && selectedTab === 'analysis') ? [{
      id: 'nearby',
      provider: 'leaflet',
      layerConfig: {
        body: nearbyArea,
        type: 'geoJSON',
        options: { style: polygonAreaStyle }
      }
    }] : [];

    const patternsIconsLayer = (!!coordinates && menuItem === 'analyze-patterns' && selectedTab === 'analysis') ? [{
      id: 'analyze-pattern-icons',
      provider: 'leaflet',
      layerConfig: {
        body: L.marker(
          coordinates,
          { icon: L.circle({ iconSize: [20, 20] }) }
        ),
        parse: false,
        type: 'featureGroup'
      }
    }] : [];

    const nearbyMarkerLayer = (!!coordinates && menuItem === 'nearby' && selectedTab === 'analysis') ? [{
      id: 'nearby-icons',
      provider: 'leaflet',
      layerConfig: {
        body: [L.marker(
          coordinates,
          {
            icon: L.icon({
              iconUrl: Pin,
              iconSize: [20, 20]
            })
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
        options: { style: polygonAreaStyle }
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
      ...nearbyAreaLayer,
      ...nearbyMarkerLayer,
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

              if (menuItem === 'nearby') {
                setNearbyCenter({ lat, lng });
                fetchNearbyArea();
              }
            },
            zoomend: (e, map) => { this.props.setZoom(map.getZoom()); },
            moveend: (e, map) => { this.props.setCenter(map.getCenter()); },
            click: (e) => {

            }
          }}
          scrollZoomEnabled={false}
          customClass="custom-map"
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
