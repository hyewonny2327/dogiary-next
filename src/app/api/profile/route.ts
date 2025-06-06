// src/app/api/profile/route.ts
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// 프로필 조회
export async function GET() {
  try {
    const supabase = await createClient();

    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    // 프로필 데이터 조회
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: '프로필을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('프로필 조회 에러:', error);
    return NextResponse.json({ error: '프로필 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 프로필 업데이트
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    // 현재 로그인한 사용자 확인
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: '인증되지 않은 사용자입니다.' }, { status: 401 });
    }

    // 요청 데이터 파싱
    const data = await request.json();
    const { nickname } = data;

    if (!nickname) {
      return NextResponse.json({ error: '닉네임은 필수 입력값입니다.' }, { status: 400 });
    }

    // 프로필 업데이트
    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update({
        nickname,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: '프로필 업데이트에 실패했습니다.' }, { status: 400 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('프로필 업데이트 에러:', error);
    return NextResponse.json({ error: '프로필 업데이트 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// src/app/api/profile/avatar/route.ts
export async function POST(request: Request) {
  const supabase = createClient();
  // 이미지 업로드 로직
}
