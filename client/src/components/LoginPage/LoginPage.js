import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Link } from '@material-ui/core';
import useStyles from './styles';



function LoginPage() {
  const classes = useStyles();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState();
  const [userData, setUserData] = useState();

  const history = useHistory();


  // useState에서 변경 된 state는 바로 적용이 안되기에,
  // 비동기적으로 작동하는 것을 effect를 사용해 적용시켜준다.
  useEffect(() => {

    isLogin ? history.push('/', { user: userData }) : history.push('/login');
  }, [isLogin]);

  const handlerLogin = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: "http://localhost:5000/api/users/login",
    }).then((res) => {
      console.log(res.data);
      setUserData(res.data.user);
      setIsLogin(res.data.isLogin);
    });
  };

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
          <Typography>아이디가 없으신가요? <Link href="/register">가입하기</Link></Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>

        </form>
      </div>
    </Container>
  )
}

export default LoginPage
