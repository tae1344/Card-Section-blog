import React, { useState } from 'react';
import { useNavigate, Redirect, Route } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Link } from '@mui/material';
import useStyles from './styles';

import * as api from '../../api';

function LoginPage() {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const isAuthenticated = window.localStorage.getItem('isAuthenticated');

  const handlePage = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handlerLogin = async (e) => {
    e.preventDefault();
    await api.usesrLogin(loginData).then((res) => {
      //****     서버에서 받아 온 인증여부를 로컬 스토리지에 저장 --> 모든 페이지에서 사용가능해서 편리한 듯하다.       ******/
      const isAuthenticated = res.data.isAuthenticated;

      if (isAuthenticated) {
        window.localStorage.setItem('isAuthenticated', isAuthenticated);
        window.localStorage.setItem('userName', res.data.name);

        navigate('/', { user: res.data });
      } else {
        alert('아이디 혹은 비밀번호가 잘못 됐습니다.');
      }
    });
  };

  if (isAuthenticated) {
    return <Route to="/" />;
  } else {
    return (
      <Container component="main" maxWidth="xs" className={classes.layout}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} method="post" onSubmit={handlerLogin} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <Typography>
              아이디가 없으신가요?{' '}
              <button className={classes.button} onClick={handlePage}>
                가입하기
              </button>
            </Typography>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              로그인
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default LoginPage;
