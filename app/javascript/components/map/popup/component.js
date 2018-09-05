import React from 'react';
import PropTypes from 'prop-types';

import { MapPopup } from 'wri-api-components';

import './styles.scss';

class PopupComponent extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    interaction: PropTypes.object
  }

  static defaultProps = { interaction: null }

  render() {
    const { map, interaction } = this.props;
    const { data, latlng } = interaction || {};
    const { name, type } = data || {};

    return (
      <MapPopup
        map={map}
        latlng={data ? latlng : null}
        data={data}
      >
        <div className="c-map-popup">
          <div className="popup-content">
            <table className="popup-table">
              <tbody>
                {!!type &&
                  <tr
                    className="dc"
                    key={type}
                  >
                    <td className="dt">
                    Type:
                    </td>
                    <td className="dd">{type}</td>
                  </tr>
                }
                {!!name &&
                  <tr
                    className="dc"
                    key={name}
                  >
                    <td className="dt">
                      Name:
                    </td>
                    <td className="dd">{name}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </MapPopup>
    );
  }
}

export default PopupComponent;
