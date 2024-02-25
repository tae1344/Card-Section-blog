import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, Container, AppBar, Typography, Toolbar, CssBaseline, Button } from '@mui/material';

import PostCard from '../Posts/Post/PostCard';
import * as api from '../../src/api';

import useStyles from './styles';

export default function DetailUser() {
  const classes = useStyles();
  const [myposts, setMyPosts] = useState([]);
  const [checkPosts, setCheckPosts] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state !== undefined ? location.state.user : '';

  // Error: Can't perform a React state update on an unmounted component 해결책
  useEffect(() => {
    let mounted = true;
    api.getUserPosts(userName).then((res) => {
      if (mounted) {
        setMyPosts(res.data);
      }
    });

    return function cleanup() {
      mounted = false;
    };
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
                <PostCard post={post} check={false} />
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" align="center" color="textSecondary" gutterBottom>
            작성한 카드가 없네요..
          </Typography>
          <Typography component="h1" variant="h4" align="center" color="textSecondary" gutterBottom>
            <Button onClick={() => navigate('/form')} variant="outlined" color="secondary">
              카드 만들러 가기..
            </Button>
          </Typography>
        </Container>
      );
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <a className="menu_link" href="/">
            <img className="menu_icon" src="/images/instagram.png" alt="logo"></img>
          </a>
          <Typography variant="h6" color="inherit" noWrap>
            나의 기록
          </Typography>
        </Toolbar>
        <Button href="/">Home</Button>
      </AppBar>
      <main>
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
        {checkPosts ? (
          <Container style={{ position: 'relative' }}>
            <CircularProgress style={{ marginLeft: '50%' }} />
          </Container>
        ) : (
          renderPosts()
        )}
      </main>
    </React.Fragment>
  );
}
