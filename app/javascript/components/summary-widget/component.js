import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class SummaryWidgetWrapperComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  }

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
        // dispatch(setWidgetsList(data.rows));
        console.log(data);
      });
  }

  render() {
    const { title } = this.props;

    return (
      <div className="c-summary-widget-element">
        { title }
      </div>
    );
  }
}

export default SummaryWidgetWrapperComponent;
