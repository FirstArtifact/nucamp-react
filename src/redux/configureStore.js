import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ConfigureStore = () => {
    const store = createStore(
        
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        }),
        composeWithDevTools(),
        applyMiddleware(thunk, logger),
        //composeWithDevTools()
    );
    return store;
}