import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class MenuItemsComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.string,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    setAnalysisActive: PropTypes.func
  }

  static defaultProps = {
    selected: '',
    setAnalysisActive: () => { }
  }

  onClickCountryReport = () => {
    if (this.props.selected === 'analysis') {
      this.props.onSelect('country');
      this.props.setAnalysisActive(true);
    }
  }

  render() {
    const { items, onSelect, selected } = this.props;

    return (
      <div className="c-menu-items">
        {
          items.map((item, index) => (
            <div
              tabIndex="0"
              role="button"
              key={item.value}
              className={classnames('menu-items-item', { '-inline': index === 0 })}
              onClick={() => onSelect(item.value)}
            >
              {item.type !== 'button' &&
                <Fragment>
                  <div className="item-header">
                    <span className="arrow este" />
                    <h3 className="title">
                      {item.label}
                    </h3>
                  </div>

                  <div className="description">
                    {item.text}
                  </div>
                </Fragment>
              }

              {item.type === 'button' &&
                <button
                  type="button"
                  className="c-button -sea -menu-button"
                  onClick={() => onSelect(item.value)}
                >
                  {item.label}
                </button>
              }

            </div>
          ))
        }
        {selected === 'analysis' &&
          <div className="menu-items-button">
            <button
              type="button"
              className="c-button -sea -menu-button"
              onClick={this.onClickCountryReport}
            >
              Country Report
            </button>
          </div>
        }

      </div>
    );
  }
}

export default MenuItemsComponent;
