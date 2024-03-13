import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';

import RegisterPage from './components/RegisterPage/RegisterPage';
import FormPage from './components/form/Form';
import DetailUserPage from './components/DetailUserPage/DetailUser';
import DeatilPostPage from './components/Posts/Post/PostDetail';
import PrivateRoute from './hoc/PrivateRoute';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        {/*<PrivateRoute path='/form' component={FormPage} />*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/*<PrivateRoute path='/detail' component={DetailUserPage} />*/}
        <Route path="/Postdetail/:postId" element={<DeatilPostPage />} />
      </Routes>
    </div>
  );
}

export default App;
