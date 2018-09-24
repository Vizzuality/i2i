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
              <li key={item.value}>
                <button
                  className={
                    classnames({
                      tab: true,
                      selected: selected === item.value
                    })
                  }
                  onClick={() => this.props.onSelect(item.value)}
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
