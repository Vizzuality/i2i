import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import classnames from 'classnames';

// styles
import './styles.scss';

class ListComponent extends React.Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  clickItem(row) {
    this.props.onSelect(row);
  }

  render() {
    const { rows, labelField } = this.props;

    return (
      <div className="c-list">
        {rows.map((row) => {
          const label = row[labelField];
          const count = !!row.count && Numeral(row.count).format('0,0');
          const switchClassName = classnames({
            'item-button-switch': true,
            '-checked': false // you should check that it's id is present in the selected layers from redux
          });

          return (
            <div className="list-item">
              <button
                key={label}
                className="list-item-button"
                onClick={() => this.clickItem(row)}
              >
                <span className={switchClassName} />

                <div>
                  <h3 className="item-button-title">{label}</h3>
                  {!!count && <h4 className="item-button-subtitle">({count})</h4>}
                </div>

              </button>
            </div>

          );
        })}
      </div>
    );
  }
}

export default ListComponent;
