import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardMedia, Button, Typography, CardActions } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'; // JS 시간 라이브러리(moment.js)

import * as api from '../../../api/index';
import useStyles from './styles';

export default function Post({ post, check, userName }) {
  const classes = useStyles();
  const history = useHistory();



  const handlerUpdate = (e) => {
    e.preventDefault();
    history.push('/form', { mode: 'update', postData: post });

  }

  const handlerLike = async (e) => {
    e.preventDefault();
    await api.likePost(post._id);
  }

  const handlerDelete = async (e) => {
    e.preventDefault();
    await api.deletePost(post._id);
    alert('카드를 삭제했습니다!');
    window.location.reload(false); //페이지 리로드

  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handlerLike}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>

        {check ? null : (
          <>
            <Button size="small" color="primary" onClick={handlerUpdate}>
              Update
            </Button>
            <Button size="small" color="primary" onClick={handlerDelete}>
              <DeleteIcon fontSize="small" />
          Delete
        </Button>
          </>
        )
        }
      </CardActions>
    </Card>
  )
}
