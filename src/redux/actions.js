import {
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE
} from "./actionTypes";

export const mapboxReady = () => ({
  type: MAPBOX_READY,
  payload: {}
});

export const mapboxViewportChange = (viewport) => ({
  type: MAPBOX_VIEWPORT_CHANGE,
  payload: {
    viewport
  }
});

export const changeWindowSize = (width, height) => ({
  type: RESIZE_WINDOW,
  payload: {
  	width,
  	height
  }
});