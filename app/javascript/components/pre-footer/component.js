import React, { PureComponent } from 'react';

// styles
import './styles.scss';

class PreFooter extends PureComponent {
  onSubscribe = () => console.info('on subscribe – I am WIP!');

  render() {
    return (
      <div className="c-pre-footer">
        <div className="new-datasets">
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="grid-s-12 grid-l-8">
                  <h3>Add your own data sets.</h3>

                  <p>
                    If you have your own geospatial data that you would like to
                    deposit on the i2i platform to enhance financial inclusion
                    in Africa and Asia, please email us on <a href="mailto:info@i2ifacility.org">info@i2ifacility.org</a>.
                    We will then contact you with the next steps. In the near
                    future, you will be able to log in and upload your data
                    directly onto our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreFooter;
