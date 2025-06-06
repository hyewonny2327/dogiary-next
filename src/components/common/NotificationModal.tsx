import Button from './Button';
import Modal from './Modal';
import { IoClose } from 'react-icons/io5';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
  title,
  children,
  confirmText,
  cancelText = '닫기',
  onConfirm,
}: NotificationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[30vh] min-h-[200px] w-[70vw] min-w-[300px] flex-col justify-between"
    >
      {/* 모달 헤더 */}
      {title && (
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-heading text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="닫기"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* 모달 내용 */}
      <div className="px-6 py-4">{children}</div>

      {/* 모달 푸터 */}
      {(confirmText || cancelText) && (
        <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-4">
          {cancelText && (
            <Button color="secondary" size="small" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button color="primary" size="small" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
}
