
// import NumberOfServices from '../widget-templates/number-of-services';
// import SummaryWidget from '../summary-widget';

// const widgetTemplates = new Map([
//   ['Number of services', { component: NumberOfServices }],
//   ['Access points percentage', { component: NumberOfServices }],
//   ['Minimum distance to access points', { component: NumberOfServices }],
//   ['Area covered by GSM, 3G, and 4G', { component: NumberOfServices }],
//   ['Population', { component: SummaryWidget }]
// ]);

// export default widgetTemplates;


import NumberOfServices from '../widget-templates/number-of-services';
import MinimunDistance from '../widget-templates/minimun-distance';
import AccessPointsPercentage from '../widget-templates/points-percentage';
import AreaCoverage from '../widget-templates/area-coverage';

import SummaryWidget from '../summary-widget';

const widgetTemplates = new Map([
  ['Number of services', { component: NumberOfServices }],
  ['Access points percentage', { component: AccessPointsPercentage }],
  ['Minimum distance to access points', { component: MinimunDistance }],
  ['Area covered by GSM, 3G, and 4G', { component: AreaCoverage }],
  ['Population', { component: SummaryWidget }]
]);

export default widgetTemplates;
