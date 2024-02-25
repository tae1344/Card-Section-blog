import React from 'react';
import { Container, Grid } from '@mui/material';
import Navigation from '../components/Navigation/Navigation';

export default function Page() {
  return (
    <div className="App">
      <h1>Hello, Next.js!</h1>
      <div>
        <Container maxWidth="md">
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12}>
              {/*<Posts userName={userName} />*/}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
