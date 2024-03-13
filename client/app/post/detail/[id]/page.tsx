'use client';

import { useRouter } from 'next/router';
import { useParams, useSearchParams } from 'next/navigation';

export default function PostDetail() {
  const params = useParams();

  return (
    <div>
      <h1>포스트 상세 페이지</h1>
      <h2>{params.id}</h2>
    </div>
  );
}
