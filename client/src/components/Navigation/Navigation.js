import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';



function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState("");


  useEffect(() => {

    if (location.state !== undefined) {

      setUser(location.state.userData);
    }
  });

  const handleDetailPage = (e) => {
    e.preventDefault();
    history.push('/detail', { user: user });
  }


  const handlerForm = (e) => {
    e.preventDefault();
    history.push('/form', { user: user });
  }

  const handlerLogout = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/users/logout",
    }).then((res) => {
      if (res.status === 200) {
        console.log(res);
        alert('Log Out Success');
        history.push('/', { user: null });
      } else {
        alert('Log Out Failed');
      }
    });
  };

  return (

    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {user ? `Hello~ ${user.name}` : "상단 네비게이션!"}
          </Typography>
          {user ? <>
            <Button color="inherit" onClick={handleDetailPage}>Profile</Button>
            <Button color="inherit" onClick={handlerForm}>글 작성</Button>
            <Button color="inherit" onClick={handlerLogout}>Log out</Button>
          </>
            : <>
              <Button color="inherit" onClick={handlerForm}>글 작성</Button>
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/register">Register</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>


  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '100px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    display: 'flex',
  },

}));

export default Navigation
