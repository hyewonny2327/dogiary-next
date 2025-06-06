import Modal from '../common/Modal';
import Image from 'next/image';
import { cn } from '@/utils/utils';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  title: string;
  content: string;
  images?: string[]; // 이미지 URL 배열
}

export default function ContentModal({
  isOpen,
  onClose,
  date,
  title,
  content,
  images = [], // 기본값 빈 배열
}: ContentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="h-[80vh] w-[80vw]">
      {/* 컨텐츠 */}
      <div className="relative space-y-6 p-6 md:space-y-7 md:p-7 lg:space-y-8 lg:p-8">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-10',
            'text-foreground/60 hover:text-foreground',
            'transition-colors duration-200',
            'md:top-6 md:right-6'
          )}
          aria-label="닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:h-7 md:w-7"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 날짜 */}
        <div className={cn('text-foreground/70 text-sm', 'md:text-base')}>{date}</div>

        {/* 제목 */}
        <h2 className={cn('text-heading text-xl font-semibold', 'md:text-2xl', 'lg:text-3xl')}>
          {title}
        </h2>

        {/* 내용 */}
        <p
          className={cn(
            'text-foreground whitespace-pre-wrap',
            'md:text-base',
            'lg:text-lg lg:leading-relaxed'
          )}
        >
          {content}
        </p>

        {/* 이미지 섹션 */}
        <div className="space-y-4 md:space-y-5 lg:space-y-6">
          <h3 className={cn('text-heading font-medium', 'md:text-lg', 'lg:text-xl')}>사진</h3>
          {images.length > 0 ? (
            <div className={cn('grid grid-cols-2 gap-4', 'md:gap-5', 'lg:gap-6')}>
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`일기 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                'border-border/50 bg-muted flex h-40 items-center justify-center rounded-lg border',
                'md:h-48',
                'lg:h-52'
              )}
            >
              <div className="text-foreground/60 text-center">
                <svg
                  className="mx-auto mb-2 h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="md:text-base lg:text-lg">등록된 사진이 없습니다</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
