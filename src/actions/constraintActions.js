import axios from "axios";
import { GET_ERRORS, GET_CONSTRAINTS } from "./types";

export const findConstraints = (idKnowledge) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/constraints/get_constraints", { params: {idKnowledge: idKnowledge} });
        if (res.data.success === 1 && res.status === 200) {
            console.log(res.data.message)
            dispatch({
                type: GET_CONSTRAINTS,
                payload: res.data.message,
            })
            
        } else {
            dispatch({
                type: GET_CONSTRAINTS,
                payload: ["Aucune contraintes"],
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const addConstraint = (constraint) => async (dispatch) => {
    try {
        const res = await axios.post("http://127.0.0.1:8080/api/constraints/add_constraint", constraint);
        if (res.data.success === 0) {
            console.log(res.data.message)
            dispatch({
                type: GET_ERRORS,
                payload: res.data.message,
            })

        } else {
            dispatch(findConstraints(constraint.idKnowledge));
            return;
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const deleteConstraint = (idConstraint, idKnowledge) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:8080/api/constraints/${idConstraint}`);
        if (res.data.success === 0) {
            dispatch({
                type: GET_ERRORS,
                payload: res.data.message,
            })

        } else {
            dispatch(findConstraints(idKnowledge));
            return;
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};