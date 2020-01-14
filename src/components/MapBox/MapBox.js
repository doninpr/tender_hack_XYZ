import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxViewportChange, mapboxReady } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  render() {
    //this._map <= use this to get map object

    return (
      <ReactMapGL
        ref={map => this._map = map}
        mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
        {...this.props.viewport}
        onViewportChange={(viewport) => this.updateViewport(viewport)}
        onLoad={() => this.props.mapboxReady()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
  	viewport: state.mapbox.viewport,
  };
};

export default connect(
  mapStateToProps,
  { mapboxViewportChange, mapboxReady },
)(MapBox);