import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import List from 'components/list';

class ContextualLayersComponent extends React.Component {
  static propTypes = {
    setSelectedLayers: PropTypes.func.isRequired,
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
