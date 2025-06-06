'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

const FeedPage = () => {
  const { user } = useAuthStore();
  useEffect(() => {
    console.log(user);
  }, []);
  return <div>page</div>;
};

export default FeedPage;
