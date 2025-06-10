// 메뉴 데이터
// 메뉴 타입 정의
import { logout } from '@/api/authApi';
export type MenuItem = {
  id: string;
  title: string;
  submenu: {
    icon: string;
    title: string;
    href?: string;
    onClick?: () => Promise<void>;
    isDestructive: boolean;
  }[];
};

export const menuItems: MenuItem[] = [
  {
    id: 'profile',
    title: '프로필 관리',
    submenu: [
      {
        icon: '🐾',
        title: '나의 프로필',
        href: '/user/profile',
        isDestructive: false,
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
        isDestructive: false,
      },
      {
        icon: '🏠',
        title: '우리 가족 보기',
        href: '/user/pet/list',
        isDestructive: false,
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
        onClick: async () => {
          await logout();
        },
        isDestructive: false,
      },
      {
        icon: '❌',
        title: '회원탈퇴',
        isDestructive: true,
      },
    ],
  },
];
