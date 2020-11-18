import axios from "axios";
import { GET_KNOWLEDGES, GET_ERRORS, GET_PERSPECTIVES, SET_PERSPECTIVE, GET_TAGS } from "./types";

export const findPinnedKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/pinned", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const findMyKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/mine", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findFavKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/favorited", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findTrendingKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/trending", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findLastKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/last", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findUsefullKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/usefull", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findTopFavKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/top_favorited", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findFlaggedKn = (data, history) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/flagged", { params: data });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_KNOWLEDGES,
                payload: "",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findPerspectives = () => async (dispatch) => {
    try {
        console.log("recupération perspectives")
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/perspectives");
        console.log(res)
        if (res.data.success === 1 && res.status === 200) {
            console.log(res.data.message);
            const perspectives = res.data.message.map(({ id: value, name: label, ...rest }) => ({ value, label, ...rest })); // Modification des keys des objets
            dispatch({
                type: GET_PERSPECTIVES,
                payload: perspectives,
            })

        } else {
            dispatch({
                type: GET_PERSPECTIVES,
                payload: 0,
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};
export const findTags = (idPerspective) => async (dispatch) => {
    try {
        const res = await axios.get("http://127.0.0.1:8080/api/knowledges/tag_list", { params: idPerspective });
        if (res.data.success === 1 && res.status === 200) {
            dispatch({
                type: GET_TAGS,
                payload: res.data.message,
            })

        } else {
            dispatch({
                type: GET_TAGS,
                payload: "Aucun tag",
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error,
        });
    }
};

export const setPerspective = (perspective) => async (dispatch) => {
    dispatch({
        type: SET_PERSPECTIVE,
        payload: perspective,
    })
};