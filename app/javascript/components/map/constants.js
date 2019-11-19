import { replace } from 'layer-manager';

// SQL
import VORONOID_LAYER_SQL from 'components/fsp-maps/sql/voronoid_layer.sql';
import VORONOID_LEGEND_VALUES_SQL from 'components/fsp-maps/sql/voronoid_legend_values.sql';
import FSP_LAYER_SQL from 'components/fsp-maps/sql/fsp_layer.sql';
import FSP_LAYER_SQL_ALL from 'components/fsp-maps/sql/fsp_layer_all.sql';

// CSS
import SECTORS_CSS from 'components/fsp-maps/cartocss/sectors.cartocss';
import HEATMAP_CSS from 'components/fsp-maps/cartocss/heatmap.cartocss';
import VORONOID_LAYER_CSS from 'components/fsp-maps/cartocss/voronoid.cartocss';

export const BASEMAPS = {
  light: {
    id: 'light',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgk77j0r7h2sqw220p7imy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Light',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>' }
  },
  dark: {
    id: 'dark',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgjq1908ar2smep2wd7wf7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Dark',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>' }
  },
  satellite: {
    id: 'satellite',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqiecof53wv2rl9gw4cehmy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Satellite',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>' }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqi456h02pg2rp6w2mwp61c/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Terrain',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> <a href="https://resourcewatch.org/" target="_blank">Resource Watch</a>' }
  }
};

export const LABELS = {
  none: {
    id: 'none',
    label: 'No labels',
    value: 'no_labels'
  },
  light: {
    id: 'light',
    label: 'Labels light',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjgcf9rs05qnu2rrpp4qzucox/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w'
  },
  dark: {
    id: 'dark',
    label: 'Labels dark',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjgcf9gqk9tmm2spd9zr0tml3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w'
  }
};

export const COUNTRY_MASK = {
  id: 'country-mask',
  name: 'Country Mask',
  provider: 'carto',
  layerConfig: {
    account: window.FSP_CARTO_ACCOUNT,
    body: {
      maxzoom: 19,
      minzoom: 2,
      layers: [
        {
          type: 'cartodb',
          options: {
            sql: 'SELECT * FROM world_borders_hd',
            cartocss: "#layer{polygon-fill:#2f939c;polygon-opacity:.9;line-color:#2f939c;line-opacity:.1;line-width:0}#layer[iso_a3='{{iso}}']{polygon-fill:#FFF;polygon-opacity:0;line-opacity:1}",
            cartocss_version: '2.3.0'
          }
        }
      ]
    }
  },
  legendConfig: {},
  interactionConfig: {}
};

export const SECTOR_CONFIGS = {
  normal: (params) => {
    const { l, iso, year } = params;

    const generateCartoCSS = ({ layers: lys = [] }) => `
      #layer {
        marker-width: 10;
        marker-fill: white;
        marker-fill-opacity: 0.9;
        marker-line-color: #FFFFFF;
        marker-line-width: 1;
        marker-line-opacity: 1;
        marker-placement: point;
        marker-type: ellipse;
        marker-allow-overlap: true;
      }

      ${lys.map(({ color, type }) => `
        #layer[type="${type}"] {
          marker-fill: ${color};
        }
      `).join(' ')}
    `;

    const generateLegend = ({ type, color, layers: lys = [] }) => {
      if (lys.length) {
        return {
          type: 'basic',
          items: lys.map(c => (
            {
              name: c.type,
              color: c.color
            }
          ))
        };
      }

      return {
        type: 'basic',
        items: [
          {
            name: type,
            color
          }
        ]
      };
    };

    const SQL = (!l.layers) ? FSP_LAYER_SQL : FSP_LAYER_SQL_ALL;
    const CARTOCSS = (!l.layers) ? replace(SECTORS_CSS, { color: l.color }) : generateCartoCSS(l);

    return {
      interactivity: ['name', 'type'],
      layerConfig: {
        body: {
          layers: [
            {
              options: {
                cartocss_version: '2.3.0',
                cartocss: CARTOCSS,
                sql: replace(SQL, { iso, year, type_id: l.type_id, tableName: l.isUserDataset ? process.env.FSP_CARTO_USERS_TABLE : process.env.FSP_CARTO_TABLE })
              },
              type: 'cartodb'
            }
          ],
          minzoom: 3,
          maxzoom: 18
        },
        account: 'i2i-admin'
      },
      legendConfig: generateLegend(l),
      interactionConfig: {}
    };
  },
  heatmap: (params) => {
    const { l, iso, year } = params;

    const SQL = (!l.layers) ? FSP_LAYER_SQL : FSP_LAYER_SQL_ALL;

    return {
      layerConfig: {
        body: {
          layers: [
            {
              options: {
                cartocss_version: '2.3.0',
                cartocss: replace(HEATMAP_CSS, { color: l.color }),
                sql: replace(SQL, { iso, year, type_id: l.type_id, tableName: l.isUserDataset ? process.env.FSP_CARTO_USERS_TABLE : process.env.FSP_CARTO_TABLE })
              },
              type: 'cartodb'
            }
          ],
          minzoom: 3,
          maxzoom: 18
        },
        account: 'i2i-admin'
      },
      legendConfig: {
        type: 'choropleth',
        items: [
          {
            name: 'Very Low',
            color: 'rgba(0, 255, 255, 0.7)' // cyan
          },
          {
            name: 'Low',
            color: 'rgba(0, 0, 255, 0.7)' // blue
          },
          {
            name: 'Medium Low',
            color: 'rgba(0, 128, 0, 0.7)' // green
          },
          {
            name: 'Medium High',
            color: 'rgba(255, 255, 0, 0.7)' // yellow
          },
          {
            name: 'High',
            color: 'rgba(255, 165, 0, 0.7)' // orange
          },
          {
            name: 'Very High',
            color: 'rgba(255, 0, 0, 0.7)' // red
          }
        ]
      },
      interactionConfig: {}
    };
  },
  voronoid: (params) => {
    const { l, iso, visualizationType } = params;
    const { id: layerid } = l;

    const layerConfig = {
      layerConfig: {
        body: {
          layers: [
            {
              options: {
                cartocss_version: '2.3.0',
                cartocss: replace(VORONOID_LAYER_CSS, { color: l.color }),
                sql: replace(VORONOID_LAYER_SQL, { iso, type_id: l.type_id })
              },
              type: 'cartodb'
            }
          ],
          minzoom: 3,
          maxzoom: 18
        },
        account: 'i2i-admin'
      },
      interactionConfig: {},
      legendConfig: {
        type: 'choropleth',
        params: { visualizationType },
        items: [
          {
            name: 'Very Close',
            color: '#f6d2a9'
          },
          {
            name: 'Close',
            color: '#f3aa84'
          },
          {
            name: 'Medium',
            color: '#ea8171'
          },
          {
            name: 'Far',
            color: '#d55d6a'
          },
          {
            name: 'Very Far',
            color: '#b13f64'
          }
        ],
        url: `${window.FSP_CARTO_API}?q=${encodeURIComponent(replace(VORONOID_LEGEND_VALUES_SQL, { type_id: layerid }))}&api_key=${window.FSP_CARTO_API_KEY}`,
        dataParse: ((activeLayer, data) => {
          const { legendConfig } = activeLayer;

          const parsedValues = data.rows.map(r => `<${r.bucket} km\u00B2`);
          parsedValues.forEach((value, index) => {
            legendConfig.items[index].name = value;
          });

          return activeLayer;
        })
      }
    };

    return layerConfig;
  }
};

export const FINANCIAL_DIARIES_MARKERS = [
  {
    options: { title: 'Mbeya region' },
    coordinates: [-7.992813, 33.495351],
    url: '/data-portal/TZA/financial-diaries'
  },
  {
    options: { title: 'Makueni, Nairobi' },
    coordinates: [-1.284044, 36.779093],
    url: '/data-portal/KEN/financial-diaries'
  },
  {
    options: { title: 'Mombasa, Eldoret, Vihiga region' },
    coordinates: [0.514404, 35.269766],
    url: '/data-portal/KEN/financial-diaries'
  },
  {
    options: { title: 'Varanasi, India' },
    coordinates: [25.322598, 82.974629],
    url: '/data-portal/IND/financial-diaries'
  },
  {
    options: { title: 'Uttar Pradesh province region, India' },
    coordinates: [27.824179, 79.635077],
    url: '/data-portal/IND/financial-diaries'
  },
  {
    options: { title: 'Western: Mbarara, Ntungamo' },
    coordinates: [-0.606721, 30.655043],
    url: '/data-portal/UGA/financial-diaries'
  },
  {
    options: { title: 'Sheema Central: Kayunga, Mukono, Buikwe' },
    coordinates: [1.189765, 33.253945],
    url: '/data-portal/UGA/financial-diaries'
  },
  {
    options: { title: 'Eastern: Iganga, Jinja, Mayuge ' },
    coordinates: [0.604623, 33.471393],
    url: '/data-portal/UGA/financial-diaries'
  },
  {
    options: { title: 'Eastern: Mbale, Manafwa, Tororo region' },
    coordinates: [1.078656, 34.180055],
    url: '/data-portal/UGA/financial-diaries'
  },
  {
    options: { title: 'Jinja, Iganga, Mayuge' },
    coordinates: [0.448214, 33.202995],
    url: '/data-portal/GHA/financial-diaries'
  },
  {
    options: { title: 'Navrongo, Ghana' },
    coordinates: [10.893911, -1.091423],
    url: '/data-portal/GHA/financial-diaries'
  },
  {
    options: { title: 'Rapale district, Mozambique' },
    coordinates: [-15.062591, 39.193418],
    url: '/data-portal/MOZ/financial-diaries'
  },
  {
    options: { title: 'Northern Nampula, Mozambique ' },
    coordinates: [-15.048694, 39.222509],
    url: '/data-portal/MOZ/financial-diaries'
  },
  {
    options: { title: 'Bahawalnagar district,' },
    coordinates: [30.004260, 73.241266],
    url: '/data-portal/PAK/financial-diaries'
  },
  {
    options: { title: 'Puebla, Mexico' },
    coordinates: [19.041323, -98.206012],
    url: '/data-portal/MEX/financial-diaries'
  },
  {
    options: { title: 'Mexico City outskirt region' },
    coordinates: [19.435319, -99.140826],
    url: '/data-portal/MEX/financial-diaries'
  },
  {
    options: { title: 'Africa	Johannesburg' },
    coordinates: [-26.204456, 28.045197],
    url: '/data-portal/ZAF/financial-diaries'
  }
];
