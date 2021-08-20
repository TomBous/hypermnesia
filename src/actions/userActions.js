import axios from "axios";
import { GET_ERRORS, SHOW_ERRORS, SET_CURRENT_USER, GET_PERSPECTIVES } from "./types";
import setJWTToken from "../utils/setJWTToken";
import jwt_decode from "jwt-decode";

export const register = (newUser, history) => async (dispatch) => {
    try {
        const res = await axios.post("http://127.0.0.1:8080/api/users", newUser);
        console.log(res.data.message);
        if (res.data.success === 0 && res.status === 200) {
            dispatch({
                type: SHOW_ERRORS,
                payload: res.data.message,
            })

        } else {
            history.push("/login");
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
}

export const login = (LoginRequest, history) => async (dispatch) => {
    try {
        const res = await axios.post("https://wiki.thomasbousquet.me/api/users/login", LoginRequest);
        if (res.data.success === 0) {
            console.log("if error!")
            dispatch({
                type: SHOW_ERRORS,
                payload: res.data.message,
            })

        } else {
            // Extraction du token
            const { token } = res.data;
            // Stockage du token en localStorage
            localStorage.setItem("Token", token);
            //On met le token dans l'entete par défaut
            setJWTToken(token);
            //On décode le token et on le dispatch
            const decodedUser = jwt_decode(token);
            dispatch({
                type: SET_CURRENT_USER,
                payload: decodedUser,
            });
            // On récupère les perspectives
            const perspectives = await axios.get("http://127.0.0.1:8080/api/knowledges/perspectives");
            if (perspectives.data.success === 1 && perspectives.status === 200) {
                console.log(perspectives.data.message);
                const perspectivesList = perspectives.data.message.map(({ id: value, name: label, ...rest }) => ({ value, label, ...rest })); // Modification des keys des objets
                dispatch({
                    type: GET_PERSPECTIVES,
                    payload: perspectivesList,
                })

            } else {
                dispatch({
                    type: GET_PERSPECTIVES,
                    payload: 0,
                })
            }
            history.push("/dashboard");
        }

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("Token");
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {},
    })
}

export const editUser = (editedUser, history) => async (dispatch) => {
    try {
        const res = await axios.patch("http://127.0.0.1:8080/api/users/edit", editedUser);
        if (res.data.success === 0) {
            dispatch({
                type: GET_ERRORS,
                payload: res.data.message,
            });
        } else {
            const { token } = res.data
            localStorage.removeItem("Token");
            setJWTToken(false);
            localStorage.setItem("Token", token);
            setJWTToken(token);
            const decodedUser = jwt_decode(token);
            dispatch({
                type: SET_CURRENT_USER,
                payload: decodedUser,
            });
            history.push("/account");
        }
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err,
        });

    }
};