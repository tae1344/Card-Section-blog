import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { TextField, Button, Container, Paper } from '@material-ui/core';
import axios from 'axios';
import FileBase from 'react-file-base64';

import useStyles from './styles';

function Form() {
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [postData, setpostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  // 로그인 유저 상태 확인
  useEffect(() => {
    if (location.state !== undefined) {

      setUser(location.state.user);
    }
  });

  // Create Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios({
      method: "POST",
      data: postData,
      withCredentials: true,
      url: "http://localhost:5000/api/posts",
    }).then((res) => console.log('postData ::', res.data));

    clear();
    history.push('/', { user: user });

  }

  const clear = () => {
    setpostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  }

  //encType='multipart/form-data' 설정해줘야 multer 인식한다고 한다.
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType='multipart/form-data'>
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