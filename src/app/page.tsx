'use client';

import { useState } from 'react';
import NotificationModal from '@/components/common/NotificationModal';
import ContentModal from '@/components/common/ContentsModal';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Dropdown from '@/components/common/Dropdown';
import Input from '@/components/common/Input';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const handleConfirm = () => {
    console.log('확인 클릭');
  };
  return (
    <>
      <div className="space-y-8 p-8">
        {/* 기본 Input */}
        <Input placeholder="이름을 입력하세요" />

        {/* 매칭되는 Dropdown */}
        <Dropdown
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { label: '옵션 1', value: '1' },
            { label: '옵션 2', value: '2' },
            { label: '옵션 3', value: '3' },
          ]}
          placeholder="선택해주세요"
        />

        {/* 에러 상태 */}
        <Dropdown
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { label: '옵션 1', value: '1' },
            { label: '옵션 2', value: '2' },
          ]}
          error="필수 선택 항목입니다"
        />

        {/* Primary 테두리 */}
        <Dropdown
          value={selectedValue}
          onChange={setSelectedValue}
          options={[
            { label: '옵션 1', value: '1' },
            { label: '옵션 2', value: '2' },
          ]}
          borderColor="primary"
        />
      </div>
      <div className="space-y-8 p-8">
        <Button color="primary" size="large" onClick={() => setIsOpen(true)}>
          모달 열기
        </Button>
        <NotificationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="알림"
          confirmText="확인"
          onConfirm={handleConfirm}
        >
          <p>작업이 완료되었습니다.</p>
        </NotificationModal>
        <Button color="primary" size="large" onClick={() => setIsContentOpen(true)}>
          모달 열기
        </Button>
        <ContentModal
          isOpen={isContentOpen}
          onClose={() => setIsContentOpen(false)}
          date="2022. 12월 1일"
          title="비오는 날 산책"
          content="비 그쳐서 잔디밭 갔다 잔디밭에 물이 꽤 고여있어서..."
          images={[]}
        />

        <Container className="gap-4 p-6">
          <h2>커스텀 스타일</h2>
          <p>내용</p>
        </Container>
      </div>
    </>
  );
}
