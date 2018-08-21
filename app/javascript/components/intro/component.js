import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class IntroComponent extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetchIntro: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchIntro();
  }

  render() {
    const { data } = this.props;

    return (
      <div className="c-fsp-intro">
        <div className="wrapper">
          <div className="row">
            <table
              className="intro-table"
            >
              <thead>
                <tr>
                  {data.map(item => (
                    <th key={item.label}>
                      <div className="intro-label">
                        {item.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {data.map(item => (
                    <td key={item.label}>
                      <div className="intro-main-value">{item.value}</div>

                      {!!item.subvalue &&
                        <div className="intro-sub-value">({item.subvalue})</div>
                      }
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroComponent;
