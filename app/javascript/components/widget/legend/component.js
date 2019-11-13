import React from 'react';
import PropTypes from 'prop-types';


import './styles.scss';

const Legend = ({ data }) => (
  <div className="c-widget-legend">
    <ul className="legend-list">
      {data.map(d => (
        <li
          key={d.dateKey}
        >
                       <svg height="12" width="12">
                <rect
                  className="legend-color"
                  fill={d.color}
                />
              </svg>

          {d.dataKey}
        </li>
      ))}

    </ul>


{console.log(data, 'legend')}
  </div>
);

Legend.propTypes = { data: PropTypes.shape({}) };

Legend.defaultProps = {
  data: {}
};

export default Legend;


// <ul className={classnames(styles.widget_legend_list, styles[`_${type}`])}>
//           {groups[g].map((item, i) => (
//             <li
//               key={`item-${i + 1}-${item.color}`}
//               className={classnames(styles.widget_legend_list_item,
//                 styles[`_${item.variant || variant}`],
//                 styles[`_${type}`])
//               }
//             >
//               <svg height="12" width="12">
//                 <rect
//                   className={classnames(styles.item, styles[`_${type}`])}
//                   fill={item.color}
//                 />
//               </svg>

//               <div className={styles.itemWrapper}>
//                 <span>{item.value}</span>
//                 {item.payload && item.payload.y
//                   && <span className={styles.item}>{`${numberFormat(item.payload.y)} ${unit}`}</span>
//                 }
//               </div>
//             </li>
//           ))}
//         </ul>
