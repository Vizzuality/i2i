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
        {rows.map(row => (
          <button
            key={row[labelField]}
            onClick={() => this.clickItem(row)}
          >
            {`${row[labelField]} (${Numeral(row.count).format('0,0')})`}
          </button>
        ))}
      </div>
    );
  }
}

export default ListComponent;
