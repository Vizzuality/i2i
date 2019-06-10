import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Map, { MapControls, ZoomControl } from 'wri-api-components/dist/map';
import { LayerManager, Layer } from 'layer-manager/lib/react';
import { PluginLeaflet } from 'layer-manager';

import 'components/map/styles.scss';
import { BASEMAPS, LABELS } from 'components/map/constants';

// components
import Popup from './popup';
import BasemapControl from './controls/basemap';

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
    setZoom: PropTypes.func.isRequired,
    currentLayer: PropTypes.object
  };

  static defaultProps = { currentLayer: null };

  render() {
    const { open, zoom, center, basemap, label, activeLayers, bbox, currentLayer } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open,
      'c-spinning-loading': currentLayer.isLoading
    });

    if (currentLayer.data) {
      currentLayer.data.layerConfig.options = {
        pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng, {
          radius: 8,
          fillColor: geoJsonPoint.properties.color,
          fillOpacity: 1,
          color: 'white',
          weight: 2
        })
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
                  const datasetLayer = currentLayer.data ? [currentLayer.data] : [];

                  return [...activeLayers, ...datasetLayer].map((layer, index) => (
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
        {/* <Legend /> */}
      </div>
    );
  }
}

export default MapComponent;
