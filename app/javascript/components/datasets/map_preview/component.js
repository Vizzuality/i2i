import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import Map, { MapControls, ZoomControl } from 'wri-api-components/dist/map';
import { LayerManager, Layer } from 'layer-manager/lib/react';
import { PluginLeaflet } from 'layer-manager';

// components
import Popup from './popup';
import BasemapControl from './controls/basemap';

// Images
import BookIcon from 'images/data-portal/book.svg';

import { BASEMAPS, LABELS, FINANCIAL_DIARIES_MARKERS } from 'components/map/constants';

// styles
import 'components/map/styles.scss';

class MapComponent extends React.Component {
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
    const { open, zoom, center, basemap, label, activeLayers, bbox, menuItem, selected: selectedTab, currentLayer } = this.props;
    const { area: nearbyArea, time: nearbyTime } = this.props.nearby;
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

    if (currentLayer) {
      currentLayer.layerConfig.options = {
        pointToLayer: (geoJsonPoint, latlng) => {
          return L.marker(latlng);
        }
      };
    }

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
            zoomend: (e, map) => { this.props.setZoom(map.getZoom()); },
            moveend: (e, map) => { this.props.setCenter(map.getCenter()); }
          }}
          scrollZoomEnabled={false}
          customClass="custom-map"
        >
          {map => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {(layerManager) => {
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

                  const datasetLayer = currentLayer ? [currentLayer] : [];

                  return [...activeLayers, ...financialIconsLayer, ...datasetLayer].map((layer, index) => (
                    <Layer
                      key={layer.id}
                      {...layer}
                      zIndex={1000 - index}
                      layerManager={layerManager}
                      {...(layer.layerType === 'sector') && {
                        interactivity: layer.interactivity,
                        events: {
                          click: (e) => {
                            const { sourceTarget, target, ...info } = e;

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
                  ));
                }}
              </LayerManager>

              <MapControls customClass="custom-container-map-controls">
                <ZoomControl
                  map={map}
                  customClass="custom-map-controls"
                />

                <div className="custom-map-controls">
                  <BasemapControl />
                </div>
              </MapControls>

              <Popup
                map={map}
              />

            </React.Fragment>
            )}
        </Map>
        {/*<Legend />*/}
      </div>
    );
  }
}

export default MapComponent;