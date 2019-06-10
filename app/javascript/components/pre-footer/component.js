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
                    If you have your own geospatial location data that you would like to deposit on the i2i platform to enhance financial inclusion in Africa and Asia. <a href="/datasets">Register and login</a> to your user area where you will have complete control over your profile and data uploads, manage, edit and delete location data.
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
