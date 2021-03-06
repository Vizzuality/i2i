import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import maxBy from 'lodash/maxBy';
import max from 'lodash/max';

import {
  Line,
  Bar,
  Cell,
  Area,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  PieChart,
  Label
} from 'recharts';

import ChartTick from './tick';

import './styles.scss';

class Chart extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    config: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
    handleMouseMove: PropTypes.func,
    handleMouseLeave: PropTypes.func
  };

  static defaultProps = {
    className: '',
    handleMouseMove: null,
    handleMouseLeave: null
  }

  findMaxValue = (data, config) => {
    const { yKeys } = config;
    const maxValues = [];

    Object.keys(yKeys).forEach(key => {
      Object.keys(yKeys[key]).forEach(subKey => {
        if (data.some(d => d.key)) {
          maxValues.push(maxBy(data, subKey)[subKey]);
        }
      });
    });

    return max(maxValues);
  };

  render() {
    const {
      className,
      data,
      config,
      handleMouseMove,
      handleMouseLeave
    } = this.props;

    const {
      margin = { top: 20, right: 0, left: 50, bottom: 0 },
      padding = { top: 0, right: 0, left: 0, bottom: 0 },
      type,
      xKey,
      yKeys,
      xAxis,
      yAxis,
      cartesianGrid,
      gradients,
      height,
      patterns,
      tooltip,
      layout,
      legend,
      unit,
      unitFormat
    } = config;

    const { lines, bars, areas, pies } = yKeys;
    const maxYValue = this.findMaxValue(data, config);

    let CHART;
    switch (type) {
      case 'pie':
        CHART = PieChart
      break;
      default: {
        CHART = ComposedChart
      }
    }

    return (
      <div className={`c-chart ${className}`} style={{ height }}>
        <ResponsiveContainer>
          <CHART
            height={height}
            data={data}
            layout={type === 'pie' ? 'centric' : layout || 'horizontal'}
            margin={margin}
            padding={padding}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              {gradients &&
                Object.keys(gradients).map(key => (
                  <linearGradient
                    key={`lg_${key}`}
                    {...gradients[key].attributes}
                  >
                    {gradients[key].stops &&
                      Object.keys(gradients[key].stops).map(sKey => (
                        <stop
                          key={`st_${sKey}`}
                          {...gradients[key].stops[sKey]}
                        />
                      ))
                    }
                  </linearGradient>
                ))
              }

              {patterns &&
                Object.keys(patterns).map(key => (
                  <pattern
                    key={`pattern_${key}`}
                    {...patterns[key].attributes}
                  >
                    {patterns[key].children &&
                      Object.keys(patterns[key].children).map(iKey => {
                        const { tag } = patterns[key].children[iKey];

                        return React.createElement(
                          tag,
                          {
                            key: iKey,
                            ...patterns[key].children[iKey]
                          }
                        );
                      })
                    }
                  </pattern>
                ))
              }
            </defs>

            {xAxis && (
              <XAxis
                dataKey={layout === 'horizontal' && (xKey || '')}
                axisLine={false}
                tickLine={false}
                tick={{ dy: 8, fontSize: '11px', fontWeight: '500', fill: '#FFF' }}
                {...xAxis}
              />
            )}


            {yAxis && (
              <YAxis
                dataKey={layout === 'vertical' && (xKey || '')}
                axisLine={false}
                tickSize={-50}
                mirror
                tickMargin={0}
                tickLine={false}
                tick={(
                  <ChartTick
                    dataMax={maxYValue}
                    unit={unit || ''}
                    unitFormat={unitFormat || (value => value)}
                    fill="#FFF"
                    fontWeight={500}
                  />
                )}
                {...yAxis}
              />
            )}

            {cartesianGrid && (
              <CartesianGrid
                strokeWidth={0.5}
                stroke='#999'
                shapeRendering="crispEdges"
                {...cartesianGrid}
              />
            )}

            {areas &&
              Object.keys(areas).map(key => (
                <Area key={key} dataKey={key} dot={false} {...areas[key]} />
              ))}

            {lines &&
              Object.keys(lines).map(key => (
                <Line
                  key={key}
                  dataKey={key}
                  dot={false}
                  strokeWidth={2}
                  {...lines[key]}
                />
              ))}

            {bars &&

              Object.keys(bars).map(key => (
                <Bar key={key} dataKey={key} dot={false} {...bars[key]}>
                  {!!bars[key].label &&
                    <Label {...bars[key].label} />
                  }

                  {bars[key].itemColor &&
                    data.map(item => (
                      <Cell
                        key={`c_${item.color}`}
                        fill={item.color}
                      />
                    ))}
                </Bar>
              ))}


            {pies && (
              Object.keys(pies).map(key => (
                <Pie
                  key={key}
                  data={data}
                  dataKey={key}
                  startAngle={450}
                  endAngle={90}
                  {...pies[key]}
                >
                  {data.map((item) => (
                    <Cell
                      key={`c_${item[pies[key].colorKey || 'color']}`}
                      fill={item[pies[key].colorKey || 'color']}
                      stroke={item[pies[key].colorKey || 'color']}
                    />
                  ))}
                </Pie>
              ))
            )}

            {tooltip && (
              <Tooltip
                isAnimationActive={false}
                {...tooltip}
              />
            )}

            {legend && (
              <Legend
                {...legend}
                data={data}
              />
            )}
          </CHART>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
