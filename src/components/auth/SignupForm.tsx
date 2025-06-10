'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/utils';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { signup } from '@/api/authApi';

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');

  async function handleSubmit() {
    try {
      setIsLoading(true);
      setError(null);

      const { data, response } = await signup({
        email: emailInput,
        password: passwordInput,
        nickname: nicknameInput,
      });

      if (!response.ok) {
        setError(data.error || '회원가입에 실패했습니다.');
        return;
      }

      router.push('/login');
      router.refresh();
    } catch (e) {
      setError('처리 중 오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          id="email"
          placeholder="이메일"
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Input
          id="password"
          placeholder="비밀번호"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Input
          id="nickname"
          placeholder="닉네임"
          type="text"
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        className={cn('w-full', 'bg-gray-100 text-gray-900 hover:bg-gray-200')}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
    </div>
  );
}
