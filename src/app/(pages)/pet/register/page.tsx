//가족 등록하기
'use client';

import { useState, useRef } from 'react';
import Input from '@/components/common/Input';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';

export default function RegisterPetPage() {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/default_pet.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    birth_date: '',
    adoption_date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {};

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-auto min-h-[200px] w-full max-w-[520px] sm:w-[90%] md:w-[80%] lg:w-[520px]">
        <div className="w-full py-8">
          <h1 className="text-var(--color-accent) text-center text-2xl font-bold">
            새로운 가족 등록하기
          </h1>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            {/* 프로필 이미지 */}
            <div className="flex justify-center">
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
                <Image
                  src={imagePreview}
                  alt="반려견 프로필"
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
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
              </div>
            </div>

            {/* 이름 */}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                이름
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="반려견의 이름을 입력해주세요"
              />
            </div>

            {/* 견종 */}
            <div>
              <label htmlFor="breed" className="mb-1 block text-sm font-medium text-gray-700">
                견종
              </label>
              <Input
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
                placeholder="반려견의 견종을 입력해주세요"
              />
            </div>

            {/* 생년월일 */}
            <div>
              <label htmlFor="birth_date" className="mb-1 block text-sm font-medium text-gray-700">
                생년월일
              </label>
              <Input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* 만난 날 */}
            <div>
              <label
                htmlFor="adoption_date"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                만난 날
              </label>
              <Input
                id="adoption_date"
                name="adoption_date"
                type="date"
                value={formData.adoption_date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 mt-4 rounded-lg px-4 py-2 text-white transition-colors disabled:bg-gray-400"
            >
              {isLoading ? '등록 중...' : '등록하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
