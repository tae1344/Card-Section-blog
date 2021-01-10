import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Container, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '30px'
  },
}));

function LandingPage() {
  const classes = useStyles();
  const userName = window.localStorage.getItem('userName');

  return (
    <div>
      <header>
        <Navigation userName={userName} />

      </header>
      <main>
        <Container maxWidth="md" >
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
