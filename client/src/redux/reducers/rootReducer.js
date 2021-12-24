import {combineReducers  } from "redux";
import { authReducer } from "./reducer-auth";

export const rootReducer=combineReducers({
    auth:authReducer
})