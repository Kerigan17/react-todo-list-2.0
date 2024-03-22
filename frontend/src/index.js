import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UserAuth from "./components/UserAuth/UserAuth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAuth></UserAuth>
  </React.StrictMode>
);

reportWebVitals();
