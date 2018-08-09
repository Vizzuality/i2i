import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Map, MapControls, ZoomControl } from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

// components
import Legend from 'components/map/legend';
import Popup from 'components/map/popup';

// styles
import './styles.scss';

const COUNTRY_MASK = {
  id: 'country-mask',
  name: 'Country Mask',
  provider: 'carto',
  layerConfig: {
    account: 'ikerey',
    body: {
      maxzoom: 19,
      minzoom: 2,
      layers: [
        {
          type: 'cartodb',
          options: {
            sql: 'SELECT * FROM world_borders_hd',
            cartocss: "#layer{polygon-fill:#2f939c;polygon-opacity:.9;line-color:#2f939c;line-opacity:.1;line-width:0}#layer[iso_a3='{{iso}}']{polygon-fill:#FFF;polygon-opacity:0;line-opacity:1}",
            cartocss_version: '2.3.0'
          }
        }
      ]
    }
  },
  legendConfig: {},
  interactionConfig: {}
};

class MapComponent extends React.Component {
  static propTypes = {
    activeLayers: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    iso: PropTypes.string.isRequired,
    bbox: PropTypes.array.isRequired,
    setInteractions: PropTypes.func.isRequired
  }

  render() {
    const { open, bbox, activeLayers } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Map
          bounds={{
            bbox,
            options: {}
          }}
          scrollZoomEnabled={false}
        >
          {map => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                <Layer
                  {...COUNTRY_MASK}
                  key="country-mask"
                  params={{ iso: this.props.iso }}
                  zIndex={1001}
                />

                {
                  activeLayers.map((layer, index) =>
                    (<Layer
                      key={layer.id}
                      {...layer}
                      zIndex={1000 - index}
                      // Interaction
                      interactivity={['name', 'type']}
                      events={{
                        click: (e) => {
                          const { sourceTarget, target, ...info } = e;

                          this.props.setInteractions({
                            [layer.id]: {
                              ...info,
                              id: layer.id
                            }
                          });
                        }
                      }}
                    />))
                }
              </LayerManager>

              <MapControls>
                <ZoomControl map={map} />
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
