import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import FileBase from 'react-file-base64';

import * as api from '../../api';
import useStyles from './styles';

function Form() {
  const classes = useStyles();
  const userName = window.localStorage.getItem('userName');

  const location = useLocation();
  const navigate = useNavigate();

  const [writeMode, setWriteMode] = useState('');
  const [postData, setpostData] = useState({ creator: userName, title: '', message: '', tags: '', selectedFile: '' });

  //로그인 유저 상태 확인
  useEffect(() => {
    if (location.state !== undefined) {
      if (location.state.mode) {
        setWriteMode(location.state.mode);
      }

      if (location.state.postData) {
        setpostData(location.state.postData);
      }
    }
  }, []);

  // Create PostCard
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('카드가 작성되었습니다..잠시만 기다려주세요!');
    await api.createPost(postData);

    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    alert('카드가 업데이트 되었습니다..잠시만 기다려주세요!');
    await api.updatePost(postData._id, postData);
    navigate('/detail', { user: userName });
  };

  const clear = () => {
    setpostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={writeMode === 'update' ? handleUpdate : handleSubmit}
          encType="multipart/form-data"
        >
          <Typography variant="h6">{writeMode === 'update' ? '카드 수정 중..' : 'Creating'}</Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => setpostData({ ...postData, title: e.target.value })}
          />
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) => setpostData({ ...postData, message: e.target.value })}
          />
          <TextField
            name="tagstitle"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => setpostData({ ...postData, tags: e.target.value.split(',') })}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setpostData({ ...postData, selectedFile: base64 ? base64 : '' })}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            제출
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Form;
