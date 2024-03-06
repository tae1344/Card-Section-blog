import React from 'react';
import Navigation from '../navigation/Navigation';
import Posts from '../Posts/Posts';

function LandingPage() {
  // const userName = window.localStorage.getItem('userName');

  return (
    <div>
      <header>
        <Navigation userName={'tae'} />
      </header>
      <main></main>
    </div>
  );
}

export default LandingPage;
