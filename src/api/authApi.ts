import { createClient } from '@/utils/supabase/client';

interface User {
  id: string;
  email: string;
}

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

interface SignupResponse {
  error?: string;
  message?: string;
  user?: User;
}
const supabase = await createClient();
export async function signup({ email, password, nickname }: SignupRequest): Promise<{
  data: SignupResponse;
  response: Response;
}> {
  const response = await fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      nickname,
    }),
  });

  const data = await response.json();

  return { data, response };
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};
