import axios from "axios";
import { GET_ERRORS, SHOW_ERRORS, GET_KNOWLEDGE } from "./types";


export const addKnowledge = (data, history) => async (dispatch) => {
    try {
        console.log("ADDD KNOWLEDGE")
        const res = await axios.post("http://127.0.0.1:8080/api/knowledges/add", data);
        console.log(res.data.message);
        if (res.data.success === 0 && res.status === 400) {
            dispatch({
                type: SHOW_ERRORS,
                payload: res.data.message,
            })

        } else {
            if (res.data.success === 1) {
                history.push(`/knowledge/${res.data.knowledgeId}`);
            }
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const findKnowledge = (idKnowledge) => async (dispatch) => {
    try {
        console.log("find KNOWLEDGE")
        const res = await axios.get(`http://127.0.0.1:8080/api/knowledges/${idKnowledge}`);
        console.log(res.data.message);
        if (res.data.success === 0 && res.status === 400) {
            dispatch({
                type: SHOW_ERRORS,
                payload: res.data.message,
            })

        } else {
            if (res.data.success === 1) {
                dispatch({
                    type: GET_KNOWLEDGE,
                    payload: res.data.message[0],
                })
            }
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};