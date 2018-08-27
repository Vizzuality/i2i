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
      title: 'The title',
      chart: 'pie',
      url: 'https://i2i-admin.carto.com/api/v2/sql?q=WITH%20b%20as%20(SELECT%20st_setsrid(st_geomfromgeojson(%27%7B%22type%22:%22Polygon%22,%22coordinates%22:%5B%5B%5B35.7275390625,-1.8014609294680355%5D,%5B38.60595703125,-1.8014609294680355%5D,%5B38.60595703125,-0.08789059053082422%5D,%5B35.7275390625,-0.08789059053082422%5D,%5B35.7275390625,-1.8014609294680355%5D%5D%5D%7D%27),4326)%20as%20the_geom)%20SELECT%20round((points.count*1./tot.count*1.)*100,%201)%20as%20access_points_percentage,%20points.iso,%20points.sector,%20points.type%20FROM%20(SELECT%20count(*),%20m.iso,%20m.sector,%20m.type%20FROM%20fsp_maps%20as%20m,%20b%20WHERE%20ST_Intersects(b.the_geom,%20m.the_geom)%20and%20m.type_id%20in%20(40,51,58,62,67)%20GROUP%20BY%20m.iso,%20m.sector,%20m.type%20)%20as%20points,%20(SELECT%20count(*)%20FROM%20fsp_maps%20as%20m,%20b%20WHERE%20ST_Intersects(b.the_geom,%20m.the_geom)%20and%20type_id%20in%20(40,51,58,62,67)%20)%20as%20tot',
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
