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
    setLayersSectorSelected: PropTypes.func.isRequired,
    setLayersSelected: PropTypes.func.isRequired,
    setLayersSettings: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectedSector: null,
    layersBySector: []
  }

  onSelectLayer = row => this.handleSelectedType(row)

  onClickCountryReport = () => console.info('on country report – I am WIP!')

  clickSector(sector) {
    const { selectedSector, setLayersSectorSelected } = this.props;
    const nextSector = sector === selectedSector ? null : sector;
    setLayersSectorSelected(nextSector);
  }

  handleSelectedType(sectorLayer) {
    const layers = [...this.props.selectedLayers];
    const layersSettings = { ...this.props.layersSettings };
    const { id } = sectorLayer;


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
