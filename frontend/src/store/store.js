import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux';
import attendeeReducer from './attendees';
import sessionReducer from './session';
import memberReducer from './members';
import { thunk } from 'redux-thunk';
import groupReducer from './groups';
import eventReducer from './events';
import venueReducer from './venues';
import userReducer from './users';

const rootReducer = combineReducers({
    attendees: attendeeReducer,
    session: sessionReducer,
    members: memberReducer,
    groups: groupReducer,
    events: eventReducer,
    venues: venueReducer,
    users: userReducer
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
