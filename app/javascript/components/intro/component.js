import React from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class IntroComponent extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  componentWillMount() {
    this.props.fetchIntro();
  }

  render() {
    const { data } = this.props;

    return (
      <div className='c-fsp-intro row'>
        <div className='grid-m-6'>
          {
            data.map((item, index) => (
              <div key={item['label']} className='grid-m-3'>
                <div className='intro-label'>{item['label']}</div>

                {item['percentage'] &&
                  <div>
                    <div className='intro-main-value'>{item['percentage']}</div>
                    <div className='intro-sub-value'>({item['value']})</div>
                  </div>
                }

                {!item['percentage'] &&
                  <div className='intro-main-value'>{item['value']}</div>
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default IntroComponent;
