'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/app/(pages)/user/login/actions';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function handleSubmit(action: 'login' | 'signup') {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('email', emailInput);
      formData.append('password', passwordInput);

      const result = await (action === 'login' ? login(formData) : signup(formData));

      if (result.success) {
        router.push('/');
      } else {
        setError(result?.error || '처리 중 오류가 발생했습니다.');
      }
    } catch (e) {
      setError('처리 중 오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-heading text-2xl font-bold">Dogiary</h1>
          <p className="text-foreground/70 mt-2">반려견과의 특별한 순간을 기록하세요</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-foreground/90 block text-sm font-medium">
                이메일
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="이메일을 입력하세요"
                disabled={isLoading}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-foreground/90 block text-sm font-medium">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="비밀번호를 입력하세요"
                disabled={isLoading}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isLoading}
              onClick={() => handleSubmit('login')}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>

            <Button
              type="button"
              onClick={() => handleSubmit('signup')}
              color="secondary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
