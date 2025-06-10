// src/app/(pages)/user/layout.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

// 메뉴 타입 정의
type MenuItem = {
  id: string;
  title: string;
  submenu: {
    icon: string;
    title: string;
    href?: string;
    onClick?: () => Promise<void>;
    isDestructive?: boolean;
  }[];
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('회원탈퇴 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 메뉴 데이터
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      title: '프로필 관리',
      submenu: [
        {
          icon: '🐾',
          title: '나의 프로필',
          href: '/user/profile',
        },
      ],
    },
    {
      id: 'pet',
      title: '반려견 관리',
      submenu: [
        {
          icon: '🦮',
          title: '새로운 가족 등록하기',
          href: '/user/pet/register',
        },
        {
          icon: '🏠',
          title: '우리 가족 보기',
          href: '/user/pet/list',
        },
      ],
    },
    {
      id: 'account',
      title: '계정 설정',
      submenu: [
        {
          icon: '👋',
          title: '로그아웃',
          onClick: handleLogout,
        },
        {
          icon: '❌',
          title: '회원탈퇴',
          onClick: handleWithdrawal,
          isDestructive: true,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col lg:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white lg:w-64 lg:border-r lg:border-b-0">
          <nav className="py-2 lg:py-4">
            {/* 모바일 메뉴 */}
            <div className="mx-auto flex min-w-[250px] justify-around lg:hidden">
              {menuItems.map((menu) => (
                <div key={menu.id} className="relative w-[190px]">
                  <button
                    onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
                    className="flex w-full items-center justify-center gap-4 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <span>{menu.title}</span>
                  </button>
                  <div
                    className={`${
                      activeMenu === menu.id ? 'block' : 'hidden'
                    } absolute right-0 left-0 mt-1 rounded-md bg-white py-1 shadow-lg`}
                  >
                    {menu.submenu.map((item) =>
                      item.href ? (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </Link>
                      ) : (
                        <button
                          key={item.title}
                          onClick={item.onClick}
                          disabled={isLoading}
                          className={`flex w-full items-center px-4 py-2 text-sm ${
                            item.isDestructive
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 데스크톱 메뉴 */}
            <div className="hidden lg:block">
              {menuItems.map((menu) => (
                <div key={menu.id} className="mb-8">
                  <h2 className="px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                    {menu.title}
                  </h2>
                  <div className="mt-4 space-y-1">
                    {menu.submenu.map((item) =>
                      item.href ? (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </Link>
                      ) : (
                        <button
                          key={item.title}
                          onClick={item.onClick}
                          disabled={isLoading}
                          className={`flex w-full items-center rounded-md px-2 py-2 text-sm ${
                            item.isDestructive
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="h-[calc(100vh-var(--header-height))] w-full">{children}</main>
      </div>
    </div>
  );
}
