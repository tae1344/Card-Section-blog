import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Container, Grid } from '@material-ui/core';

import Posts from '../Posts/Posts';

function LandingPage() {

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
              <Posts userName={userName} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default LandingPage
