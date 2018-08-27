import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class WidgetWrapperComponent extends React.Component {
  static propTypes = { iso: PropTypes.string.isRequired }

  componentDidMount() {
    const { iso } = this.props;

    const chartOptions = {
      el: this.widgetElement,
      iso,
      chart: 'pie',
      url: 'https://i2i-admin.carto.com/api/v2/sql?q=WITH b as (SELECT st_setsrid(st_geomfromgeojson(\'{ "type":"Polygon", "coordinates": [[[32.069092, 1.658704], [32.398682, -0.027466], [34.123535, 0.626208], [32.069092, 1.658704]]] }\'),4326) as the_geom) SELECT count(*) as access_points, m.iso, m.sector, m.type FROM fsp_maps as m, b WHERE ST_Intersects(b.the_geom, m.the_geom) and m.type_id in (136) GROUP BY m.iso, m.sector, m.type&api_key=59d0d3f8df199951f80ea077178815179acc090a',
      fspId: 12341234
    };

    this.widget = new App.View.ChartWidgetView(chartOptions);
  }

  render() {
    return (
      <div ref={(w) => { this.widgetElement = w; }} className="c-widget-element" />
    );
  }
}

export default WidgetWrapperComponent;
