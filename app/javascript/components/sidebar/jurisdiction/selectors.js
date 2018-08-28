import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

const jurisdictions = state => state.fspMaps.analysis.jurisdiction.list;
const iso = state => state.fspMaps.common.iso;

export const getJurisdictionsSelectOptions = createSelector(
  [jurisdictions, iso],
  (_jurisdictions, _iso) => {
    const countryJurisdictions = filter(_jurisdictions, ['iso', _iso]);

    const jurisdictionOptions = countryJurisdictions.map(jurisdiction => ({
      value: jurisdiction.cartodb_id,
      label: jurisdiction.jurisdiction
    }));

    return sortBy(jurisdictionOptions, 'label');
  }
);

export default { getJurisdictionsSelectOptions };
