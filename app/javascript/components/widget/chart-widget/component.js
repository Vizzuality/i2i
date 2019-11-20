import React from 'react';
import PropTypes from 'prop-types';

// Components
import { VegaChart } from 'wri-api-components/dist/widgets';
import * as vegaTooltip from 'vega-tooltip';

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

  componentDidMount() {
    this.forceUpdate();
  }



  render() {
    const { title, chart } = this.props;
    const spec = this.getSpec(chart);
    const handler = new vegaTooltip.Handler();

    return (
      <div ref={(r) => { this.widgetElement = r; }} className="c-chart-widget-element">
        <div className="widget-title">
          {title}

          {spec &&
            <VegaChart
              spec={spec}
              tooltip={handler.call}
            />
          }
        </div>
      </div>
    );
  }
}

export default ChartWidgetWrapperComponent;
