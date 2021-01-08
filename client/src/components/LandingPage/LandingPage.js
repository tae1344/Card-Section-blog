import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Form from '../FormPage/Form';
import Posts from '../Posts/Posts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '30px'
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div>
      <header>
        <Navigation />

      </header>
      <main>
        <Container >
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} >
              <Posts />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default LandingPage
