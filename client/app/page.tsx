import React from 'react';
import Navigation from '../components/navigation/Navigation';

export default function Page() {
  return (
    <div className="App">
      <Navigation userName={'kim'} />
      <div>
        <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      </div>
    </div>
  );
}
