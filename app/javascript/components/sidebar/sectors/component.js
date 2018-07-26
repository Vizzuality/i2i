import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import List from 'components/list';

class SectorsComponent extends React.Component {
  static propTypes = {
    fetchSectors: PropTypes.func.isRequired,
    setSelectedSector: PropTypes.func.isRequired,
    setSelectedLayers: PropTypes.func.isRequired,
    sectorTitles: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    selectedLayers: PropTypes.object.isRequired
  }

  clickSector(sector) {
    this.props.setSelectedSector(sector);
  }

  handleSelectedType(sectorLayer) {
    let layers = this.props.selectedLayers;
    const id = sectorLayer.type_id;

    if (layers.includes(id)) {
      layers.splice(layers.indexOf(id), 1);
    } else {
      layers = layers.concat([id]);
    }

    this.props.setSelectedLayers(layers);
  }

  render() {
    const { list, selectedSector } = this.props;
    // const classNames = classnames({
    //   'c-sidebar': true,
    //   '-open': !!open
    // });

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
