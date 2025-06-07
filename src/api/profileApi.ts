export interface Profile {
  id: string;
  nickname: string;
  created_at: string;
  updated_at: string;
}

interface ProfileResponse {
  error?: string;
}

interface UpdateProfileRequest {
  nickname: string;
}

// 프로필 조회
export async function getProfile(): Promise<{
  data: Profile & ProfileResponse;
  response: Response;
}> {
  const response = await fetch(`/api/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  return { data, response };
}

// 프로필 업데이트
export async function updateProfile({ nickname }: UpdateProfileRequest): Promise<{
  data: Profile & ProfileResponse;
  response: Response;
}> {
  const response = await fetch(`/api/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
    }),
  });

  const data = await response.json();

  return { data, response };
}
