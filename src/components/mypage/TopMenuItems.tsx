'use client';
import Link from 'next/link';
import { MenuItem, menuItems } from '@/constants/myPageMenu';
import { useState } from 'react';
import { useMenuActions } from '@/hooks/useMenuActions';
export default function TopMenuItems() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { handleMenuAction } = useMenuActions();

  async function handleMenuClick(item: MenuItem['submenu'][0]) {
    if (item.actionType) {
      await handleMenuAction(item.actionType);
    }
  }
  return (
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
                  onClick={() => handleMenuClick(item)}
                  className={`flex w-full items-center px-4 py-2 text-sm ${
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
