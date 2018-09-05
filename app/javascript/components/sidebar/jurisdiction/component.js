import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
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
        <Select
          value={isEmpty(selectedOption) ? null : selectedOption}
          onChange={this.handleChange}
          options={options}
          placeholder="Select Jurisdiction..."
        />

        {(!!selectedLayers.length && !isEmpty(area)) &&
          <div className="button-container -analysis-report">
            <button
              className="c-button -small -sea"
              onClick={() => this.props.setAnalysisActive(!analysisActive)}
            >
              Analysis Report
            </button>
          </div>
        }
      </div>
    );
  }
}

export default JurisdictionComponent;
