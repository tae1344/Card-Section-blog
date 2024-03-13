'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { proxy, useSnapshot } from 'valtio';
import Post from '../../entity/post/Post';

type StateType = {
  post: Post;
};

export default function FormPage(props: any) {
  const router = useRouter();

  const state = useRef(
    proxy<StateType>({
      post: new Post(),
    })
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {}, []);

  const onSubmit = (event) => {
    router.push('/');
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.post.title = event.target?.value ?? '';
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.post.message = event.target?.value ?? '';
  };

  const onChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.post.tags = event.target?.value.split(',') ?? [];
  };

  const onChangeImage = (value: string) => {
    state.post.selectedFile = value;
  };

  return (
    <div>
      <div>
        <a href={'/post'}>
          <h2 style={{ fontSize: 20 }}>다음페이지2</h2>
        </a>

        <form action={'/'}>
          <p>카드 생성</p>
          <div>
            <label htmlFor={'title'}>제목: </label>
            <input type="text" name={'title'} style={{ borderWidth: 1 }} onChange={onChangeTitle} />
          </div>

          <div>
            <label htmlFor={'message'}>내용: </label>
            <input type="text" name={'message'} style={{ borderWidth: 1 }} onChange={onChangeContent} />
          </div>

          <div>
            <label htmlFor={'tag'}>태그: </label>
            <input type="text" name={'tag'} style={{ borderWidth: 1 }} onChange={onChangeTags} />
          </div>

          <div>
            <label htmlFor={'images'}>이미지: </label>
            <input type="file" name={'images'} onChange={onChangeImage} />
          </div>

          <input type={'submit'} value={'제출'} onClick={onSubmit} style={{ borderWidth: 1 }} />
        </form>
      </div>
    </div>
  );
}
