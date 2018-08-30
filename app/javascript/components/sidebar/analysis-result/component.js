import React from 'react';
import PropTypes from 'prop-types';

// components
import Widget from 'components/widget';

// styles
import './styles.scss';

class AnalysisResultComponent extends React.Component {
  static propTypes = { widgets: PropTypes.array }

  static defaultProps = { widgets: [] }

  render() {
    const { widgets } = this.props;

    return (
      <div className="c-sidebar-analysis-result">
        {widgets.map(w => <Widget key={w.id} {...w} />)}
      </div>
    );
  }
}

export default AnalysisResultComponent;
