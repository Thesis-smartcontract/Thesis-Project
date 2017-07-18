import ReactDOM from 'react-dom';
import React from 'react';
import App from './Containers/App.jsx';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import reducers from './Reducers/RootReducer';

const store = createStore(reducers, applyMiddleware(ReduxThunk, ReduxPromise));

ReactDOM.render(<App store={store}/>, document.getElementById('app'));
// })



