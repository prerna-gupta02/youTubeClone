import { POPULAR_VIDEOS_FAIL, POPULAR_VIDEOS_REQUEST, POPULAR_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";

export const popularVideosReducer = (state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All'
}, action) => {
    switch(action.type){
        case POPULAR_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case POPULAR_VIDEOS_SUCCESS:
            return{
                ...state,
                videos: state.activeCategory === action.payload.category?[...state.videos,...action.payload.videos]:action.payload.videos,
                loading: false,
                nextPageToken: action.payload.nextPageToken,
                activeCategory: action.payload.category
            }
        
        case POPULAR_VIDEOS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state
    }    
}

export const selectVideoReducer = (state = {
    loading: true,
    video: null,
    },
    action
) => {
    const {payload, type} = action
    switch(type){
        case SELECTED_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false
            }
        case SELECTED_VIDEO_FAIL:
            return {
                ...state,
                video: null,
                loading: false,
                error: payload
            }
        default:
            return state
    }
}