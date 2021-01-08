import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import LogoutPage from './components/LoginPage/LogoutPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import FormPage from './components/FormPage/Form';
import Axios from 'axios';

function App() {
  const [inputData, setInputData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [userData, setUserData] = useState(null);

  const handlerRegister = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: inputData,
      withCredentials: true,
      url: "http://localhost:5000/api/users/register",
    }).then((res) => console.log(res));
  };
  const handlerLogin = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: "http://localhost:5000/api/users/login",
    }).then((res) => console.log(res));
  };
  const handlerLogout = (e) => {
    e.preventDefault();
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/users/logout",
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/users/user",
    }).then((res) => {
      setUserData(res.data);
      console.log(res.data);
    });
  };
  return (
    <div className="App">
      {/* <div>
        <h1>Register Page</h1>
        <form method="post" onSubmit={handlerRegister}>
          <label>name</label>
          <input type="text" name="name" onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
          <label>Email</label>
          <input type="email" name="email" onChange={(e) => setInputData({ ...inputData, email: e.target.value })} />
          <label>password</label>
          <input type="password" name="password" onChange={(e) => setInputData({ ...inputData, password: e.target.value })} />
          <br />
          <button type="submit" > 가입하기 </button>
        </form>
      </div>
      <hr />

      <div>
        <h1>Login</h1>
        <form method="post" onSubmit={handlerLogin}>
          <label>Email</label>
          <input type="email" name="email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <label>password</label>
          <input type="password" name="password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <br />
          <button type="submit" > Login </button>
          <button type="submit" onClick={handlerLogout}> 로그아웃 </button>
        </form>
      </div>
      <hr />
        
      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {userData ? <h1>Welcome Back {userData.name}</h1> : null}
      </div>
      */}
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/form' component={FormPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/logout' component={LogoutPage} />
          <Route path='/register' component={RegisterPage} />
        </Switch>
      </BrowserRouter>
    </div>

  );

}

export default App;
