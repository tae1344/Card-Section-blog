import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from '../Posts/Post/Post';
import * as api from '../../api/index';

import useStyles from './styles';

export default function DetailUser() {
  const classes = useStyles();
  const [myposts, setMyPosts] = useState([]);
  const [user, setUser] = useState("");
  const location = useLocation();

  console.log(myposts);

  useEffect(() => {
    let isMounted = true;

    if (location.state !== undefined) {
      if (isMounted) {
        setUser(location.state.user);
      }
    }

    return () => { isMounted = false };
  }, []);

  // Error: Can't perform a React state update on an unmounted component 해결책
  useEffect(() => {
    let isMounted = true;

    api.getUserPosts(user.name).then((res) => {
      if (isMounted) setMyPosts(res.data);
    });

    return () => { isMounted = false };
  }, []);


  return (
    !myposts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {myposts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    )
  );
}
