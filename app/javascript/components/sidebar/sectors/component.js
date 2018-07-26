import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';

// components
import List from 'components/list';

// styles
import './styles.scss';

class SectorsComponent extends React.Component {
  static propTypes = {
    setSelectedSector: PropTypes.func.isRequired,
    setSelectedLayers: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    selectedSector: PropTypes.string.isRequired
  }

  clickSector(sector) {
    this.props.setSelectedSector(sector);
  }

  handleSelectedType(sectorLayer) {
    const layers = [...this.props.selectedLayers];
    const id = sectorLayer.type_id;

    if (layers.includes(id)) {
      layers.splice(layers.indexOf(id), 1);
    } else {
      layers.push(id);
    }

    this.props.setSelectedLayers(layers);
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
