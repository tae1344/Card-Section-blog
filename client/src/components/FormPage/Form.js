import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TextField, Button, Container, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import FileBase from 'react-file-base64';

import useStyles from './styles';

function Form() {
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState("");
  const classes = useStyles();
  const [postData, setpostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  //로그인 유저 상태 확인
  useEffect(() => {
    if (location.state !== undefined) {

      setUser(location.state.user);
    }
    return () => setUser("");
  }, []); // 언마운트 될때만 cleanup 실행

  console.log("location :::", location.state);
  console.log("user :::", user);

  // Create Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: "POST",
      data: postData,
      withCredentials: true,
      url: "http://localhost:5000/api/posts/create",
    }).then((res) => console.log('postData ::', res.data));

    clear();
    history.push('/');

  }

  const clear = () => {
    setpostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  }

  //encType='multipart/form-data' 설정해줘야 multer 인식한다고 한다.
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType='multipart/form-data'>
          {/* <Typography variant="h6">{user.name}님 반갑습니다.</Typography> */}
          <Typography variant="body2">카드를 작성해주세요...</Typography>
          {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setpostData({ ...postData, creator: e.target.value })} /> */}
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setpostData({ ...postData, title: e.target.value, creator: user.name })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setpostData({ ...postData, message: e.target.value })} />
          <TextField name="tagstitle" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setpostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setpostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>제출</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Form;