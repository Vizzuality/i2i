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
    selectedLayers: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    onClickInfo: PropTypes.func
  }

  static defaultProps = {
    selectedLayers: [],
    onClickInfo: null
  }

  onClickInfo = item => this.props.onClickInfo && this.props.onClickInfo(item)

  clickItem(row) {
    this.props.onSelect(row);
  }

  render() {
    const { rows, labelField, selectedLayers } = this.props;

    return (
      <div className="c-list">
        {rows.map((row) => {
          const label = row[labelField];
          const count = !!row.count && Numeral(row.count).format('0,0');
          const listItemClassName = classnames({
            'list-item': true,
            '-checked': selectedLayers.includes(row.id)
          });

          return (
            <div key={row.id} className={listItemClassName}>
              <button
                key={label}
                className="list-item-button"
                onClick={() => this.clickItem(row)}
              >
                <span className="item-button-switch" />

                <div>
                  <h3 className="item-button-title">{label}</h3>
                  {!!count && <h4 className="item-button-subtitle">({count})</h4>}
                </div>

                <button className="btn-info" onClick={() => this.onClickInfo(row)}>
                  <svg className="icon icon-info">
                    <use xlinkHref="#icon-info" />
                  </svg>
                </button>

              </button>
            </div>

          );
        })}
      </div>
    );
  }
}

export default ListComponent;
