import React from 'react';

// 回到頂部按鈕元件屬性
interface BackToTopButtonProps {
  visible: boolean;
  onClick: () => void;
}

// 回到頂部按鈕元件
const BackToTopButton: React.FC<BackToTopButtonProps> = ({ visible, onClick }) => {
  if (!visible) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 p-3 bg-[#D0C86D] text-white rounded-full shadow-lg hover:bg-[#E67E22] transition-colors z-50"
      aria-label="回到頂部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
