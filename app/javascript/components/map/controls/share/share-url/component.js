import React from 'react';

import Button from 'components/map/controls/share/button/button';

import './styles.scss';

class ShareUrlComponent extends React.Component {
  state = { copied: false };

  onCopyClick() {
    this.input.select();

    try {
      document.execCommand('copy');
      this.setState({ copied: true });

      setTimeout(() => {
        this.setState({ copied: false });
        this.input.blur();
      }, 2000);
    } catch (err) {
      console.warn('Oops, unable to copy');
    }
  }

  render() {
    const url = window.location.href;
    const { copied } = this.state;

    return (
      <div className="c-share-url">
        <h3>Share this page</h3>

        <div className="url-container">
          <input ref={(node) => { this.input = node; }} value={url} className="url" readOnly />
          <Button click={() => this.onCopyClick()} fill border>
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
      </div>
    );
  }
}

export default ShareUrlComponent;
