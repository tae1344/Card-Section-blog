'use client';

import Post from '../../entity/post/Post';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';

type PropsType = {
  card: Post;
};

export default function Card(props: PropsType) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/post/detail/${props.card.id ?? 0}`);
  };

  return (
    <div className={cn('border w-fit shadow-md hover:bg-gray-100')} onClick={onClick}>
      <img src={props.card.selectedFile ?? '/images/cat.jpg'} width={350} height={500} />

      <div>
        <p>{props.card.title ?? '테스트 카드'}</p>
        <p>{props.card.message ?? '안녕하세요. 저의 첫 게시물이에요.'}</p>
        <p>{props.card.creator ?? '태야'}</p>
      </div>

      <div>
        <p>{props.card.likeCount ?? 0}</p>
      </div>
    </div>
  );
}
