import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';

export default function PostDetail() {
  const location = useLocation();
  const classes = useStyles();
  const [post, setPost] = useState({});

  useEffect(() => {

    if (location.state !== undefined) {
      if (location.state.post) {
        console.log(location.state.post);
        setPost(location.state.post);
      }
    }
  }, []);

  return (
    <Container maxWidth="md" >
      <Paper variant="outlined">
        <Typography className={classes.title} variant="h4" align="center" gutterBottom>{post.title}</Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>{moment(post.createAt).fromNow()}</Typography>
        <div className={classes.imageBox}>
          <img className={classes.detailImage} src={post.selectedFile ? post.selectedFile : '/images/cat.jpg'} alt="post-image" />
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">{post.tags ? post.tags.map((tag) => `#${tag} `) : null}</Typography>
        </div>
        <div>
          <Typography className={classes.text} variant="body1" align="justify" color="textSecondary" gutterBottom>작성자: {post.creator}</Typography>
          <Typography className={classes.text} variant="h6" color="textPrimary" component="p" paragraph>{post.message}</Typography>
        </div>
      </Paper>
    </Container>
  )
}
