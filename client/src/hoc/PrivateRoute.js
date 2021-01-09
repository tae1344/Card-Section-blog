// 인증 여부에 따른 라우팅을 위한 페이지

import React from 'react';
import { Route, Redirect } from "react-router-dom";


function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route {...rest} render={(props) => window.localStorage.getItem('isAuthenticated') ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )}
    />
  );
}

export default PrivateRoute;