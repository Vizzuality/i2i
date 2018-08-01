import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';

// components
import List from 'components/list';

// styles
import './styles.scss';

class SectorsComponent extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    layersSettings: PropTypes.array.isRequired,
    selectedSector: PropTypes.string.isRequired,
    setSelectedSector: PropTypes.func.isRequired,
    setSelectedLayersSectors: PropTypes.func.isRequired,
    setlayersSettings: PropTypes.func.isRequired
  }

  clickSector(sector) {
    this.props.setSelectedSector(sector);
  }

  handleSelectedType(sectorLayer) {
    const layers = [...this.props.selectedLayers];
    const id = sectorLayer.type_id;

    if (layers.includes(id)) {
      const layersSettings = { ...this.props.layersSettings };
      layers.splice(layers.indexOf(id), 1);

      layersSettings[id] =
        { ...layersSettings[id], visibility: true, opacity: 1 };

      this.props.setlayersSettings(layersSettings);
    } else {
      layers.push(id);
    }

    this.props.setSelectedLayersSectors(layers);
  }

  render() {
    const { list, selectedSector } = this.props;

    const filteredSectorsData = list.filter(sectorDatum => sectorDatum.sector === selectedSector);

    return (
      <div className="c-sectors">
        {
          (uniq(list.map(sectorData => (sectorData.sector)))).map(sectorTitle => (
            <button
              key={sectorTitle}
              onClick={() => this.clickSector(sectorTitle)}
            >
              {sectorTitle}
            </button>
          ))
        }

        <List
          rows={filteredSectorsData}
          labelField="type"
          onSelect={row => this.handleSelectedType(row)}
        />
      </div>
    );
  }
}

export default SectorsComponent;
