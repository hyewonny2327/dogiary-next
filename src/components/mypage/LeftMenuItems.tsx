'use client';
import Link from 'next/link';
import { MenuItem, menuItems } from '@/constants/myPageMenu';
import { useMenuActions } from '@/hooks/useMenuActions';
export default function LeftMenuItems() {
  const { handleMenuAction } = useMenuActions();
  async function handleMenuClick(item: MenuItem['submenu'][0]) {
    if (item.actionType) {
      handleMenuAction(item.actionType);
    }
  }
  return (
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
                  onClick={() => handleMenuClick(item)}
                  className={`flex w-full items-center rounded-md px-2 py-2 text-sm ${
                    item.actionType === 'withdraw'
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
  );
}
