import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import NationalSurveysEmbed from 'components/sidebar/analysis-result/national-surveys-embed';

class NationalSurveysComponent extends PureComponent {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    latestYear: PropTypes.number.isRequired,
    setAnalysisActive: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setAnalysisActive(true);
  }

  componentWillUnmount() {
    this.props.setAnalysisActive(false);
  }

  render() {
    const { iso, latestYear } = this.props;

    return (
      <div className="c-national-surveys">
        {latestYear && <NationalSurveysEmbed
          iso={iso}
          latestYear={latestYear}
        />}
      </div>
    );
  }
}

export default NationalSurveysComponent;
