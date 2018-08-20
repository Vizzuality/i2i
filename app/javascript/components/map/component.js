import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Map, MapControls, ZoomControl } from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

// components
import Legend from 'components/map/legend';
import Popup from 'components/map/popup';
import DrawingManager from 'components/map/drawing-manager';
import BasemapControl from 'components/map/controls/basemap';
import ShareControl from 'components/map/controls/share';

import { BASEMAPS, LABELS, COUNTRY_MASK } from './constants';

// styles
import './styles.scss';

class MapComponent extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    basemap: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    zoom: PropTypes.number.isRequired,
    open: PropTypes.bool.isRequired,
    drawing: PropTypes.bool.isRequired,
    center: PropTypes.object.isRequired,
    area: PropTypes.object.isRequired,
    activeLayers: PropTypes.array.isRequired,
    bbox: PropTypes.array.isRequired,
    setInteractions: PropTypes.func.isRequired,
    setCenter: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired
  }

  render() {
    const { open, zoom, center, basemap, label, activeLayers, bbox, area } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

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
                  const countryMask = [{
                    ...COUNTRY_MASK,
                    params: { iso: this.props.iso },
                    zIndex: 1001,
                    layerManager
                  }];

                  const nearbyArea = area.features ? [{
                    id: 'nearby',
                    provider: 'leaflet',
                    layerConfig: {
                      body: area.features,
                      type: 'geoJSON'
                    }
                  }] : [];

                  return [...countryMask, ...nearbyArea, ...activeLayers].map((layer, index) => (
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

                            this.props.setInteractions({
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
