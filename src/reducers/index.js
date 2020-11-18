import { combineReducers } from "redux";
import errorReducer from "./errorReducer"
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";
import knowledgdeReducer from "./knowledgeReducer";

export default combineReducers({
    errors: errorReducer,
    security: userReducer,
    dashboard: dashboardReducer,
    knowledge: knowledgdeReducer,
});
