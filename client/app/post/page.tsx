import React from 'react';
import AxiosClient from '../../http/AxiosClient';
import { container } from 'tsyringe';
import PostRepository from '../../repository/post/PostRepository';
import Card from '../../components/post/Card';

async function PostPage() {
  return (
    <div>
      <Card card={{}} />
    </div>
  );
}

export default PostPage;
