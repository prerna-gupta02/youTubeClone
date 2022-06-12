import { LOAD_USER_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actionTypes"

const initialState = {
    accessToken: sessionStorage.getItem("utube-accessToken") ? sessionStorage.getItem("utube-accessToken") : null,
    user: sessionStorage.getItem("utube-userProfile") ? JSON.parse(sessionStorage.getItem("utube-userProfile")) : null,
    loading: false
}

export const authReducer = (prevState = initialState, action) => {

    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...prevState,
                loading: true
            }

        case LOGIN_SUCCESS:
            return {
                ...prevState,
                accessToken: action.payload,
                loading: false
            }

        case LOGIN_FAIL:
            return {
                ...prevState,
                accessToken: null,
                loading: false,
                error: action.payload
            }
        
        case LOAD_USER_PROFILE:
            return {
                ...prevState,
                user: action.payload
            }

        case LOGOUT:
            return {
                ...prevState,
                accessToken: null,
                user: null
            }

        default:
            return prevState
    }
}