import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Tooltip } from 'wri-api-components';

import { BASEMAPS, LABELS } from 'components/map/constants';

import './styles.scss';

class BasemapControlComponent extends React.Component {
  static propTypes = {
    basemap: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    setBasemap: PropTypes.func.isRequired,
    setLabel: PropTypes.func.isRequired
  }

  getOverlay = () => {
    const { basemap, label } = this.props;

    return (
      <div className="c-basemap-control">
        <div className="control-container">
          <h4>Basemaps</h4>
          <ul className="basemap-control-list">
            {Object.keys(BASEMAPS).map((k) => {
              const selectedClassName = classnames({
                'list-item-button': true,
                '-selected': BASEMAPS[k].id === basemap
              });

              return (
                <li
                  key={BASEMAPS[k].id}
                  className="basemap-control-list-item"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className={selectedClassName}
                    onClick={() => this.props.setBasemap(BASEMAPS[k].id)}
                  >
                    {BASEMAPS[k].label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="control-container">
          <h4>Labels</h4>
          <ul className="basemap-control-list">
            {Object.keys(LABELS).map((k) => {
              const selectedClassName = classnames({
                'list-item-button': true,
                '-selected': LABELS[k].id === label
              });

              return (
                <li
                  key={LABELS[k].id}
                  className="basemap-control-list-item"
                >
                  <div
                    role="button"
                    tabIndex="0"
                    className={selectedClassName}
                    onClick={() => this.props.setLabel(LABELS[k].id)}
                  >
                    {LABELS[k].label}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Tooltip
        overlay={this.getOverlay()}
        overlayClassName="c-rc-tooltip -default"
        overlayStyle={{ color: '#fff' }}
        placement="leftTop"
        trigger={['click']}
        mouseLeaveDelay={0}
        destroyTooltipOnHide
      >
        <button>
          <svg className="icon icon-basemap"><use xlinkHref="#icon-basemap" /></svg>
        </button>
      </Tooltip>
    );
  }
}

export default BasemapControlComponent;
