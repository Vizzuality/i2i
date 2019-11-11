import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';

const locations = state => state.fspMaps.analysis.location.list;
const iso = state => state.fspMaps.common.iso;

export const getLocationsSelectOptions = createSelector(
  [locations, iso],
  (_locations, _iso) => {
    const countrylocations = filter(_locations, ['iso', _iso]);

    const locationOptions = countrylocations.map(location => ({
      value: location.cartodb_id,
      label: location.jurisdiction
    }));

    return sortBy(locationOptions, 'label');
  }
);

export default { getLocationsSelectOptions };
