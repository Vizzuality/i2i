import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import List from 'components/list';

// styles
import './styles.scss';

class SectorsComponent extends PureComponent {
  static propTypes = {
    sectors: PropTypes.array.isRequired,
    selectedSector: PropTypes.string,
    layersBySector: PropTypes.array,
    selectedLayers: PropTypes.array.isRequired,
    layersSettings: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    setLayersSectorSelected: PropTypes.func.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectedSector: null,
    layersBySector: []
  }

  onSelectLayer = row => this.handleSelectedType(row)

  clickSector(sector) {
    const { selectedSector, setLayersSectorSelected } = this.props;
    const nextSector = sector === selectedSector ? null : sector;
    setLayersSectorSelected(nextSector);
  }

  handleSelectedType(sectorLayer) {
    const { layersBySector } = this.props;
    const layers = [...this.props.selectedLayers];
    const layersSettings = { ...this.props.layersSettings };
    const { id, sector, category } = sectorLayer;

    // Disable all layers if you activate the parent
    if (category === 'all' && !layers.includes(id)) {
      const filteredLayers = layersBySector.filter(l => l.sector === sector);
      filteredLayers.forEach((l) => {
        if (layers.includes(l.id)) {
          layers.splice(layers.indexOf(l.id), 1);
          delete layersSettings[l.id];
        }
      });
    }

    // Disable parent layer if you activate any child
    if (category !== 'all' && !layers.includes(id)) {
      const parent = layersBySector.find(l => l.sector === sector && l.category === 'all');
      if (parent && layers.includes(parent.id)) {
        layers.splice(layers.indexOf(parent.id), 1);
        delete layersSettings[parent.id];
      }
    }

    // Handle the one you clicked
    if (layers.includes(id)) {
      layers.splice(layers.indexOf(id), 1);
      delete layersSettings[id];
    } else {
      layers.unshift(id.toString());
      layersSettings[id] = {
        ...layersSettings[id],
        visibility: true,
        opacity: 1,
        visualizationType: 'normal'
      };
    }

    this.props.setLayersSettings(layersSettings);
    this.props.setLayersSelected(layers);
  }

  render() {
    const {
      sectors,
      selectedSector,
      layersBySector,
      setModal
    } = this.props;

    return (
      <div className="c-sectors">
        {
          (sectors.map(sectorTitle => (
            <Fragment key={sectorTitle}>
              <div className={classnames('sectors-list', { '-open': selectedSector === sectorTitle })}>
                <button onClick={() => this.clickSector(sectorTitle)}>
                  {sectorTitle}
                </button>
              </div>
              {!!layersBySector.length &&
                selectedSector === sectorTitle &&
                  <List
                    rows={layersBySector}
                    labelField="name"
                    onSelect={this.onSelectLayer}
                    onClickInfo={e => setModal({ open: true, options: e })}
                  />}
            </Fragment>
          )))
        }
      </div>
    );
  }
}

export default SectorsComponent;
