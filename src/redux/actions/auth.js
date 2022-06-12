import firebase from 'firebase/compat/app'
import auth from '../../firebase'
import { LOAD_USER_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../actionTypes'

export const login = () => async dispatch => {
    try{
        dispatch({
            type: LOGIN_REQUEST
        })
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')
        const response = await auth.signInWithPopup(provider)
        // console.log(response)

        const accessToken = response.credential.accessToken
        const userProfile = {
            name: response.additionalUserInfo.profile.name,
            photoUrl: response.additionalUserInfo.profile.picture
        }

        sessionStorage.setItem("utube-accessToken", accessToken)
        sessionStorage.setItem("utube-userProfile", JSON.stringify(userProfile))

        dispatch({
            type: LOGIN_SUCCESS,
            payload: accessToken
        })

        dispatch({
            type: LOAD_USER_PROFILE,
            payload: userProfile
        })
    }catch(err) {
        console.log(err.message)

        dispatch({
            type: LOGIN_FAIL,
            payload: err.message
        })
    }
}

export const logout = () => async dispatch => {
    await auth.signOut()

    dispatch({
        type: LOGOUT,
    })
    sessionStorage.removeItem("utube-accessToken");
    sessionStorage.removeItem("utube-userProfile")
}