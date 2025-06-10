'use client';

import { useEffect, useState, useRef } from 'react';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { getProfile, updateProfile, updateProfileImage } from '@/api/profileApi';
import type { Profile } from '@/api/profileApi';
import Image from 'next/image';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setIsLoading(true);
      const { data, response } = await getProfile();
      console.log('profile', data);

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

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, response } = await updateProfileImage(file);

      if (!response.ok) {
        setError(data.error || '이미지 업로드에 실패했습니다.');
        return;
      }

      setProfile(data);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // 파일 input 초기화
      }
    } catch (e) {
      setError('이미지 업로드 중 오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading && !profile) {
    return (
      <Container className="h-auto min-h-[200px] w-[520px] min-w-[300px]">
        <p className="text-gray-500">프로필을 불러오는 중...</p>
      </Container>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Container className="h-auto min-h-[200px] w-full max-w-[520px] sm:w-[90%] md:w-[80%] lg:w-[520px]">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
            {isEditing ? (
              <div className="flex justify-end gap-2">
                <div
                  onClick={() => setIsEditing(false)}
                  className="text-md text-accent cursor-pointer font-bold"
                >
                  취소
                </div>
                <div
                  onClick={handleUpdateProfile}
                  className="text-md text-accent cursor-pointer font-bold"
                >
                  {isLoading ? '저장 중...' : '저장'}
                </div>
              </div>
            ) : (
              <div
                className="text-md text-accent cursor-pointer font-bold"
                onClick={() => setIsEditing(true)}
              >
                수정하기
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {/* contents container */}
          <div className="mt-8 flex flex-col gap-4">
            <div>
              <div className="flex justify-center">
                <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full sm:h-[100px] sm:w-[100px]">
                  <Image
                    src={profile?.image_url || '/default_profile.png'}
                    alt="프로필이미지"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 text-sm text-white opacity-0 transition-opacity hover:opacity-100"
                      >
                        이미지 변경
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={profile?.user_id || ''}
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
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-500">
              가입일: {new Date(profile?.created_at || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
