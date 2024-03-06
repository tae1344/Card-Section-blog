'use client';

import React, { useEffect, useState } from 'react';
import * as api from '../../src/api';
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navigation({ userName }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('mount');
    setIsAuthenticated(window.localStorage.getItem('isAuthenticated'));
  }, []);

  const handleLoginPage = (e) => {
    e.preventDefault();
    // router.push('/login');
  };

  const handleDetailPage = (e) => {
    e.preventDefault();
    // router.push('/detail', { user: userName });
  };

  const handlerForm = (e) => {
    e.preventDefault();
    // router.push('/form', { mode: 'write' });
  };

  const handlerLogout = (e) => {
    e.preventDefault();
    api.usesrLogout().then((res) => {
      if (res.status === 200) {
        window.localStorage.removeItem('isAuthenticated'); // 로컬 스토리지 인증정보 삭제
        window.localStorage.removeItem('userName');
        alert('Successed Logout!');
        router.push('/');
      } else {
        alert('Failed Logout');
      }
    });
  };

  return (
    <div className={cn('mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8')}>
      <div className={cn('flex container mx-auto bg-amber-100 flex-row justify-between')}>
        <div className={cn('flex flex-row items-center')}>
          <Link href="/">
            <img className={cn('size-7')} src="/images/instagram.png" alt="logo"></img>
          </Link>
          <p className={'text-sm ml-1'}>{isAuthenticated ? <p>{userName} 님 반가워요!</p> : 'Cardgram'}</p>
        </div>
        <div className={cn('justify-self-end')}>
          {isAuthenticated ? (
            <div className={cn('flex items-center  bg-gray-300')}>
              <button color="inherit" onClick={handlerForm}>
                <img className="menu_right_icon" src="/images/upload.png" alt="upload"></img>
              </button>
              <button color="inherit" onClick={handleDetailPage}>
                <img className="menu_right_icon" src="/images/profile.png" alt="profile"></img>
              </button>
              <button color="inherit" onClick={handlerLogout}>
                <img className="menu_right_icon" src="/images/exit.png" alt="logout"></img>
              </button>
            </div>
          ) : (
            <div className={cn('flex items-center  bg-gray-300')}>
              <Link
                href={{
                  pathname: '/form',
                  query: { mode: 'write' },
                }}
                className={cn('size-7 mr-2')}
                color={'inherit'}
              >
                <img className="menu_right_icon" src="/images/upload.png" alt="upload"></img>
              </Link>
              <Link href={'/login'} className={cn('size-7')} color={'inherit'}>
                <img className="menu_right_icon" src="/images/user.png" alt="login"></img>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
