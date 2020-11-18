import { GET_SOLUTIONS, ADD_SOLUTIONS, GET_CONTEXTS, GET_CONSTRAINTS, GET_KNOWLEDGE } from "../actions/types";

const initialState = {
    informations: {
        contexts: [],
        constraints: []
    },
};


export default function (state = initialState, action) {
    switch(action.type) {
        case GET_SOLUTIONS:
            return {
                ...state,
                solutions: action.payload,
            };
        case ADD_SOLUTIONS:
            return {
                ...state,
                status: action.payload,
            };
        case GET_CONTEXTS:
            return {
                ...state,
                informations: {
                    ...state.informations,
                    contexts : action.payload,
                }
            };
        case GET_CONSTRAINTS:
            return {
                ...state,
                informations: {
                    ...state.informations,
                    constraints : action.payload,
                }
            };
        case GET_KNOWLEDGE:
            return {
                ...state,
                problematic: action.payload
            };
        default:
            return state;
    }
}