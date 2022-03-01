import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tudasbazis.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux"
import store from "./Redux/store"
import axios from "axios"
import { BrowserRouter } from "react-router-dom";
import "./scss/custom.scss"

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();