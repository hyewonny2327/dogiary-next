import { logout } from '@/api/authApi';
import { useRouter } from 'next/navigation';

export function useMenuActions() {
  const navigate = useRouter();
  async function handleMenuAction(actionType: string) {
    switch (actionType) {
      case 'logout':
        await logout();
        navigate.push('/');
        break;
      case 'withdraw':
        await logout();
        //회원탈퇴 로직
        break;
    }
  }
  return { handleMenuAction };
}
