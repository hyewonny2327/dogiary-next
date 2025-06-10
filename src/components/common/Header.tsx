'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { MdPets } from 'react-icons/md';
import { IoNewspaper } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { useAuthStore } from '@/stores/useAuthStore';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const authenticatedMenuItems: MenuItem[] = [
  {
    label: '내 피드',
    href: '/feed',
    icon: <IoNewspaper className="h-5 w-5" />,
  },
  {
    label: '반려견 페이지',
    href: '/dogs',
    icon: <MdPets className="h-5 w-5" />,
  },
  {
    label: '마이페이지',
    href: '/user/profile',
    icon: <FaUser className="h-5 w-5" />,
  },
];

const unauthenticatedMenuItems: MenuItem[] = [
  {
    label: '로그인',
    href: '/login',
    icon: <FaUser className="h-5 w-5" />,
  },
  {
    label: '회원가입',
    href: '/signup',
    icon: <FaUser className="h-5 w-5" />,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const pathname = usePathname();

  const menuItems = user ? authenticatedMenuItems : unauthenticatedMenuItems;

  return (
    <header className="border-border bg-background sticky top-0 z-40 w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* 로고 */}
        <Link href="/" className="text-heading text-2xl font-bold">
          Dogiary
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2',
                'text-foreground/70 hover:text-foreground transition-colors',
                'text-base font-medium',
                pathname === item.href && 'text-foreground font-semibold'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground/70 hover:text-foreground md:hidden"
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? <RiCloseLine className="h-7 w-7" /> : <RiMenu3Line className="h-7 w-7" />}
        </button>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-top-5 fixed inset-0 top-16 z-50 backdrop-blur md:hidden">
            <nav className="border-border border-t">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex h-14 items-center gap-3 px-6',
                    'text-foreground/70 hover:text-foreground',
                    'border-border border-b transition-colors',
                    pathname === item.href && 'bg-primary/5 text-foreground font-medium'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
