import React from 'react';
import PropTypes from 'prop-types';

// components
import Widget from 'components/widget';
import NationalSurveysEmbed from 'components/sidebar/analysis-result/national-surveys-embed';

// styles
import './styles.scss';

class AnalysisResultComponent extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    latestYear: PropTypes.number.isRequired,
    analysisActive: PropTypes.bool.isRequired,
    widgets: PropTypes.array,
    setAnalysisActive: PropTypes.func.isRequired
  }

  static defaultProps = { widgets: [] }

  render() {
    const { widgets, analysisActive, iso, latestYear } = this.props;

    return (
      <div className="c-sidebar-analysis-result">
        <div
          className="back-button"
          tabIndex="0"
          role="button"
          onClick={() => this.props.setAnalysisActive(!analysisActive)}
        >
          <h3 className="title">
            Back
          </h3>
        </div>

        {widgets.map(w => <Widget key={w.id} {...w} />)}

        {latestYear && <NationalSurveysEmbed
          iso={iso}
          latestYear={latestYear}
        />}
      </div>
    );
  }
}

export default AnalysisResultComponent;
