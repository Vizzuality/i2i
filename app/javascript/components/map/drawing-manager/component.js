import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Constants
import { DRAWING_OPTIONS } from './constants';

// styles
// import './styles.scss';

class DrawingManagerComponent extends PureComponent {
  static propTypes = {
    map: PropTypes.object.isRequired,
    drawing: PropTypes.bool.isRequired,
    setDrawing: PropTypes.func.isRequired,
    setClearing: PropTypes.func.isRequired,
    setAreaOfInterestArea: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.map.on('pm:drawstart', (e) => {
      if (this.layer) {
        this.layer.remove();
        this.props.setAreaOfInterestArea({});
      }
    });

    this.props.map.on('pm:create', (e) => {
      this.layer = e.layer;
      this.props.setAreaOfInterestArea(e.layer.toGeoJSON());
      this.props.setDrawing(false);
    });
  }

  componentDidUpdate(prevProps) {
    const { drawing: prevDrawing } = prevProps;
    const { drawing: nextDrawing, clearing } = this.props;

    if (clearing) {
      if (this.layer) {
        this.layer.remove();
      }
      this.props.setAreaOfInterestArea({});
      this.props.setClearing(false);
    }

    if (prevDrawing !== nextDrawing) {
      if (nextDrawing) {
        this.props.map.pm.enableDraw('Poly', DRAWING_OPTIONS);
      } else {
        this.props.map.pm.disableDraw('Poly', DRAWING_OPTIONS);
      }
    }
  }

  render() {
    return null;
  }
}

export default DrawingManagerComponent;
