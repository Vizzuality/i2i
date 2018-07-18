import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// styles
import './styles.scss';

class TabsComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  clickTab(tab) {
    this.props.onSelect(tab);
  }

  render() {
    const { selected, items } = this.props;

    return (
      <div className="c-tabs">
        <ul>
          {
            items.map(item => (
              <li key={item.value}>
                <button
                  className={
                    classnames({
                      tab: true,
                      selected: selected === item.value
                    })
                  }
                  onClick={() => this.clickTab(item.value)}
                >
                  {item.label}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default TabsComponent;
