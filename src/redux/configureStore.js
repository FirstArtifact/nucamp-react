import {createStore, combineReducers} from 'redux';
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ConfigureStore = () => {
    const store = createStore(
        composeWithDevTools(),
        combineReducers({
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        })
    );
    return store;
}