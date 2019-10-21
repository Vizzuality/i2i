import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Select from 'react-select';
import isEmpty from 'lodash/isEmpty';

// styles
import './styles.scss';

class JurisdictionComponent extends PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    selectedLayers: PropTypes.array.isRequired,
    analysisActive: PropTypes.bool.isRequired,
    selectedOption: PropTypes.object.isRequired,
    area: PropTypes.object.isRequired,
    fetchJurisdictionArea: PropTypes.func.isRequired,
    setJurisdictionSelected: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { options, selectedOption } = this.props;

    if (selectedOption) {
      if (!options.find(option => option.value === selectedOption.value)) {
        this.props.setJurisdictionSelected({});
      }
    }
  }

  handleChange = (selectedJurisdiction) => {
    // Juri ID - selectedJurisdiction.value
    this.props.setJurisdictionSelected(selectedJurisdiction);
    this.props.fetchJurisdictionArea();
  }

  render() {
    const { options, selectedOption, analysisActive, selectedLayers, area } = this.props;

    return (
      <div className="c-jurisdiction">
        <div className="content-wrapper">
          <p>Select to view Financial Service locations within a given province or district.</p>
          <div className="jurisdiction-content">
            <h2>SEARCH LOCATION:</h2>
            <Select
              value={isEmpty(selectedOption) ? null : selectedOption}
              classNamePrefix="react-select"
              onChange={this.handleChange}
              options={options}
              placeholder="Introduce location"
            />
          </div>
        </div>

        <div className={classnames('button-container -analysis-report', { '-disabled': (!selectedLayers.length || !!isEmpty(area)) })}>
          <button
            className="c-button -small -sea"
            onClick={() => this.props.setAnalysisActive(!analysisActive)}
          >
            Summary Report
          </button>
        </div>
      </div>
    );
  }
}

export default JurisdictionComponent;
