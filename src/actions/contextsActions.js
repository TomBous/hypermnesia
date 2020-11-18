import axios from "axios";
import { GET_CONTEXTS, GET_ERRORS, GET_CONSTRAINTS } from "./types";

export const findContexts = (idKnowledge) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/contexts/get_contexts", { params: {idKnowledge: idKnowledge} });
        if (res.data.success === 1 && res.status === 200) {
            console.log(res.data.message)
            dispatch({
                type: GET_CONTEXTS,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_CONTEXTS,
                payload: ["Aucun contexte"],
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const addContext = (context) => async (dispatch) => {
    try {
        const res = await axios.post("http://127.0.0.1:8080/api/contexts/add_context", context);
        if (res.data.success === 0) {
            console.log(res.data.message)
            dispatch({
                type: GET_ERRORS,
                payload: res.data.message,
            })

        } else {
            return;
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};