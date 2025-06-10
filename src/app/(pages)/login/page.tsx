import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">로그인</h1>
        <p className="text-gray-500">이메일과 비밀번호를 입력해주세요.</p>
      </div>
      <LoginForm />
    </div>
  );
}
