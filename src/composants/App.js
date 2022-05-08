import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Trading from './User/Trading';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { render } from '@testing-library/react';
import {ReactSession} from "react-client-session";

 
class App extends Component{
  render() {
      return(
        <>
            <Router>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/trading' element={<Trading />} />
                <Route path='/register' element={<Register />} />
              </Routes>
            </Router>
          
          </>
    )
  };
}
 
export default App
