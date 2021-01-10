import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LoginPage/LogoutPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import FormPage from './components/FormPage/Form';
import DetailUserPage from './components/DetailUserPage/DetailUser';
import PrivateRoute from './hoc/PrivateRoute';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <PrivateRoute path='/form' component={FormPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/logout' component={LogoutPage} />
          <Route path='/register' component={RegisterPage} />
          <PrivateRoute path='/detail' component={DetailUserPage} />
        </Switch>
      </BrowserRouter>
    </div>

  );

}

export default App;
