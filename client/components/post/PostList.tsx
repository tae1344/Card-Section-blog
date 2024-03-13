import { container } from 'tsyringe';
import PostRepository from '../../repository/post/PostRepository';
import Card from './Card';
import React from 'react';

type PropsType = {};

async function getPosts() {
  const response = await fetch('http://localhost:5002/api/posts');
  return await response.json();
}

async function PostList(props: PropsType) {
  const postRepository = container.resolve(PostRepository);

  const posts = await getPosts();

  return posts?.map((item, index) => {
    return (
      <div key={index}>
        <Card card={{}} />
      </div>
    );
  });
}

export default PostList;
