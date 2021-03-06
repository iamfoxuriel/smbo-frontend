import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createHashHistory';
import DevTools from '../../modules/common/containers/devTools';
//import createHistory from 'history/lib/createBrowserHistory';
import getRoutes from '../routes';
// import apiRequester from '../middlewares/apiRequester';
// import assembleApiRequester from '../middlewares/assembledApiRequester';
import rootReducer from '../reducers';


const finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ getRoutes, createHistory }),
    applyMiddleware(createLogger()),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
