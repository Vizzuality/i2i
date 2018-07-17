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
      <div className='c-fsp-intro'>
        <div className="wrapper">
          <div className="row">          
            {
              data.map((item) => (
                <div key={item['label']} className='grid-m-2'>
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
      </div>
    );
  }
}

export default IntroComponent;
