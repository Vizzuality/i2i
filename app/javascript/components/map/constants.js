import { replace } from 'layer-manager';

// SQL
import VORONOID_LAYER_SQL from 'components/fsp-maps/sql/voronoid_layer.sql';
import VORONOID_LEGEND_VALUES_SQL from 'components/fsp-maps/sql/voronoid_legend_values.sql';
import FSP_LAYER_SQL from 'components/fsp-maps/sql/fsp_layer.sql';

// CSS
import SECTORS_CSS from 'components/fsp-maps/cartocss/sectors.cartocss';
import HEATMAP_CSS from 'components/fsp-maps/cartocss/heatmap.cartocss';
import VORONOID_LAYER_CSS from 'components/fsp-maps/cartocss/voronoid.cartocss';

export const BASEMAPS = {
  light: {
    id: 'light',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgk77j0r7h2sqw220p7imy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Light',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  },
  dark: {
    id: 'dark',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqgjq1908ar2smep2wd7wf7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Dark',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  },
  satellite: {
    id: 'satellite',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqiecof53wv2rl9gw4cehmy/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Satellite',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqi456h02pg2rp6w2mwp61c/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Terrain',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
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
    const { l, iso } = params;

    return {
      interactivity: ['name', 'type'],
      layerConfig: {
        body: {
          layers: [
            {
              options: {
                cartocss_version: '2.3.0',
                cartocss: replace(SECTORS_CSS, { color: l.color }),
                sql: replace(FSP_LAYER_SQL, { iso, type_id: l.type_id })
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
        type: 'basic',
        items: [
          {
            name: l.type,
            color: l.color
          }
        ]
      },
      interactionConfig: {}
    };
  },
  heatmap: (params) => {
    const { l, iso } = params;

    return {
      layerConfig: {
        body: {
          layers: [
            {
              options: {
                cartocss_version: '2.3.0',
                cartocss: replace(HEATMAP_CSS, { color: l.color }),
                sql: replace(FSP_LAYER_SQL, { iso, type_id: l.type_id })
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
