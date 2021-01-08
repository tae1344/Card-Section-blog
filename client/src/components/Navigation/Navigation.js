import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';


import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';

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

function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState(null);

  //console.log(location.state);

  useEffect(() => {
    if (location.state !== undefined) {

      setUser(location.state.user);
    }
  })

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
            {user !== null ? `Hello~ ${user.name}` : "상단 네비게이션!"}
          </Typography>
          {user !== null ? <><Button color="inherit" onClick={handlerLogout}>Log out</Button> <Button color="inherit" onClick={handlerForm}>글 작성</Button></>
            : <><Button color="inherit" href="/login">Login</Button><Button color="inherit" href="/register">Register</Button></>
          }
        </Toolbar>
      </AppBar>
    </div>


  )
}

export default Navigation
