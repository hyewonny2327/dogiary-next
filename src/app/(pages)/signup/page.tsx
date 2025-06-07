import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">회원가입</h1>
        <p className="text-gray-500">이메일과 비밀번호, 닉네임을 입력해주세요.</p>
      </div>
      <SignupForm />
    </div>
  );
}
