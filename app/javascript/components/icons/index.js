import React from 'react';

class Icons extends React.Component {
  shouldComponentUpdate() {
    // This component doesn't need to re-render because
    // everything is static
    return false;
  }

  render() {
    return (
      <svg ariaHidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <defs>
            <symbol id="icon-analysis" viewBox="0 0 36 32">
            <title>analysis</title>
            <path d="M0 27h36v5h-36v-5z"></path>
            <path d="M6 24h3c0.828 0 1.5-0.672 1.5-1.5v-13.5c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828 0-1.5 0.672-1.5 1.5v13.5c0 0.828 0.672 1.5 1.5 1.5z"></path>
            <path d="M16.5 24h3c0.828 0 1.5-0.672 1.5-1.5v-21c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828 0-1.5 0.672-1.5 1.5v21c0 0.828 0.672 1.5 1.5 1.5z"></path>
            <path d="M25.5 15v7.5c0 0.828 0.672 1.5 1.5 1.5h3c0.828 0 1.5-0.672 1.5-1.5v-7.5c0-0.828-0.672-1.5-1.5-1.5h-3c-0.828 0-1.5 0.672-1.5 1.5z"></path>
            </symbol>
            <symbol id="icon-layers" viewBox="0 0 34 32">
            <title>layers</title>
            <path d="M29.111 17.709l4.164 2.863-16.636 11.429-16.636-11.429 4.158-2.861 12.478 8.575 12.472-8.577zM16.64 0l16.632 11.429-16.632 11.429-16.64-11.429 16.64-11.429z"></path>
            </symbol>
            </defs>
      </svg>
    );
  }
}

export default Icons;