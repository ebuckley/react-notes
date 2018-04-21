
import {draftApp} from './reducers'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';

const loggerMiddleware = createLogger();

const store = createStore(
  draftApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ))

export {
  store
}