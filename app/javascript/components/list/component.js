import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

// styles
import './styles.scss';

class ListComponent extends React.Component {
  static propTypes = { rows: PropTypes.array.isRequired }

  render() {
    const { rows } = this.props;

    return (
      <div className="c-list">
        {rows.map(row => (
          <div key={row.type}>
            { `${row.type} (${Numeral(row.count).format('0,0')})` }
          </div>
        ))}
      </div>
    );
  }
}

export default ListComponent;
