import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Before
// import { ToastContainer } from './node_modules/react-toastify/dist/react-toastify.esm.mjs';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// After
// import Toastify from './node_modules/react-toastify/dist/react-toastify.esm.mjs';

// Now you can use it like this



ReactDOM.render(
  <React.StrictMode>
    <App />
   {/* <ToastContainer/> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
