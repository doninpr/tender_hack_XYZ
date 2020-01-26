import { API_GET_ARCS_START, API_GET_ARCS_QUERY, API_GET_ARCS_FINISH, ARCS_RENDER, ARCS_HIDE, OBOTOR_HIDE, POSTAV_HIDE, ZAKAZ_HIDE } from "../actionTypes";

const initialState = {
  ArcLayer: {
    isLoading: false,
    isFinished: false,
    isRendered: false,
    data: [],
    isHide: false,
  },
  layers: {
    postav: false,
    zakaz: false,
    oborot: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case API_GET_ARCS_START: {
      return {
        ...state,
        ArcLayer: {
          ...state.ArcLayer,
          isLoading: true,
          isFinished: false,
          data: [],
        }
      };
    }
    case API_GET_ARCS_QUERY: {
      return {
        ...state,
        ArcLayer: {
          ...state.ArcLayer,
          isLoading: true,
          isFinished: false,
          isRendered: false,
          data: [
            ...state.ArcLayer.data,
            ...action.payload.result,
          ]
        },
      };
    }
    case API_GET_ARCS_FINISH: {
      return {
        ...state,
        ArcLayer: {
          ...state.ArcLayer,
          isLoading: false,
          isFinished: true,
        },
      };
    }
    case ARCS_RENDER: {
      return {
        ...state,
        ArcLayer: {
          ...state.ArcLayer,
          isRendered: true,
        },
      };
    }
    case ARCS_HIDE: {
      return {
        ...state,
        ArcLayer: {
          ...state.ArcLayer,
          isHide: action.payload.status,
        },
      };
    }
    case ZAKAZ_HIDE: {
      return {
        ...state,
        layers: {
          ...state.layers,
          postav: false,
          zakaz: action.payload.status,
          oborot: false
        },
      };
    }
    case POSTAV_HIDE: {
      return {
        ...state,
        layers: {
          ...state.layers,
          postav: action.payload.status,
          zakaz: false,
          oborot: false
        },
      };
    }
    case OBOTOR_HIDE: {
      return {
        ...state,
        layers: {
          ...state.layers,
          postav: false,
          zakaz: false,
          oborot: action.payload.status
        },
      };
    }
    default:
      return state;
  }
}
