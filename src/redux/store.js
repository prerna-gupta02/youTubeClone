import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { authReducer } from './reducers/auth';
import { popularVideosReducer, selectVideoReducer } from './reducers/videos';
import {channelDetailsReducer} from './reducers/channel'

const reducer = combineReducers({
    auth: authReducer,
    popularVideos: popularVideosReducer,
    selectedVideo: selectVideoReducer,
    channelDetails: channelDetailsReducer,
})

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;