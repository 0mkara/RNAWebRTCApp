import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';
import { webSocketMiddleware } from './websocketMiddleware';
import { webrtcMiddleware } from './webrtcMiddleware';

const middlewares = [ ReduxThunk, webSocketMiddleware, webrtcMiddleware ];
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}
const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;
