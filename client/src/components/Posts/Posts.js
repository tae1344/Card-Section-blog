import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
//import * as api from '../../api';

import useStyles from './styles';

export default function Posts() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  // post 가져오기
  const getPosts = async () => {
    try {
      await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/posts",
      }).then((res) => setPosts(res.data));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [posts]);


  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
}
