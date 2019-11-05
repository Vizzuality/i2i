
import NumberOfServices from '../widget-templates/number-of-services';
import SummaryWidget from '../summary-widget';

const widgetTemplates = new Map([
  ['Number of services', { component: NumberOfServices }],
  ['Access points percentage', { component: NumberOfServices }],
  ['Minimum distance to access points', { component: NumberOfServices }],
  ['Area covered by GSM, 3G, and 4G', { component: NumberOfServices }],
  ['Population', { component: SummaryWidget }]
]);

export default widgetTemplates;
