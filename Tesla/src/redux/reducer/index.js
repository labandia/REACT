import { combineReducers } from "redux";
import { carsReducer } from "./carReducer";

const reducers = combineReducers({
    cars:  carsReducer,
});

export default reducers;