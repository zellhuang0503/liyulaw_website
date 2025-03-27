import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ShareArticleProps {
  title: string;
  url: string;
}

const ShareArticle: React.FC<ShareArticleProps> = ({ title, url }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  // 分享到 Facebook
  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // 分享到 Twitter
  const shareToTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // 分享到 LINE
  const shareToLine = () => {
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  // 複製連結
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
  // 按鈕動畫
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  // 按鈕共用樣式
  const buttonStyle = {
    width: '40px',
    height: '40px'
  };
  
  return (
    <div className="pt-4 border-t border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">分享文章</h3>
      
      <div className="flex space-x-3">
        {/* Facebook */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={shareToFacebook}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors share-button flex items-center justify-center"
          style={buttonStyle}
          aria-label="分享到 Facebook"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        {/* Twitter */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={shareToTwitter}
          className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors share-button flex items-center justify-center"
          style={buttonStyle}
          aria-label="分享到 Twitter"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </motion.button>
        
        {/* LINE */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={shareToLine}
          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors share-button flex items-center justify-center"
          style={buttonStyle}
          aria-label="分享到 LINE"
        >
          <img 
            src="/images/line.svg" 
            alt="分享到 LINE" 
            className="w-6 h-6"
          />
        </motion.button>
        
        {/* 複製連結 */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={copyLink}
          className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors share-button flex items-center justify-center"
          style={buttonStyle}
          aria-label="複製連結"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </motion.button>
      </div>
      
      {/* 複製成功提示 */}
      {isCopied && (
        <div className="mt-2 text-sm text-green-600 font-medium">
          連結已複製到剪貼簿！
        </div>
      )}
    </div>
  );
};

export default ShareArticle;
