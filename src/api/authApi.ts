interface LoginRequest {
  email: string;
  password: string;
}

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

interface LoginResponse {
  error?: string;
  message?: string;
  user?: User;
}

export async function login({ email, password }: LoginRequest): Promise<{
  data: LoginResponse;
  response: Response;
}> {
  const response = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  return { data, response };
}

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
