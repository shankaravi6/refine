import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reduxReducer from "./store/index.js";
import { Provider } from 'react-redux';



const rootReducer = combineReducers({
  shopping: reduxReducer
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
