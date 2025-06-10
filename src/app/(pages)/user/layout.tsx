import TopMenuItems from '@/components/mypage/TopMenuItems';
import LeftMenuItems from '@/components/mypage/LeftMenuItems';
export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col lg:flex-row">
        <aside className="w-full border-b border-gray-200 bg-white lg:w-64 lg:border-r lg:border-b-0">
          <nav className="py-2 lg:py-4">
            {/* 모바일 메뉴 */}
            <TopMenuItems />

            {/* 데스크톱 메뉴 */}
            <LeftMenuItems />
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="h-[calc(100vh-var(--header-height))] w-full">{children}</main>
      </div>
    </div>
  );
}
