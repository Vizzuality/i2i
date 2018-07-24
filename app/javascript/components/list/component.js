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

          return (
            <button
              key={label}
              onClick={() => this.clickItem(row)}
            >
              {label} {!!count && `(${count})`}
            </button>
          );
        })}
      </div>
    );
  }
}

export default ListComponent;
