import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import Spinner from 'wri-api-components/dist/spinner';
import { format } from 'd3-format';

const bucket = ['#2F939C', '#001D22', '#F9D031', '#F95E31'];
const numberFormat = format('.2s');

class CountryGDPOverTime extends PureComponent {
  static propTypes = { iso: PropTypes.string.isRequired }

  constructor(props) {
    super(props);
    this.state = { data: null, loaded: false };
  }

  componentDidMount() {
    const { iso } = this.props;
    axios.get(`/dpapi/gdp_by_country_over_time/${iso}`)
      .then(({ data }) => {
        if (data && data.length) {
          this.setState({ data, loaded: true });
        } else {
          this.setState({ data: null, loaded: true });
        }
      })
      .catch(() => this.setState({ data: null, loaded: true }));
  }

  render() {
    const { data, loaded } = this.state;

    if (!data && !loaded) return <Spinner position="relative" />;
    if (!data && loaded) return <p>No data for this country.</p>;

    return (
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis
            dataKey="year"
            style={{ fontSize: 11, fontWeight: 'bold' }}
            tickSize={1}
            tick={{ dy: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            orientation="right"
            tickFormatter={numberFormat}
            style={{ fontSize: 11 }}
            tick={{ position: 'insideRight' }}
            label={{ position: 'insideRight' }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            dataKey="value"
            stroke={bucket[0]}
            dot={{ strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default CountryGDPOverTime;
