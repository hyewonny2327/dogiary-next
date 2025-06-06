import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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

    // FormData에서 파일 추출
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '이미지 파일이 필요합니다.' }, { status: 400 });
    }

    // 파일 확장자 확인
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (!fileExt || !validExtensions.includes(fileExt)) {
      return NextResponse.json({ error: '지원하지 않는 파일 형식입니다.' }, { status: 400 });
    }

    // 파일 이름 생성
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    // Storage에 이미지 업로드
    const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);

    if (uploadError) {
      return NextResponse.json({ error: '이미지 업로드에 실패했습니다.' }, { status: 400 });
    }

    // 프로필 업데이트
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        image_url: fileName,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      // 이미지 업로드는 성공했지만 프로필 업데이트 실패
      // 업로드된 이미지 삭제
      await supabase.storage.from('avatars').remove([fileName]);

      return NextResponse.json(
        { error: '프로필 이미지 업데이트에 실패했습니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: '이미지가 성공적으로 업로드되었습니다.',
      image_url: fileName,
    });
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
    return NextResponse.json({ error: '이미지 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
