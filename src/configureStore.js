import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import { webSocketMiddleware } from './websocketMiddleware';
import { webrtcMiddleware } from './webrtcMiddleware';

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk, webSocketMiddleware, webrtcMiddleware));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducer = require('./reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
