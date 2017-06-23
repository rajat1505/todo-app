import { createStore, applyMiddleware } from 'redux';
import toDoReducer from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [ sagaMiddleware, createLogger ];

const store = createStore( toDoReducer, applyMiddleware( ...middlewares ) );

sagaMiddleware.run( rootSaga );

export default store;
