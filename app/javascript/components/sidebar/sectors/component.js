import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

// components
import List from 'components/list';

class SectorsComponent extends React.Component {
  static propTypes = {
    fetchSectors: PropTypes.func.isRequired,
    setSelectedSector: PropTypes.func.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    sectorTitles: PropTypes.array.isRequired,
    sectorsData: PropTypes.array.isRequired,
    selectedTypes: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.fetchSectors();
  }

  clickSector(sector) {
    this.props.setSelectedSector(sector);
  }

  handleSelectedType(sector, type) {
    const types = this.props.selectedTypes;
    // types[sector] = types[sector] ? types[sector].includes(type) ? types[sector].splice(types[sector].indexOf(type), 1) : types[sector].concat([type]) : [type];

    if (types[sector]) {
      if (types[sector].includes(type)) {
        types[sector].splice(types[sector].indexOf(type), 1);
      } else {
        types[sector] = types[sector].concat([type]);
      }
    } else {
      types[sector] = [type];
    }

    this.props.setSelectedType(types);
  }

  render() {
    const { sectorTitles, sectorsData, selectedSector } = this.props;
    // const classNames = classnames({
    //   'c-sidebar': true,
    //   '-open': !!open
    // });

    const filteredSectorsData = sectorsData.filter(sectorDatum => sectorDatum.sector === selectedSector);

    return (
      <div className="c-sectors">
        {
          sectorTitles.map(sectorTitle => (
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
          onSelectType={(sector, type) => this.handleSelectedType(sector, type)}
        />
      </div>
    );
  }
}

export default SectorsComponent;
