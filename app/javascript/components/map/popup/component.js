import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { MapPopup } from 'wri-api-components';

// styles
// import './styles.scss';

class PopupComponent extends React.Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    interaction: PropTypes.object
    // data: PropTypes.object.isRequired,
    // onClickInfo: PropTypes.func
  }

  static defaultProps = {
    interaction: null
    // onClickInfo: null
  }

  render() {
    const { map, interaction } = this.props;
    const { data, latlng } = interaction || {};
    const { name, type } = data || {};

    return (
      <div className="c-map-popup">
        <MapPopup
          map={map}
          latlng={data ? latlng : null}
          data={data}
        >
          <table>
            <tbody>
              {!!name &&
              <tr>
                <td>
                  Name
                </td>
                <td>
                  {name}
                </td>
              </tr>}
              {!!type &&
              <tr>
                <td>
                  Type
                </td>
                <td>
                  {type}
                </td>
              </tr>}
            </tbody>
          </table>
        </MapPopup>
      </div>
    );
  }
}

export default PopupComponent;
