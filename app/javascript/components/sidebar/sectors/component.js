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
    activeLayers: PropTypes.array.isRequired,
    setModal: PropTypes.func.isRequired,
    setSelectedSector: PropTypes.func.isRequired,
    setSelectedLayersNew: PropTypes.func.isRequired,
    setlayersSettings: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectedSector: null,
    layersBySector: []
  }

  onSelectLayer = row => this.handleSelectedType(row)

  onClickCountryReport = () => console.info('on country report – I am WIP!')

  clickSector(sector) {
    const { selectedSector, setSelectedSector } = this.props;
    const nextSector = sector === selectedSector ? null : sector;
    setSelectedSector(nextSector);
  }

  handleSelectedType(sectorLayer) {
    const layers = [...this.props.selectedLayers];
    const { id } = sectorLayer;

    if (layers.includes(id)) {
      const layersSettings = { ...this.props.layersSettings };
      layers.splice(layers.indexOf(id), 1);

      layersSettings[id] =
        { ...layersSettings[id], visibility: true, opacity: 1 };

      this.props.setlayersSettings(layersSettings);
    } else {
      layers.push(id);
    }

    this.props.setSelectedLayersNew(layers);
  }

  render() {
    const {
      sectors,
      selectedSector,
      layersBySector,
      activeLayers,
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
                    labelField="type"
                    onSelect={this.onSelectLayer}
                    onClickInfo={e => setModal({ open: true, options: e })}
                  />}
            </Fragment>
          )))
        }
        {!!activeLayers.length &&
          <div className="country-report">
            <button
              className="c-button -medium -sea country-report-btn"
              onClick={this.onClickCountryReport}
            >
              Country Report
            </button>
          </div>}
      </div>
    );
  }
}

export default SectorsComponent;
