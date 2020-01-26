import {
	MAPBOX_READY,
	RESIZE_WINDOW,
	MAPBOX_VIEWPORT_CHANGE,
  API_GET_ARCS_START,
  API_GET_ARCS_QUERY,
  API_GET_ARCS_FINISH,
  ARCS_RENDER,
  ARCS_HIDE,
  OBOTOR_HIDE, POSTAV_HIDE, ZAKAZ_HIDE
} from "./actionTypes";
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import _ from "lodash";

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

export const startFetchArcs = () => ({
  type: API_GET_ARCS_START,
  payload: {}
});

export const queryFetchArcs = ( result ) => ({
  type: API_GET_ARCS_QUERY,
  payload: {
    result
  }
});

export const finishFetchArcs = () => ({
  type: API_GET_ARCS_FINISH,
  payload: {}
});

export const renderArcs = () => ({
  type: ARCS_RENDER,
  payload: {}
});

export const hideArcs = (status) => ({
  type: ARCS_HIDE,
  payload: {
    status
  }
});

export const hideZakaz = (status) => ({
  type: ZAKAZ_HIDE,
  payload: {
    status
  }
});

export const hidePostav = (status) => ({
  type: POSTAV_HIDE,
  payload: {
    status
  }
});

export const hideOborot = (status) => ({
  type: OBOTOR_HIDE,
  payload: {
    status
  }
});





///////////////////////


const client = new ApolloClient({
  uri: 'http://185.200.241.126:8080/v1/graphql',
});


export const fetchArcs = (step = 1) => {
  const limit = 10000;
  const offset = limit*(step-1);
  console.log(step);
  return dispatch => {
    dispatch(startFetchArcs());
    client
      .query({
        query: gql`
          query MyQuery {
            ofertas(limit: 10426, order_by: {start_date: asc}, offset: 220000) {
              reg_postavki
              reg_postavshika
            }
          }
        `
      })
      .then(result => {
        let data = [];

        _.map(result.data.ofertas, (obj) => {
          _.map(obj.reg_postavki, (reg) => {
            data.push({
              reg_postavshika: obj.reg_postavshika,
              reg_postavki: reg,
            });
          });
        });

        dispatch(queryFetchArcs(data));
        if(step < 1){
          dispatch(fetchArcs((step+1)));
        } else {
          dispatch(finishFetchArcs()); 
        }
      });
  }
}