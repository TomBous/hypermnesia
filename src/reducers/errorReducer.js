import { GET_ERRORS, SHOW_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        case SHOW_ERRORS:
            return {
                message : action.payload,
            };
        default:
            return state;
    }
}