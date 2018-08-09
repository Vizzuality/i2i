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

                  <p>Lorem ipsum ullam id dolor id nibh ultricies vehicula
                    ut id elit. Donec id elit non mi porta gravida at eget metus.
                    Donec id elit non mi porta gravida at eget metus. Integer posuere
                    erat a ante venenatis dapibus posuere velit aliquet.
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
