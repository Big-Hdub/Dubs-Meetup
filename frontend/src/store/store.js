import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import groupReducer from './groups';
import eventReducer from './events';
import userReducer from './users';
import venueReducer from './venues';
import memberReducer from './members';

const rootReducer = combineReducers({
    session: sessionReducer,
    groups: groupReducer,
    events: eventReducer,
    users: userReducer,
    venues: venueReducer,
    members: memberReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import("redux-logger")).default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
