// 인증 여부에 따른 라우팅을 위한 페이지

import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';


function PrivateRoute({ component: Component, ...rest }) {

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users').then(res => {
      if (res.data) {
        setIsAuth(res.data.auth)
      }
    });
  }, []);

  console.log(isAuth)

  return (
    <Route {...rest} render={(props) => isAuth ? (
      <Component {...props} />
    ) : (
        <Redirect to='/login' />
      )}
    />
  );
}

export default PrivateRoute;