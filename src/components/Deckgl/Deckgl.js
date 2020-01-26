import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import {MapController} from 'deck.gl';
import {ArcLayer} from '@deck.gl/layers';
import { mapboxViewportChange, mapboxReady, fetchArcs, renderArcs } from '../../redux/actions';

class MapBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this._map = React.createRef();

    this.initialViewState = {
      longitude: 37.62209300000001,
      latitude: 55.75399399999374,
      zoom: 3.5,
      pitch: 45,
      bearing: 0
    };
  }

  updateViewport = viewport => {
  	this.props.mapboxViewportChange(viewport);
    this.setState({viewport});
  };

  render() {
    if(!this.props.arcLayer.isFinished && !this.props.arcLayer.isLoading){
      this.props.fetchArcs();
    }

    if(this.props.layers.oborot){
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy 1', 'visibility', 'none');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy', 'visibility', 'none');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy', 'visibility', 'visible');
    }

    if(this.props.layers.zakaz){
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy 1', 'visibility', 'visible');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy', 'visibility', 'none');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy', 'visibility', 'none');
    }

    if(this.props.layers.postav){
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy 1', 'visibility', 'none');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy copy', 'visibility', 'visible');
      this._map.getMap().setLayoutProperty('map-v2-geojson-21qquy', 'visibility', 'none');
    }

    let layers = [];

    if(!this.props.arcLayer.isHide && this.props.arcLayer.isFinished && !this.props.arcLayer.isRendered){
      const arcLayer = new ArcLayer({
        id: 'arc-layer',
        data: this.props.arcLayer.data,
        pickable: false,
        getWidth: 0.5,
        getHeight: 0.5,
        getSourcePosition: d => d.reg_postavshika,
        getTargetPosition: d => d.reg_postavki,
        getSourceColor: d => [0, 185, 69],
        getTargetColor: d => [19, 58, 172],
      });


      layers = [
        arcLayer
      ];

      //this.props.renderArcs();
    }

    return (
      <DeckGL
        initialViewState = { this.initialViewState }
        controller={{type: MapController, dragRotate: false}}
        layers={layers}
        onViewportChange={(viewport) => console.log('teeeeeeest!!!!')}
      >
        <ReactMapGL
          ref={map => this._map = map}
          mapboxApiAccessToken = { this.props.mapboxApiAccessToken }
          {...this.props.viewport}
          onViewportChange={(viewport) => this.updateViewport(viewport)}
          onLoad={() => this.props.mapboxReady()}
        />
      </DeckGL>
    );
  }
}

const mapStateToProps = state => {
  return {
  	viewport: state.mapbox.viewport,
    arcLayer: state.apollo.ArcLayer,
    layers: state.apollo.layers,
  };
};

export default connect(
  mapStateToProps,
  { mapboxViewportChange, mapboxReady, fetchArcs, renderArcs },
)(MapBox);