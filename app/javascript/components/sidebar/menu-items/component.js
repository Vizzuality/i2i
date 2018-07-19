import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class MenuItemsComponent extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onSelectMenuItem: PropTypes.func.isRequired
  }

  clickItem(item) {
    console.log(item);
    this.props.onSelectMenuItem(item);
  }

  render() {
    const { items } = this.props;

    return (
      <div className="c-sidebar-layers">
        {
          items.map(item => (
            <div key={item.value}>
              <button
                className="title"
                onClick={() => this.clickItem(item.value)}
              >
                {item.label}
              </button>

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
