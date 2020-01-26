import { combineReducers } from "redux";
import mapbox from "./mapbox";
import window from "./window";
import apollo from "./apollo";


export default combineReducers({
	mapbox,
	window,
	apollo,
});
