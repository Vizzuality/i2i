import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class SummaryWidgetWrapperComponent extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { url, body } = this.props;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
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
