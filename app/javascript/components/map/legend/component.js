import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonRemove
} from 'wri-api-components';

// styles
import './styles.scss';

class LegendComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    activeLayerGroups: PropTypes.array.isRequired,
    selectedSectorLayers: PropTypes.array.isRequired,
    selectedContextualLayers: PropTypes.array.isRequired,
    setSelectedSectorLayers: PropTypes.func.isRequired,
    setSelectedContextualLayers: PropTypes.func.isRequired
  }

  onRemoveLayer = (l) => {
    if (l.type_id) {
      const selectedLayers = [...this.props.selectedSectorLayers];
      const index = selectedLayers.indexOf(l.type_id);
      selectedLayers.splice(index, 1);

      this.props.setSelectedSectorLayers(selectedLayers);
    } else {
      const selectedLayers = [...this.props.selectedContextualLayers];
      const index = selectedLayers.indexOf(l.cartodb_id);
      selectedLayers.splice(index, 1);

      this.props.setSelectedContextualLayers(selectedLayers);
    }
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
          maxHeight={300}
          layerGroups={activeLayerGroups}
        >
          {activeLayerGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={
                <LegendItemToolbar>
                  <LegendItemButtonLayers />
                  <LegendItemButtonOpacity />
                  <LegendItemButtonVisibility />
                  <LegendItemButtonRemove />
                </LegendItemToolbar>
              }
              onRemoveLayer={this.onRemoveLayer}
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
