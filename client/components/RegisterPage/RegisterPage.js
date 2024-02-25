import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import * as api from '../../src/api';

export default function RegisterPage() {
  const classes = useStyles();
  const [inputData, setInputData] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  const handlerRegister = async (e) => {
    e.preventDefault();
    await api.userResiter(inputData).then((res) => {
      if (res.status === 200) {
        alert('Register Success!');
        navigate('/');
      } else {
        alert('Register Failed');
        setInputData({ name: '', email: '', password: '' });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} method="post" onSubmit={handlerRegister} autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
          />
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
            onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
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
            onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            가입하기
          </Button>
        </form>
      </div>
    </Container>
  );
}
