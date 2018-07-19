import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class SidebarAnalysisComponent extends React.Component {
  static propTypes = { analysis: PropTypes.array.isRequired }

  render() {
    return (
      <div className="c-sidebar-analysis">
        Analysis
      </div>
    );
  }
}

export default SidebarAnalysisComponent;
