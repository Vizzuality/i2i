import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import classnames from 'classnames';

// styles
import './styles.scss';

// Components
import Modal from 'components/modal';
import LayerInfo from 'components/list/layer-info';

class ListComponent extends React.Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    selectedLayers: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    onClickInfo: PropTypes.func
  }

  state = {
    infoModal: false,
    info: {
      text: null,
      url: null,
      name: null
    }
  }

  static defaultProps = {
    selectedLayers: [],
    onClickInfo: null
  }

  onClickInfo = (e, item) => {
    e.stopPropagation();
    this.setState({ infoModal: true, info: item.info })
    if (this.props.onClickInfo) this.props.onClickInfo(item);
  }

  clickItem(row) {
    this.props.onSelect(row);
  }

  render() {
    const { rows, labelField, selectedLayers } = this.props;
    const { url, text } = this.state.info;

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
              <div
                key={label}
                className="list-item-button"
                onClick={() => this.clickItem(row)}
              >
                <div className="switch-container">
                  <span className="item-button-switch" />
                  <div className="name-container">
                    <h3 className="item-button-title">{label}</h3>
                    {!!count && <h4 className="item-button-subtitle">({count})</h4>}
                  </div>
                </div>
                {row.info &&
                  <button className="btn-info" onClick={e => this.onClickInfo(e, row)}>
                    <svg className="icon icon-info">
                      <use xlinkHref="#icon-info" />
                    </svg>
                  </button>
                }
              </div>
            </div>
          );
        })}

        <Modal
          open={this.state.infoModal}
          onClose={() => {
            this.setState({ infoModal: false });
          }}
        >
          <LayerInfo
            text={text}
            url={url}
          />
        </Modal>
      </div>
    );
  }
}

export default ListComponent;
