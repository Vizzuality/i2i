import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import List from 'components/list';

class ContextualLayersComponent extends React.Component {
  static propTypes = {
    fetchContextualLayers: PropTypes.func.isRequired,
    setSelectedLayers: PropTypes.func.isRequired,
    contextualLayerTitles: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired
  }

  handleSelectedContextualLayer(contextualLayer) {
    let layers = this.props.selectedLayers;
    const id = contextualLayer.id;

    if (layers.includes(id)) {
      layers.splice(layers.indexOf(id), 1);
    } else {
      layers = layers.concat([id]);
    }

    this.props.setSelectedLayers(layers);
  }

  render() {
    const { contextualLayerTitles } = this.props;
    // const classNames = classnames({
    //   'c-sidebar': true,
    //   '-open': !!open
    // });

    return (
      <div className="c-contextual-layers">
        <List
          rows={contextualLayerTitles}
          labelField="layer"
          onSelect={contextualLayer => this.handleSelectedContextualLayer(contextualLayer)}
        />
      </div>
    );
  }
}

export default ContextualLayersComponent;
