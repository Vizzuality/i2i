import React from 'react';
import PropTypes from 'prop-types';

import Item from './components/item';
import List from './components/list';


// styles
import './styles.scss';

class IntroComponent extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchIntro: PropTypes.func.isRequired,
    iso: PropTypes.string
  }

  static defaultProps = { iso: null }

  componentWillMount() {
    this.props.fetchIntro();
  }

  render() {
    const { data, iso } = this.props;

    return (
      <div className="c-fsp-intro">
        <div className="wrapper">
          <div className="row">
            <div className="grid-s-12 grid-l-12">
              <div className="fsp-intro-header">

                <table
                  className="intro-table"
                >
                  <thead>
                    <tr>
                      {data.map(item => (
                        <th key={item.label}>
                          <div className="intro-label">
                            {!item.component && (item.label)}
                            {item.component && (<Item item={item} />)}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {data.map(item => (
                        item.type !== 'list' && (
                          <td key={item.label}>

                            <div className="intro-main-value">{item.value}</div>

                            {!!item.subvalue &&
                              <div className="intro-sub-value">({item.subvalue})</div>
                            }
                          </td>
                        )

                      ))}
                    </tr>
                  </tbody>
                </table>
                <List />
              </div>
            </div>
            <div className="grid-s-12 grid-l-5">
              {iso === 'HTI' && (
                <div className="l-supplied-by">
                  <a href="https://www.brh.ht/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/logos/brh.png" alt="BRH" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroComponent;
