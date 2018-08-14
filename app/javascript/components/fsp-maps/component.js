import React from 'react';
import PropTypes from 'prop-types';

// Components
import Intro from 'components/intro';
import Sidebar from 'components/sidebar';
import Map from 'components/map';
import PreFooter from 'components/pre-footer';
import Modal from 'components/modal';
import { Icons } from 'wri-api-components';

import './styles.scss';

export default class FSPMaps extends React.Component {
  static propTypes = {
    iso: PropTypes.string.isRequired,
    shortIso: PropTypes.string.isRequired,
    bbox: PropTypes.array.isRequired,
    setIso: PropTypes.func.isRequired,
    setShortIso: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { iso, shortIso, bbox } = this.props;
    this.props.setIso(iso);
    this.props.setShortIso(shortIso);
    this.props.setBBox(bbox);
  }

  render() {
    return (
      <div className="c-fsp-maps">
        <Intro />
        <div className="fsp-maps-tool">
          <Sidebar />
          <Map />
          <Icons />
          <Modal appElement="#main">
            {/* render here your components */}
            <div>Sample content</div>
          </Modal>
        </div>
        <PreFooter />
      </div>
    );
  }
}
