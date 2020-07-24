import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider }from 'react-redux';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBurgerBuilder, watchOrder} from './store/sagas';

const composeEnhancers =process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
const rootReducer = combineReducers({
  burgerBuilder:burgerBuilderReducer,
  order:orderReducer,
  auth:authReducer
})

const segaMiddleware = createSagaMiddleware()

const store=createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, segaMiddleware)
));

segaMiddleware.run(watchAuth);
segaMiddleware.run(watchBurgerBuilder);
segaMiddleware.run(watchOrder);
// console.log(store.getState());
const app=(
  <Provider store={store}>
    <BrowserRouter basename='/BurgerLove'>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>
  
);
ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
