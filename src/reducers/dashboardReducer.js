import { GET_KNOWLEDGES, SET_PERSPECTIVE, GET_PERSPECTIVES, GET_TAGS, FILTER_KNOWLEDGES } from "../actions/types";

const initialState = {
    
};


export default function (state = initialState, action) {
    switch(action.type) {
        case GET_KNOWLEDGES:
            return {
                ...state,
                knowledges: action.payload,
            };
        case FILTER_KNOWLEDGES:
            return {
                ...state,
                knowledgesFiltered: action.payload,
            };
        case GET_PERSPECTIVES:
            return {
                ...state,
                perspectivesList: action.payload,
            };
        case SET_PERSPECTIVE:
            return {
                ...state,
                perspective: action.payload,
            };
        case GET_TAGS:
            return {
                ...state,
                tagList: action.payload,
            };
        default:
            return state;
    }
}