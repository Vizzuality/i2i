import React from 'react';
import PropTypes from 'prop-types';

// Components
import SummaryWidget from './summary-widget';
import ChartWidget from './chart-widget';
// import WidgetText from '...'

// styles
import './styles.scss';

class WidgetWrapperComponent extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    chart: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  }

  state = { widgetData: [], loading: true };

  componentDidMount() {
    const { url, body } = this.props;

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&')
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        const widgetData = data.rows;
        this.setState({ widgetData, loading: false });
      });
  }

  render() {
    const { chart, id } = this.props;
    const { widgetData, loading } = this.state;

    return (
      <div className="c-widget-element">
        {!loading && chart === 'summary' ? <SummaryWidget key={id} widgetData={widgetData} {...this.props} /> : null }
        {
          (!loading && (chart === 'pie' || chart === 'stacked bar' || chart === 'grouped bar' || chart === 'bar')) ?
            <ChartWidget
              key={id}
              widgetData={widgetData}
              {...this.props}
            /> : null
        }
      </div>
    );
  }
}

export default WidgetWrapperComponent;
