import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Map } from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

// styles
import './styles.scss';

class SidebarComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    activeLayers: PropTypes.array.isRequired
  }

  render() {
    const { open, activeLayers } = this.props;

    const classNames = classnames({
      'c-map': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Map>
          {map => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {
                  activeLayers.map((layer, index) =>
                    <Layer {...layer} zIndex={1000 - index} />)
                }
              </LayerManager>
            </React.Fragment>
            )}
        </Map>
      </div>
    );
  }
}

export default SidebarComponent;
