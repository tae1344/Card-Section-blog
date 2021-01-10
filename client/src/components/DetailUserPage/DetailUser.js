import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress, Container, AppBar, Typography, Toolbar, CssBaseline, Button } from '@material-ui/core';

import Post from '../Posts/Post/Post';
import * as api from '../../api/index';

import useStyles from './styles';

export default function DetailUser() {
  const classes = useStyles();
  const [myposts, setMyPosts] = useState([]);
  const [checkPosts, setCheckPosts] = useState(true);
  const location = useLocation();
  const userName = location.state !== undefined ? location.state.user : "";

  // Error: Can't perform a React state update on an unmounted component 해결책
  useEffect(() => {
    let mounted = true;
    api.getUserPosts(userName).then((res) => {
      if (res.data) {

        setMyPosts(res.data);
      }
    });

    // return function cleanup() {
    //   mounted = false;
    // }
  }, []);

  useEffect(() => {
    if (!myposts.length) {
      setTimeout(() => {
        setCheckPosts(false);
      }, 3000);
    }
  }, []);

  function renderPosts() {
    if (myposts.length !== 0) {
      return (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
            {myposts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <Post post={post} check={false} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )
    } else {
      return (
        <div>포스트가 없어요</div>
      )
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <a className="menu_link" href="/"><img className="menu_icon" src='/images/instagram.png' ></img></a>
          <Typography variant="h6" color="inherit" noWrap>
            나의 기록
          </Typography>

        </Toolbar>
        <Button href='/'>Home</Button>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              작성한 카드들을 확인하세요
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              본인이 작성한 카드를 관리해보세요
            </Typography>
          </Container>
        </div>
        {
          checkPosts ? <CircularProgress /> : renderPosts()

        }

      </main>
    </React.Fragment>
  );
}
