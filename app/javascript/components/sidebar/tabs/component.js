import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'components/icon';


// styles
import './styles.scss';

class TabsComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  static defaultProps = { items: [] }

  render() {
    const { selected, items } = this.props;

    return (
      <div className="c-tabs">
        <ul>
          {
            items.map(item => (
              <button className="tabs-button" onClick={() => this.props.onSelect(item.value)}>
                <li className="tab" key={item.value}>
                  <div className={classnames('tab-item', { '-selected': selected === item.value })}>
                    <Icon
                      name={`${item.value}`}
                      className={classnames('sidebar-icon', { '-selected': selected === item.value })}
                    />

                    {item.label}

                  </div>
                </li>
              </button>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default TabsComponent;
