import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class MenuItemsComponent extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onBack: PropTypes.func.isRequired
  }

  render() {
    const { item } = this.props;

    return (
      <div className="c-menu-item">
        <div
          className="menu-item-header"
          tabIndex="0"
          role="button"
          onClick={() => this.props.onBack('')}

        >
          <h3 className="title">
            {item.label}
          </h3>

          <div className="description">
            {item.text}
          </div>
        </div>

        <div className="menu-item-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MenuItemsComponent;
