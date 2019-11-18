import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { CSVLink } from "react-csv";


// Components
import Spinner from 'wri-api-components/dist/spinner';
import Icon from 'components/icon';

// styles
import './styles.scss';

class WidgetWrapperComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
    const { title, children, url, body } = this.props;
    const { widgetData, loading } = this.state;
    if (widgetData && widgetData.length) {
      return (
        <div className="c-widget-element">
          <div className="widget-template">
            <div className="widget-header">
              <h3>{title}</h3>
              <div className="header-buttons">
                <button
                  className="widget-btn"
                  onClick={this.onDownload}
                >
                  <Icon name="info-squared" className="info-widget -disabled-opacity" />
                </button>

                <button className="widget-btn">
                  <a href={`${url}?q=${body.q}&api_key=${body.api_key}&format=csv`}>
                    <Icon name="download" className="download-widget -disabled-opacity" />
                  </a>
                </button>


              </div>
            </div>
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
