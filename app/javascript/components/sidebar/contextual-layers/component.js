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
    layersSettings: PropTypes.array.isRequired,
    setSelectedLayers: PropTypes.func.isRequired,
    setlayersSettings: PropTypes.func.isRequired
  }

  handleSelectedContextualLayer(contextualLayer) {
    const layers = [...this.props.selectedLayers];
    const { id } = contextualLayer;

    if (layers.includes(id)) {
      const layersSettings = { ...this.props.layersSettings };
      layers.splice(layers.indexOf(id), 1);

      layersSettings[id] =
        { ...layersSettings[id], visibility: true, opacity: 1 };

      this.props.setlayersSettings(layersSettings);
    } else {
      layers.push(id);
    }

    this.props.setSelectedLayers(layers);
  }

  render() {
    const { list } = this.props;

    return (
      <div className="c-contextual-layers">
        <List
          rows={list}
          labelField="name"
          onSelect={contextualLayer => this.handleSelectedContextualLayer(contextualLayer)}
        />
      </div>
    );
  }
}

export default ContextualLayersComponent;
