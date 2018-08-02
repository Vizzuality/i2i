import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class MenuItemsComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    const { items } = this.props;

    return (
      <div className="c-menu-items">
        {
          items.map(item => (
            <div
              tabIndex="0"
              role="button"
              key={item.value}
              className="menu-items-item"
              onClick={() => this.props.onSelect(item.value)}
            >
              <h3 className="title">
                {item.label}
              </h3>

              <div className="description">
                {item.text}
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default MenuItemsComponent;
