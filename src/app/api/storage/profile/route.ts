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

    // 파일 이름 생성 (기존 이미지가 있다면 덮어쓰기 위해 userId만 사용)
    const fileName = `${user.id}.${fileExt}`;

    // 기존 이미지 삭제 시도 (에러 무시)
    await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).remove([`${user.id}.*`]);

    // Storage에 이미지 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
      .upload(fileName, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error('이미지 업로드 에러:', uploadError);
      return NextResponse.json({ error: '이미지 업로드에 실패했습니다.' }, { status: 400 });
    }

    // 업로드된 이미지의 공개 URL 가져오기
    const {
      data: { publicUrl },
    } = supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).getPublicUrl(fileName);

    // 프로필 업데이트
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        image_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (updateError) {
      // 이미지 업로드는 성공했지만 프로필 업데이트 실패
      // 업로드된 이미지 삭제
      await supabase.storage.from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!).remove([fileName]);

      return NextResponse.json(
        { error: '프로필 이미지 업데이트에 실패했습니다.' },
        { status: 400 }
      );
    }

    // 프로필 정보 가져오기
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      return NextResponse.json({ error: '프로필 정보 조회에 실패했습니다.' }, { status: 400 });
    }

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
    return NextResponse.json({ error: '이미지 업로드 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
