import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import widgetTemplates from './templates';

// components
import WidgetWrapperComponent from 'components/widget';

// styles
import './styles.scss';

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

          return (
            <WidgetWrapperComponent
              key={widget.id}
              menuItem
              {...widget}
            >

              {({ widgetData, menuItem }) => (
                <Fragment>
                  {widgetData && widgetData.length &&
                    <Widget
                      key={widget.title}
                      menuItem={menuItem}
                      widgetData={widgetData}
                      {...widget}
                    />
                  }
                  {(!widgetData || widgetData.length) === 0 &&
                    <div>
                      No data available
                    </div>
                  }
                </Fragment>
              )}
            </WidgetWrapperComponent>
          );
        })
        }
      </div>
    );
  }
}

export default AnalysisResultComponent;
