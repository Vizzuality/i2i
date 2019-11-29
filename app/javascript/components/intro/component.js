import React from 'react';
import PropTypes from 'prop-types';

import Item from './components/item';
import List from './components/list';


// styles
import './styles.scss';

class IntroComponent extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    distance: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    }).isRequired,
    setDistance: PropTypes.func.isRequired,
    fetchIntro: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchIntro();
  }

  render() {
    const { data, distance, setDistance, fetchIntro } = this.props;

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
                            {item.component && (
                              <Item
                                item={item}
                                setDistance={setDistance}
                                distance={distance}
                                fetchIntro={fetchIntro}
                              />)}
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
          </div>
        </div>
      </div>
    );
  }
}

export default IntroComponent;
