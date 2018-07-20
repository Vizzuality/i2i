import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import classnames from 'classnames';

// styles
import './styles.scss';

class ListComponent extends React.Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    onSelectType: PropTypes.func.isRequired
  }

  clickType(sector, type) {
    this.props.onSelectType(sector, type);
  }

  render() {
    const { rows } = this.props;

    return (
      <div className="c-list">
        {rows.map(row => (
          <button
            key={row.type}
            onClick={() => this.clickType(row.sector, row.type)}
          >
            { `${row.type} (${Numeral(row.count).format('0,0')})` }
          </button>
        ))}
      </div>
    );
  }
}

export default ListComponent;
