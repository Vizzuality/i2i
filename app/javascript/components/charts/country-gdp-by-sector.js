import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import Spinner from 'wri-api-components/dist/spinner';
import groupBy from 'lodash/groupBy';
import { format } from 'd3-format';

const bucket = ['#2F939C', '#001D22', '#F9D031', '#F95E31'];
const numberFormat = format('.2s');

class CountryGDPBySector extends PureComponent {
  static serialize = (data) => {
    const sectorsKeys = Object.keys(groupBy(data, 'sector'));
    const dataByYear = groupBy(data, 'year');
    const result = {
      sectors: sectorsKeys,
      years: Object.keys(dataByYear).map((key) => {
        const d = { year: key };
        sectorsKeys.forEach((k, i) => {
          d[k] = dataByYear[key][i].value;
        });
        return d;
      })
    };
    return result;
  }
  static propTypes = { iso: PropTypes.string.isRequired }

  constructor(props) {
    super(props);
    this.state = { data: null, loaded: false };
  }

  componentDidMount() {
    const { iso } = this.props;
    axios.get(`/dpapi/gdp_by_country/${iso}`)
      .then(({ data }) => (data && data.length) &&
        this.setState({ data: CountryGDPBySector.serialize(data) }))
      .catch(() => this.setState({ loaded: true }));
  }

  render() {
    const { data, loaded } = this.state;

    if (!data && !loaded) return <Spinner position="relative" />;
    if (!data && loaded) return <p>No data for this country.</p>;

    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart layout="vertical" data={data.years} stackOffset="expand">
          <XAxis
            type="number"
            hide
            unit="$"
            label={{ value: 'US $', position: 'insideTopLeft', fontSize: 11, fontWeight: 'bold' }}
          />
          <YAxis
            axisLine={false}
            type="category"
            dataKey="year"
            tickLine={false}
            style={{ fontSize: 11, fontWeight: 'bold' }}
          />
          {data.sectors.map((key, i) => (
            <Bar
              key={key}
              barSize={10}
              dataKey={key}
              fill={bucket[i]}
              stackId="year"
            />
          ))}
          <Tooltip formatter={value => numberFormat(value)} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default CountryGDPBySector;
