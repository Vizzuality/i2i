import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import Spinner from 'wri-api-components/dist/spinner';
import groupBy from 'lodash/groupBy';
import numeral from 'numeral';

const bucket = ['#2F939C', '#001D22', '#F9D031', '#F95E31'];
const formatNumber = n => numeral(n).format('$0,0.000a').toUpperCase();

class CountryGDPBySector extends PureComponent {
  static serialize = (data) => {
    const sectorsKeys = Object.keys(groupBy(data, 'sector'));
    const dataByYear = groupBy(data, 'year');
    const result = {
      sectors: sectorsKeys,
      years: Object.keys(dataByYear).map((year) => {
        const d = { year };
        sectorsKeys.forEach((sector) => {
          const dataBySector = dataByYear[year].find(d => d.sector === sector);
          d[sector] = dataBySector && dataBySector.value;
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
        <BarChart data={data.years} layout="vertical">
          <YAxis
            axisLine={false}
            type="category"
            dataKey="year"
            tickLine={false}
            style={{ fontSize: 11, fontWeight: 'bold' }}
          />
          <XAxis type="number" hide />
          {data.sectors.map((key, i) => (
            <Bar
              key={key}
              barSize={10}
              dataKey={key}
              fill={bucket[i]}
              stackId="stackedByYear"
            />
          ))}
          <Tooltip formatter={value => formatNumber(value)} cursor={false} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default CountryGDPBySector;
