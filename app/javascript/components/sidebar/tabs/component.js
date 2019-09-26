import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


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
              <li className="tab" key={item.value}>
                <div className={
                classnames("tab-item", {
                  selected: selected === item.value
                })
              }>
                  <img className="sidebar-icon" src={`/images/icons/sidebar/${item.value}.svg`} alt={`${item.label}`} />
                  <button onClick={() => this.props.onSelect(item.value)}
                  >
                    {item.label}
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default TabsComponent;
