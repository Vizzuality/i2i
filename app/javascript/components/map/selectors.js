import { createSelector } from 'reselect';
import difference from 'lodash/difference';
import { replace } from 'layer-manager';

// SQL
import VORONOID_LAYER_SQL from 'components/fsp-maps/sql/voronoid_layer.sql';
import FSP_LAYER_SQL from 'components/fsp-maps/sql/fsp_layer.sql';

// CSS
import SECTORS_CSS from 'components/fsp-maps/cartocss/sectors.cartocss';
import HEATMAP_CSS from 'components/fsp-maps/cartocss/heatmap.cartocss';
import VORONOID_LAYER_CSS from 'components/fsp-maps/cartocss/voronoid.cartocss';

const iso = state => state.fspMaps.common.iso;
const layersList = state => state.fspMaps.layers.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const layersSettings = state => state.fspMaps.legend.layersSettings;
const layersOrder = state => state.fspMaps.layers.layersOrder;

function getSortedLayers(allLayersOrder, mapped) {
  let sortedLayers = [];
  let mappedLayers = mapped;

  if (allLayersOrder.length === 0) {
    sortedLayers = mappedLayers;
  } else {
    allLayersOrder.forEach((key) => {
      let found = false;
      mappedLayers = mappedLayers.filter((item) => {
        if (!found && item.id == key) {
          sortedLayers.push(item);
          found = true;
          return false;
        } return true;
      });
    });
  }

  return sortedLayers;
}

export const getActiveLayers = createSelector(
  [iso, layersList, selectedLayers, layersSettings, layersOrder],
  (_iso, _layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map((l) => {
      let layerSql = FSP_LAYER_SQL;
      let layerCss = SECTORS_CSS;
      let interactivity = ['name', 'type'];

      if (_layersSettings[l.type_id]) {
        if (_layersSettings[l.type_id].visualizationType) {
          if (_layersSettings[l.type_id].visualizationType === 'heatmap') {
            layerCss = HEATMAP_CSS;
          }

          if (_layersSettings[l.type_id].visualizationType === 'voronoid') {
            layerSql = VORONOID_LAYER_SQL;
            layerCss = VORONOID_LAYER_CSS;
          }
        }
      }


      // If layer is present and visualization type is voronoid, turn off interactivity
      if (_layersSettings[l.id] && _layersSettings[l.id].visualizationType && _layersSettings[l.id].visualizationType === 'voronoid') {
        interactivity = null;
      }

      // If layer if anything  other than a sectors type, turn off interactivity
      if (l.layerType !== 'sector') {
        interactivity = null;
      }

      return {
        ...l,
        ...l.layerType === 'sector' && {
          layerConfig: {
            body: {
              layers: [
                {
                  options: {
                    cartocss_version: '2.3.0',
                    cartocss: replace(layerCss, { color: l.color }),
                    sql: replace(layerSql, { iso: _iso, type_id: l.type_id })
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
        },
        visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
        opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
        interactivity
      };
    });

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export const getActiveLayerGroups = createSelector(
  [layersList, selectedLayers, layersSettings, layersOrder],
  (_layersList, _selectedLayers, _layersSettings, _layersOrder) => {
    const activeLayers = _layersList.filter(layer => _selectedLayers.includes(layer.id));
    const allLayersOrder = _layersOrder.concat(difference(_selectedLayers, _layersOrder));

    const mapped = activeLayers.map(l => ({
      dataset: l.id,
      id: l.id,
      visibility: _layersSettings[l.id] ? _layersSettings[l.id].visibility : true,
      opacity: (_layersSettings[l.id] && _layersSettings[l.id].opacity) ? _layersSettings[l.id].opacity : 1,
      layers: [{ ...l, active: true }],
      layerType: l.layerType
    }));

    const sortedLayers = getSortedLayers(allLayersOrder, mapped);

    return sortedLayers;
  }
);

export default { getActiveLayers, getActiveLayerGroups };
