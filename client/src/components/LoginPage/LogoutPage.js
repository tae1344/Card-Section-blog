import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function LogoutPage() {
  const history = useHistory();
  // axios({
  //   method: "GET",
  //   withCredentials: true,
  //   url: "http://localhost:5000/api/users/logout",
  // }).then((res) => {
  //   if (res.status === 200) {
  //     console.log(res);
  //     history.push('/', undefined);
  //   } else {
  //     alert('Log Out Failed');
  //   }
  // });

  const handlerLogout = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/users/logout",
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        history.push('/', { user: null });
      } else {
        alert('Log Out Failed');
      }
    });
  };

  return (

    <div>
      <Button color="inherit" onClick={handlerLogout} > 로그아웃 </Button>
    </div>
  )
}

export default LogoutPage;