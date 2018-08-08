import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import ActiveLayersIndicator from 'components/sidebar/active-layers-indicator';

// styles
import './styles.scss';

class MenuItemsComponent extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onBack: PropTypes.func.isRequired
  }

  render() {
    const { item, onBack } = this.props;

    return (
      <div className="c-menu-item">
        <div
          className="menu-item-header"
          tabIndex="0"
          role="button"
          onClick={() => onBack('')}
        >
          <h3 className="title">
            {item.label}
          </h3>

          <ActiveLayersIndicator />

          {/* <div className="description">
            {item.text}
          </div> */}
        </div>

        <div className="menu-item-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MenuItemsComponent;
