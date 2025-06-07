import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email, password } = await request.json();

    // 입력값 검증
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            error.message === 'Invalid login credentials'
              ? '이메일 또는 비밀번호가 올바르지 않습니다.'
              : '로그인 중 오류가 발생했습니다.',
        },
        { status: 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json({ error: '로그인에 실패했습니다.' }, { status: 400 });
    }

    return NextResponse.json({
      message: '로그인이 완료되었습니다.',
      user: data.user,
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
