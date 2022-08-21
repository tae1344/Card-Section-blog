import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import * as api from '../../api/index';

import useStyles from './styles';

export default function Posts({ userName }) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.getPosts().then((res) => {
      if (mounted) setPosts(res.data);
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return !(posts.length >= 0) ? (
    <div style={{ position: 'relative' }}>
      <CircularProgress style={{ marginLeft: '50%' }} />
    </div>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={4}>
          <Post post={post} check={true} userName={userName} />
        </Grid>
      ))}
    </Grid>
  );
}
