import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { login } from './api';

// user: undefined(확인 중) | null(로그아웃) | Firebase user
export default function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(
    () =>
      onAuthStateChanged(auth, async next => {
        if (next) {
          try {
            await login(); // 서버에 사용자 등록(upsert)
          } catch (err) {
            console.error(err);
          }
        }
        setUser(next);
      }),
    []
  );

  return user;
}
