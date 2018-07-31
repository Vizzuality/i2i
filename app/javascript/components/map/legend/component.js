import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Legend, LegendListItem, LegendItemToolbar, LegendItemTypes } from 'wri-api-components';

// styles
import './styles.scss';

class LegendComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    activeLayerGroups: PropTypes.array.isRequired
  }

  render() {
    const { open, activeLayerGroups } = this.props;

    const classNames = classnames({
      'c-legend': true,
      '-open': !!open
    });

    return (
      <div className={classNames}>
        <Legend
          layerGroups={activeLayerGroups}
        >
          {activeLayerGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={
                <LegendItemToolbar />
              }
            >
              <LegendItemTypes />
            </LegendListItem>
          ))}
        </Legend>
      </div>
    );
  }
}

export default LegendComponent;
