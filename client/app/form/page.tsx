'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FormPage(props: any) {
  const onSubmit = (event) => {
    console.log('onclick >>>>>>> ');
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Form Page</h1>
        <form>
          <p>카드 생성</p>
          <div>
            <label htmlFor={'title'}>제목: </label>
            <input type="text" name={'title'} style={{ borderWidth: 1 }} />
          </div>

          <div>
            <label htmlFor={'message'}>내용: </label>
            <input type="text" name={'message'} style={{ borderWidth: 1 }} />
          </div>

          <div>
            <label htmlFor={'tag'}>태그: </label>
            <input type="text" name={'tag'} style={{ borderWidth: 1 }} />
          </div>

          <div>
            <label htmlFor={'images'}>이미지: </label>
            <input type="file" name={'images'} />
          </div>

          <input type={'submit'} value={'제출'} onClick={onSubmit} style={{ borderWidth: 1 }} />
        </form>
      </div>
    </div>
  );
}
