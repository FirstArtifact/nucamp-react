import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState,
        composeWithDevTools()
    );

    return store;
};