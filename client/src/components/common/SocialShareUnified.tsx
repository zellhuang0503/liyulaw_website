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
      <img 
        src="/images/Threads-logo40x40.png" 
        alt="Threads" 
        width="18" 
        height="18" 
        style={{ display: 'inline-block' }}
      />
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
    const shareUrl = option.name === 'Facebook' 
      ? option.shareUrl(url) + `&quote=${encodeURIComponent(title)}`
      : option.shareUrl(url);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // 獲取圖標縮放比例
  const getIconScale = (name: string): number => {
    switch (name) {
      case 'Facebook':
        return 1.2; // Facebook 圖標稍微放大
      case 'LinkedIn':
        return 1.1; // LinkedIn 圖標略微放大
      case 'LINE':
        return 1.3; // LINE 圖標需要更大一些
      case 'Thread':
        return 1.8; // Thread 圖標放大更多
      default:
        return 1;
    }
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
        : "w-10 h-10 text-white rounded-lg transition-colors shadow-sm flex items-center justify-center relative group overflow-hidden";
      
      // 按鈕內容
      const buttonContent = (
        <>
          <div className={`flex items-center justify-center ${!compact ? 'w-full h-full' : ''}`} style={!compact ? { backgroundColor: option.color } : {}}>
            <div className="flex items-center justify-center" style={{ transform: `scale(${getIconScale(option.name)})` }}>
              {option.icon}
            </div>
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
      : "w-10 h-10 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors shadow-sm flex items-center justify-center relative group";

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
