import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './composants/Login';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Trading from './composants/Trading';
import Register from './composants/Register';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/trading' element={<Trading />} />
    <Route path='/register' element={<Register />} />
    </Routes>
    <Login />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
