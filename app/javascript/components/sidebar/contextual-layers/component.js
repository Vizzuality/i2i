import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import List from 'components/list';

class ContextualLayersComponent extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    layersSettings: PropTypes.object.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired
  }

  handleSelectedContextualLayer(contextualLayer) {
    const layers = [...this.props.selectedLayers];
    const layersSettings = { ...this.props.layersSettings };
    const { id } = contextualLayer;

    if (layers.includes(id)) {
      layers.splice(layers.indexOf(id), 1);
      delete layersSettings[id];
    } else {
      layers.unshift(id.toString());
      layersSettings[id] = {
        ...layersSettings[id],
        visibility: true,
        opacity: 1
      };
    }

    this.props.setLayersSettings(layersSettings);
    this.props.setLayersSelected(layers);
  }

  render() {
    const { list } = this.props;

    return (
      <div className="c-contextual-layers">
        <List
          rows={list.filter(l => l.layerType === 'contextual')}
          labelField="name"
          onSelect={contextualLayer => this.handleSelectedContextualLayer(contextualLayer)}
        />
      </div>
    );
  }
}

export default ContextualLayersComponent;
