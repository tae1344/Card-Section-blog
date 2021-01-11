import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

import './Navigation.css';

function Navigation({ userName }) {
  const classes = useStyles();
  const history = useHistory();
  const isAuthenticated = window.localStorage.getItem('isAuthenticated');

  const handleDetailPage = (e) => {
    e.preventDefault();
    history.push('/detail', { user: userName });
  }

  const handlerForm = (e) => {
    e.preventDefault();
    history.push('/form', { mode: 'write' });
  }

  const handlerLogout = (e) => {
    e.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/users/logout",
    }).then((res) => {
      if (res.status === 200) {
        window.localStorage.removeItem('isAuthenticated'); // 로컬 스토리지 인증정보 삭제
        window.localStorage.removeItem('userName');
        alert('Successed Logout!');
        history.push('/');
      } else {
        alert('Failed Logout');

      }
    });
  };

  return (

    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Container maxWidth="md">
          <Toolbar>
            <a className="menu_link" href="/"><img className="menu_icon" src='/images/instagram.png' alt="logo" ></img></a>
            <Typography variant="h4" className={classes.title}>
              {isAuthenticated ? <Typography>{userName} 님 반가워요!</Typography> : "Cardgram"}
            </Typography>
            {isAuthenticated ? <>
              <button color="inherit" onClick={handlerForm}><img className="menu_right_icon" src='/images/upload.png' alt="upload"></img></button>
              <button color="inherit" onClick={handleDetailPage}><img className="menu_right_icon" src='/images/profile.png' alt="profile"></img></button>
              <button color="inherit" onClick={handlerLogout}><img className="menu_right_icon" src='/images/exit.png' alt="logout"></img></button>
            </>
              : <>
                <button color="inherit" onClick={handlerForm}><img className="menu_right_icon" src='/images/upload.png' alt="upload"></img></button>
                <a color="inherit" href="/login"><img className="menu_right_icon" src='/images/user.png' alt="login"></img></a>
                {/* <a color="inherit" href="/register">Register</a> */}
              </>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </div>


  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '100px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    display: 'flex',
    backgroundColor: '#fff',
    color: 'black'

  },


}));

export default Navigation
