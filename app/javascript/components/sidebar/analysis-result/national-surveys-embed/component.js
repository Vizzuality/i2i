import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NationalSurveysEmbedComponent extends PureComponent {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    latestYear: PropTypes.number.isRequired
  }

  getParams = (id, iso, latestYear, shape) => {
    const params = {
      i: iso,
      y: latestYear,
      c: shape,
      id
    };
    const parsedParams = btoa(JSON.stringify(params));
    return parsedParams;
  };

  render() {
    const { iso, latestYear } = this.props;
    const widgets = [
      {
        id: 'credit_strand',
        shape: 'radial'
      },
      {
        id: 'fas_strand',
        shape: 'radial'
      },
      {
        id: 'savings_strand',
        shape: 'radial'
      },
      {
        id: 'i2i_Education',
        shape: 'pie'
      },
      {
        id: 'i2i_Income_Sources',
        shape: 'pie'
      }
    ];

    return (
      <div className="c-national-surveys-embed">
        {
          widgets.map(w =>
            (<iframe
              key={w.id}
              title="credit_strand"
              height="500"
              width="100%"
              src={`http://${window.location.hostname}/data-portal/indicator?p=${this.getParams(w.id, iso, latestYear, w.shape)}&source=fsp_maps`}
            />))
        }
      </div>
    );
  }
}

export default NationalSurveysEmbedComponent;
