'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}
