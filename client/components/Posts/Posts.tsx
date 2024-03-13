'use client';

import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import * as api from '../../api';

import useStyles from './styles';
import Post from '@entity/post/Post';
import PostCard from './Post/PostCard';

type PropsType = {
  userName: string | null;
};

export default function Posts({ userName }: PropsType) {
  const classes = useStyles();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    api.getPosts().then((response: any) => {
      setPosts(response.data);
    });
  };

  return !(posts.length >= 0) ? (
    <div style={{ position: 'relative' }}>
      <CircularProgress style={{ marginLeft: '50%' }} />
    </div>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post, index) => (
        <Grid key={index} xs={12} sm={4}>
          <PostCard post={post} check={true} userName={userName} />
        </Grid>
      ))}
    </Grid>
  );
}
