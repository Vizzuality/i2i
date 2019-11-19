import { createSelector } from 'reselect';
import { replace } from 'layer-manager';
import intersection from 'lodash/intersection';

const rawWidgets = state => state.fspMaps.widgets.list;
const selectedLayers = state => state.fspMaps.layers.selectedLayers;
const iso = state => state.fspMaps.common.iso;
const selectedMenuItem = state => state.fspMaps.sidebar.menuItem;
const nearby = state => state.fspMaps.analysis.nearby;
const analyzePattern = state => state.fspMaps.analysis.location;
const jurisdiction = state => state.fspMaps.analysis.jurisdiction;
const areaOfInterestArea = state => state.fspMaps.analysis.areaOfInterest.area;
const allLayersList = state => state.fspMaps.layers.list;

export const getWidgets = createSelector(
  [rawWidgets, selectedLayers, iso, selectedMenuItem, nearby, analyzePattern, jurisdiction, areaOfInterestArea, allLayersList],
  (_rawWidgets, _selectedLayers, _iso, _selectedMenuItem, _nearby, _analyzePattern, _jurisdiction, _areaOfInterestArea, _allLayersList) => {
    const sectorLayers = _allLayersList.filter(layer => _selectedLayers.includes(layer.id) && layer.layerType === 'sector');
    const allSectorLayers = _allLayersList.filter(layer => layer.layerType === 'sector');

    const filteredRawWidgets = _rawWidgets.filter((widget) => {
      const { analysis_type: analysisType, type_id: typeId, output, iso: widgetIso } = widget;

      if (widgetIso && widgetIso !== _iso) {
        return null;
      }

      // If the widget has a type_id in carto, it means it's a contextual layer widget.
      if (typeId) {
        const widgetLayers = typeId.split(',');
        const hasLayer = intersection(widgetLayers, _selectedLayers).length;

        if (hasLayer && analysisType.includes(_selectedMenuItem)) {
          return widget;
        }
      } else if (analysisType.includes(_selectedMenuItem)) {
        if (output === 'summary') {
          return widget;
        } else if (sectorLayers.length || analysisType === 'country') {
          return widget;
        }
      }

      return null;
    });

    const widgets = filteredRawWidgets.map((row) => {
      const {
        cartodb_id: id,
        widget_config: widgetConfigWrap,
        analysis_name: analysisName,
        analysis_type: analysisType,
        output: widgetType,
        provider
      } = row;

      const { widgetConfig } = widgetConfigWrap;
      const { params_config: paramsConfig, sql_query: sqlQuery, sql_query_param: sqlQueryParam, url } = widgetConfig;
      const { area: nearbyArea, center } = _nearby;
      const { area: jurisdictionArea } = _jurisdiction;
      const { area: analyzePatternArea } = _analyzePattern;
      const { lng, lat } = center;
      const typeIds = analysisType === 'country' ? allSectorLayers.map(layer => layer.type_id) : sectorLayers.map(layer => layer.type_id);
      const cartoAccount = window.FSP_CARTO_ACCOUNT;
      const cartoApiKey = window.FSP_CARTO_API_KEY;

      let editableQuery = sqlQuery;
      let geojson;

      if (_selectedMenuItem === 'nearby') {
        geojson = nearbyArea;
      } else if (_selectedMenuItem === 'area_of_interest') {
        geojson = _areaOfInterestArea;
      } else if (_selectedMenuItem === 'analyze_pattern') {
        geojson = analyzePatternArea;
      } else if (_selectedMenuItem === 'jurisdiction') {
        geojson = jurisdictionArea;
      }

      const queryValues = {
        iso: `'${_iso}'`,
        account: cartoAccount,
        type_ids: `(${typeIds.join()})`,
        geojson: `'${JSON.stringify(geojson)}'`,
        lng,
        lat,
        tableName1: process.env.FSP_CARTO_TABLE || 'fsp_maps', // are you sure you want to change this value?
        tableName2: process.env.FSP_CARTO_USERS_TABLE || 'fsp_maps_user_staging'
      };

      paramsConfig.forEach((param) => {
        const queryParam = param.key;
        const queryReplacement = { [queryParam]: queryValues[queryParam] };
        editableQuery = replace(editableQuery, queryReplacement);
      });

      const bodyParams = {
        [sqlQueryParam]: editableQuery,
        ...(provider === 'cartodb') && { api_key: cartoApiKey }
      };

      return {
        id,
        title: analysisName,
        url,
        body: bodyParams,
        type: analysisType,
        chart: widgetType
      };
    });

    return widgets.sort((w1, w2) => w1.id - w2.id);
  }
);

export default { getWidgets };
