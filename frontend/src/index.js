import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";
// import {Provider} from "react-redux";
// import {store} from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/*<Provider store={store}>*/}
            <App></App>
        {/*</Provider>*/}
    </BrowserRouter>
);

reportWebVitals();
