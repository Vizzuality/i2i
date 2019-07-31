import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Components
import Spinner from 'wri-api-components/dist/spinner';
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
    this.fetchWidget();
  }

  componentDidUpdate(prevProps) {
    const { url: prevUrl, body: prevBody } = prevProps;
    const { url: nextUrl, body: nextBody } = this.props;

    if ((prevUrl !== nextUrl) || !isEqual(prevBody, nextBody)) {
      this.fetchWidget();
    }
  }

  fetchWidget = () => {
    const { url, body } = this.props;

    this.setState({ loading: true });

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&')
    })
      .then(response => response.ok && response.json())
      .then((data) => {
        const widgetData = data.rows;
        this.setState({ widgetData, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { chart, id } = this.props;
    const { widgetData, loading } = this.state;

    if (widgetData && widgetData.length) {
      return (
        <div className="c-widget-element">
          {loading && <Spinner position="relative" />}

          {!loading && chart === 'summary' &&
          <SummaryWidget key={id} widgetData={widgetData} {...this.props} />
        }

          {
          (!loading && (chart === 'pie' || chart === 'stacked bar' || chart === 'grouped bar' || chart === 'bar')) &&
            <ChartWidget
              key={id}
              widgetData={widgetData}
              {...this.props}
            />
        }
        </div>
      );
    }

    return null;
  }
}

export default WidgetWrapperComponent;
