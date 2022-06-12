import { POPULAR_VIDEOS_FAIL, POPULAR_VIDEOS_REQUEST, POPULAR_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes"
import request from "../../api"

export const getPopularVideos = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: POPULAR_VIDEOS_REQUEST
        })
        const { data } = await request.get("/videos", {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                regionCode: "IN",
                maxResults: 20,
                pageToken: getState().popularVideos.nextPageToken,
            }
        })

        dispatch({
            type: POPULAR_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: "All"
            }
        })
        // console.log(res);
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: POPULAR_VIDEOS_FAIL,
            payload: error.message
        })
    }
}

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try{
        dispatch({
            type: POPULAR_VIDEOS_REQUEST
        })
        const { data } = await request.get("/search", {
            params: {
                part: "snippet",
                q:keyword,
                type: "video",
                maxResults: 20,
                pageToken: getState().popularVideos.nextPageToken
            }
        })
        dispatch({
            type: POPULAR_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        })
    }catch(err){
        console.log(err.message);
        dispatch({
            type: POPULAR_VIDEOS_FAIL,
            payload: err.message
        })
    }
}

export const getVideoById = (id) =>async dispatch => {
    try{
        dispatch({
            type: SELECTED_VIDEO_REQUEST,
        })
        const {data} = await request('/videos', {
            params: {
                part: 'snippet, statistics',
                id,
            }
        })
        dispatch({
            type: SELECTED_VIDEO_SUCCESS,
            payload: data.items[0]
        })
    }catch(err) {
        console.log(err.message);
        dispatch({
            type: SELECTED_VIDEO_FAIL,
            payload: err.message
        })
    }
}