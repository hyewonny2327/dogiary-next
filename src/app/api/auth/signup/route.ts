import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 서비스 역할로 Supabase 클라이언트 생성
    const supabase = await createClient();
    const { email, password, nickname } = await request.json();

    // 입력값 검증
    if (!email || !password || !nickname) {
      return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    // 1. 회원가입 (auth.users 테이블에 생성)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname, // 메타데이터에 닉네임 저장
        },
      },
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: '회원가입에 실패했습니다.' }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: '사용자 생성에 실패했습니다.' }, { status: 400 });
    }

    // 2. 프로필 생성 (profiles 테이블에 생성)
    console.log('Creating profile with data:', {
      id: authData.user.id,
      user_id: authData.user.id,
      nickname,
      image_url: '',
      walk_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 서비스 역할로 프로필 생성
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      user_id: authData.user.email,
      nickname,
      image_url: '',
      walk_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      console.error('Error details:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
      });

      // 프로필 생성 실패 시 생성된 auth 계정도 삭제
      await supabase.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json(
        {
          error: '프로필 생성에 실패했습니다.',
          details: profileError.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user: authData.user,
    });
  } catch (error) {
    console.error('회원가입 에러:', error);
    return NextResponse.json({ error: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
