'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { login } from '@/api/authApi';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function handleSubmit() {
    try {
      setIsLoading(true);
      setError(null);
      const { data, response } = await login({ email: emailInput, password: passwordInput });
      if (!response.ok) {
        setError(data.error || '로그인에 실패했습니다.');
        return;
      }
      router.push('/');
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
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '처리 중...' : '로그인'}
      </Button>
    </div>
  );
}
