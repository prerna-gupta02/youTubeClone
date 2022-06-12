import request from "../../api";
import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes";

export const getChannelDetails = (id) =>async dispatch => {
    try{
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        })
        const {data} = await request('/channels', {
            params: {
                part: 'snippet, statistics, contentDetails',
                id,
            }
        })
        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload: data.items[0]
        })
    }catch(err) {
        console.log(err.response.data);
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload: err.response.data
        })
    }
}

export const checkSubscriptionStatus = id =>async (dispatch, getState) => {
    console.log(getState().auth.accessToken)
    try{
        const {data} = await request('/subscriptions', {
            params: {
                part: 'snippet,contentDetails,statistics',
                channelId: id,
                // mine: true,
            },
            headers: {
                Authorization: `Bearer ${getState().auth.accessToken}`,
            },
        })
        dispatch({
            type: SET_SUBSCRIPTION_STATUS,
        })
        console.log(data);
    }catch(err) {
        console.log(err.response.data);
    }
}