import axios from "axios";
import { GET_SOLUTIONS, GET_ERRORS, SHOW_ERRORS, ADD_SOLUTIONS } from "./types";

export const findSolutions = (data) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/solutions/get_solutions", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            console.log(res.data.message)
            dispatch({
                type: GET_SOLUTIONS,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_SOLUTIONS,
                payload: "No solutions",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const addSolution = (solution, history) => async (dispatch) => {
    try {
        const res = await axios.post("http://127.0.0.1:8080/api/solutions/add_solution", solution);
        console.log(res.data.message);
        if (res.data.success === 0 && res.status === 200) {
            dispatch({
                type: SHOW_ERRORS,
                payload: res.data.message,
            })

        } else {
            dispatch(findSolutions({idKnowledge: solution.idKnowledge}));
            dispatch({
                type: ADD_SOLUTIONS,
                payload: res.data.message,
            })
            history.push(history.location.pathname);
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};