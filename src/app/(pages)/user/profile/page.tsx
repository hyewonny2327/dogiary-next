'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { getProfile, updateProfile } from '@/api/profileApi';
import type { Profile } from '@/api/profileApi';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setIsLoading(true);
      const { data, response } = await getProfile();

      if (!response.ok) {
        setError(data.error || '프로필을 불러오는데 실패했습니다.');
        return;
      }

      setProfile(data);
      setNickname(data.nickname);
    } catch (e) {
      setError('프로필을 불러오는 중 오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateProfile() {
    try {
      setIsLoading(true);
      setError(null);

      const { data, response } = await updateProfile({ nickname });

      if (!response.ok) {
        setError(data.error || '프로필 업데이트에 실패했습니다.');
        return;
      }

      setProfile(data);
      setIsEditing(false);
    } catch (e) {
      setError('프로필 업데이트 중 오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading && !profile) {
    return (
      <Container>
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-gray-500">프로필을 불러오는 중...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mx-auto max-w-2xl py-8">
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="border border-gray-300">
                수정
              </Button>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={profile?.id || ''}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <label htmlFor="nickname" className="mb-1 block text-sm font-medium text-gray-700">
                닉네임
              </label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={() => setIsEditing(false)} className="border border-gray-300">
                  취소
                </Button>
                <Button onClick={handleUpdateProfile} disabled={isLoading}>
                  {isLoading ? '저장 중...' : '저장'}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-500">
              가입일: {new Date(profile?.created_at || '').toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              최근 수정일: {new Date(profile?.updated_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
