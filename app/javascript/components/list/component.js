/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
import classnames from 'classnames';
import Modal from 'components/modal';
import LayerInfo from 'components/list/layer-info';

import Icon from 'components/icon';

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

  state = {
    infoModal: false,
    info: {
      text: null,
      url: null,
      name: null
    }
  }

  onClickInfo = (e, item) => {
    e.stopPropagation();
    this.setState({ infoModal: true, info: item.info });
    if (this.props.onClickInfo) this.props.onClickInfo(item);
  }

  clickItem = (row) => {
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
          const user = window.gon.users_data.find(u => u.id === row.user_id);

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
                    {!!count && <div className="item-button-subtitle">({count})</div>}
                    {user && row.user_id && <h4>by {`${user.name} ${user.surname}`}</h4>}
                  </div>
                </div>

                <div className="item-icons">

                  {row.info &&
                    <button className="btn-info" onClick={e => this.onClickInfo(e, row)}>
                      <svg className="icon icon-info">
                        <use xlinkHref="#icon-info" />
                      </svg>
                    </button>
                  }
                  {row.sector && <Icon name="analysis" className={classnames('-small', { selected: selectedLayers.includes(row.id) })} />}
                </div>
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
