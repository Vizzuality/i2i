import React from 'react';
import PropTypes from 'prop-types';

// components
import Widget from 'components/widget';

// styles
import './styles.scss';

class AnalysisResultComponent extends React.Component {
  static propTypes = {
    analysisActive: PropTypes.bool.isRequired,
    widgets: PropTypes.array,
    setAnalysisActive: PropTypes.func.isRequired
  }

  static defaultProps = { widgets: [] }

  render() {
    const { widgets, analysisActive } = this.props;

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
      </div>
    );
  }
}

export default AnalysisResultComponent;
