import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 社交媒體分享選項類型定義
export interface SocialMediaOption {
  name: string;
  icon: React.ReactNode;
  shareUrl: (url: string) => string;
  color: string;
}

// 統一社交分享元件屬性
interface SocialShareUnifiedProps {
  url: string;
  title: string;
  showCopyLink?: boolean;     // 是否顯示複製連結按鈕
  useAnimation?: boolean;     // 是否使用動畫效果
  compact?: boolean;          // 是否使用緊湊模式
  showTitle?: boolean;        // 是否顯示「分享文章」標題
  className?: string;         // 自定義CSS類名
  noCard?: boolean;           // 是否不使用卡片樣式
}

// 預設的社交媒體選項
export const socialMediaOptions: SocialMediaOption[] = [
  {
    name: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: '#1877F2'
  },
  {
    name: 'Twitter',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    color: '#1DA1F2'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: '#0A66C2'
  },
  {
    name: 'LINE',
    icon: (
      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '10px', lineHeight: '10px' }}>LINE</span>
    ),
    shareUrl: (url: string) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
    color: '#06C755'
  },
  {
    name: 'Thread',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.587 1.5 12.075c0-3.509.85-6.362 2.495-8.419C5.845 1.355 8.598.176 12.179.152c3.601-.024 6.376 1.132 8.246 3.435 1.741 2.129 2.575 5.007 2.575 8.871 0 3.869-.834 6.748-2.575 8.875-1.87 2.293-4.646 3.449-8.239 3.449v.218zm-.355-22.629c-3.013.022-5.312.962-6.828 2.801-1.347 1.634-2.024 3.975-2.024 6.96 0 2.989.677 5.331 2.024 6.969 1.516 1.841 3.815 2.781 6.836 2.803 3.038 0 5.358-.918 6.882-2.727 1.347-1.596 2.024-3.938 2.024-6.934 0-2.992-.677-5.335-2.024-6.934-1.524-1.815-3.844-2.738-6.89-2.738v-.2zm-.355 16.825c-1.609 0-2.833-.483-3.632-1.435-.667-.798-1.015-1.895-1.015-3.231 0-1.333.348-2.429 1.015-3.225.799-.95 2.023-1.432 3.632-1.432 1.628 0 2.864.482 3.676 1.432.667.796 1.015 1.892 1.015 3.225 0 1.336-.348 2.433-1.015 3.231-.812.952-2.048 1.435-3.676 1.435zm0-7.226c-.917 0-1.591.22-2.023.649-.355.355-.533.917-.533 1.698 0 .784.178 1.35.533 1.703.432.432 1.106.649 2.023.649.938 0 1.624-.217 2.066-.649.354-.353.533-.919.533-1.703 0-.781-.179-1.343-.533-1.698-.442-.429-1.128-.649-2.066-.649z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://www.threads.net/intent/post?url=${encodeURIComponent(url)}`,
    color: '#000000'
  }
];

/**
 * 統一社交分享元件
 * 結合了 SocialShare 和 ShareArticle 的功能，更加靈活
 */
const SocialShareUnified: React.FC<SocialShareUnifiedProps> = ({ 
  url, 
  title, 
  showCopyLink = false, 
  useAnimation = false, 
  compact = false,
  showTitle = false,
  className = '',
  noCard = false
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // 複製連結功能
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  // 分享到社交媒體
  const shareToSocialMedia = (option: SocialMediaOption) => {
    const shareUrl = option.name === 'Twitter' || option.name === 'Facebook' 
      ? option.shareUrl(url) + (option.name === 'Twitter' ? `&text=${encodeURIComponent(title)}` : `&quote=${encodeURIComponent(title)}`)
      : option.shareUrl(url);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // 按鈕動畫
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  // 根據 compact 和 noCard 屬性決定容器和按鈕的樣式
  const containerClass = compact 
    ? `flex flex-wrap items-center space-x-2 ${className}`
    : noCard 
      ? `flex flex-col ${className}`
      : `flex flex-col bg-white rounded-xl shadow-sm p-6 ${className}`;
    
  // 渲染社交媒體按鈕
  const renderSocialButtons = () => {
    return socialMediaOptions.map((option, index) => {
      // 按鈕基本樣式
      const baseButtonClass = compact
        ? "text-gray-600 hover:text-[#D0C86D] transition-colors p-2 rounded-full hover:bg-gray-100 relative group"
        : "w-10 h-10 text-white rounded-full transition-colors shadow-sm flex items-center justify-center relative group";
      
      // 按鈕內容
      const buttonContent = (
        <>
          <div className={`flex items-center justify-center ${!compact ? 'w-full h-full' : ''}`} style={!compact ? { backgroundColor: option.color } : {}}>
            {option.icon}
          </div>
          
          {/* 懸停提示 */}
          <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-700 rounded transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            分享到 {option.name}
          </div>
        </>
      );

      // 根據是否使用動畫決定按鈕元素
      if (useAnimation) {
        return (
          <motion.button
            key={index}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => shareToSocialMedia(option)}
            className={baseButtonClass}
            aria-label={`分享到 ${option.name}`}
          >
            {buttonContent}
          </motion.button>
        );
      } else {
        return (
          <a
            key={index}
            href={option.shareUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            className={baseButtonClass}
            aria-label={`分享到 ${option.name}`}
          >
            {buttonContent}
          </a>
        );
      }
    });
  };

  // 渲染複製連結按鈕
  const renderCopyButton = () => {
    if (!showCopyLink) return null;

    const baseButtonClass = compact
      ? "text-gray-600 hover:text-[#D0C86D] transition-colors p-2 rounded-full hover:bg-gray-100 relative group"
      : "w-10 h-10 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors shadow-sm flex items-center justify-center relative group";

    const buttonContent = (
      <>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        
        {/* 懸停提示 */}
        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-700 rounded transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          複製連結
        </div>
      </>
    );

    if (useAnimation) {
      return (
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={copyLink}
          className={baseButtonClass}
          aria-label="複製連結"
        >
          {buttonContent}
        </motion.button>
      );
    } else {
      return (
        <button
          onClick={copyLink}
          className={baseButtonClass}
          aria-label="複製連結"
        >
          {buttonContent}
        </button>
      );
    }
  };

  return (
    <div className={containerClass}>
      {showTitle && <h3 className="text-lg font-semibold mb-4">分享文章</h3>}
      
      {compact && <span className="text-gray-600 mr-2">分享文章：</span>}
      
      <div className={`${compact ? 'flex items-center space-x-2' : 'grid grid-cols-5 gap-3'}`}>
        {renderSocialButtons()}
        {renderCopyButton()}
      </div>
      
      {/* 複製成功提示 */}
      {showCopyLink && isCopied && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center py-2 px-4 bg-green-100 text-green-700 rounded-md font-medium text-sm mt-2"
        >
          連結已複製到剪貼簿！
        </motion.div>
      )}
    </div>
  );
};

export default SocialShareUnified;
