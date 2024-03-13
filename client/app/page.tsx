import 'reflect-metadata';
import React, { Suspense } from 'react';
import Navigation from '../components/navigation/Navigation';
import { cn } from '../lib/utils';
import Link from 'next/link';
import PostList from '../components/post/PostList';

export default function Page() {
  return (
    <div className="App">
      <Navigation userName={'kim'} />

      <div className={cn('')}>
        <Suspense fallback={<div>Loading...</div>}>
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}
