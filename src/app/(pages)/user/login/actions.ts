'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface LoginResult {
  success: boolean;
  error?: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const supabase = await createClient();

  // 입력값 검증
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      error: '이메일과 비밀번호를 모두 입력해주세요.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('error', error);
      console.error(error);
      return {
        success: false,
        error:
          error.message === 'Invalid login credentials'
            ? '이메일 또는 비밀번호가 올바르지 않습니다.'
            : '로그인 중 오류가 발생했습니다.',
      };
    }

    if (data.user) {
      revalidatePath('/', 'layout');
      return { success: true };
    }

    return {
      success: false,
      error: '알 수 없는 오류가 발생했습니다.',
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: '로그인 처리 중 오류가 발생했습니다.',
    };
  }
}

export async function signup(formData: FormData): Promise<LoginResult> {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return {
      success: false,
      error: '이메일과 비밀번호를 모두 입력해주세요.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: '회원가입 중 오류가 발생했습니다.',
      };
    }

    if (data.user) {
      revalidatePath('/', 'layout');
      return { success: true };
    }

    return {
      success: false,
      error: '알 수 없는 오류가 발생했습니다.',
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: '회원가입 처리 중 오류가 발생했습니다.',
    };
  }
}
