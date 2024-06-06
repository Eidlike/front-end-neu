/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <App/>
    <ToastContainer />
  </>
);
