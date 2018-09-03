import React from 'react';
import PropTypes from 'prop-types';

// Components
import { VegaChart } from 'wri-api-components';
// import { Spinner } from 'wri-api-components';

// Constants
import { PIE_SPEC, BAR_SPEC, GROUPED_BAR_SPEC, STACKED_BAR_SPEC } from './constants';

// styles
import './styles.scss';

class ChartWidgetWrapperComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    chart: PropTypes.string.isRequired,
    widgetData: PropTypes.array.isRequired
  }

  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  getSpec(chart) {
    const { widgetData } = this.props;

    if (chart === 'pie') {
      return PIE_SPEC(widgetData, this.widgetElement.offsetWidth);
    } else if (chart === 'bar') {
      return BAR_SPEC(widgetData, this.widgetElement.offsetWidth);
    } else if (chart === 'grouped bar') {
      return GROUPED_BAR_SPEC(widgetData, this.widgetElement.offsetWidth);
    } else if (chart === 'stacked bar') {
      return STACKED_BAR_SPEC(widgetData, this.widgetElement.offsetWidth);
    }
  }

  render() {
    const { title, chart } = this.props;
    const { loading } = this.state;

    return (
      <div ref={(r) => { this.widgetElement = r; }} className="c-chart-widget-element">
        <div className="widget-title">
          {title}

          {!loading && <VegaChart spec={this.getSpec(chart)} />}
        </div>
      </div>
    );
  }
}

export default ChartWidgetWrapperComponent;
