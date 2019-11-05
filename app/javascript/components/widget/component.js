import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// Components
import Spinner from 'wri-api-components/dist/spinner';
import Icon from 'components/icon';

// styles
import './styles.scss';

class WidgetWrapperComponent extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    chart: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired
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
    const { title, children } = this.props;
    const { widgetData, loading } = this.state;
    if (widgetData && widgetData.length) {
      return (
        <div className="c-widget-element">
          <div className="c-widgets-template">
            <div className="widget-header">
              <h2>{title}</h2>
              <div className="header-buttons">
                <Icon name="info" />
                <Icon name="share" />
              </div>
            </div>
            <h1 className="widget-title">{title}</h1>
            <div className="widget-content">
              {loading && <Spinner position="relative" />}
              {!loading && children({ widgetData, ...this.props })}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default WidgetWrapperComponent;
