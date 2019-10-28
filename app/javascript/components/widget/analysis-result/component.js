import React from 'react';
import PropTypes from 'prop-types';

// components
//import Widget from 'components/widget';


import NumberOfServices from 'components/widget-templates/number-of-services';

// styles
import './styles.scss';
import WidgetWrapperComponent from '../component-recharts';

//const widgetTemplates = new Map({ 'Number of services': <NumberOfServices /> });

const widgetTemplates = new Map([
  ['Number of services', { component: NumberOfServices }],
  ['Access points percentage', { component: NumberOfServices }],
  ['Minimum distance to access points', { component: NumberOfServices }],
  ['Area covered by GSM, 3G, and 4G', { component: NumberOfServices }],
  ['Population', { component: NumberOfServices }]
  //
  // ['', { component: NumberOfServices }],
  // ['', { component: NumberOfServices }],
  // ['', { component: NumberOfServices }],
  // ['', { component: NumberOfServices }]
]);

class AnalysisResultComponent extends React.Component {
  static propTypes = {
    analysisActive: PropTypes.bool.isRequired,
    widgets: PropTypes.array,
    setAnalysisActive: PropTypes.func.isRequired
  }

  static defaultProps = { widgets: [] }

  render() {
    const { widgets, analysisActive } = this.props;
    return (
      <div className="c-sidebar-analysis-result">
        <div
          className="back-button"
          tabIndex="0"
          role="button"
          onClick={() => this.props.setAnalysisActive(!analysisActive)}
        >
          <h3 className="title">
            Back
          </h3>
        </div>
        {widgets.length && widgets.map((widget) => {
          const Widget = widgetTemplates.get(widget.title).component;

          console.log(Widget, 'widget completo')

          return (
            <WidgetWrapperComponent>
              <Widget
                key={widget.id}
                {...widget}
              />
            </WidgetWrapperComponent>
          );
        })}
      </div>
    );
  }
}

export default AnalysisResultComponent;
