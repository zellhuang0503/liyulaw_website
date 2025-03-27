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

  return (
    <div className="flex flex-col">
      <div className="flex justify-center space-x-4 mb-4">
        {/* Facebook */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={shareToFacebook}
          className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
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
          className="w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors shadow-md flex items-center justify-center"
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
          className="w-12 h-12 bg-[#06C755] text-white rounded-full hover:bg-green-600 transition-colors shadow-md flex items-center justify-center"
          aria-label="分享到 LINE"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.002 2c-5.522 0-9.998 3.618-9.998 8.075 0 3.996 3.552 7.349 8.348 7.975.325.078.77.238.882.871.1.569.087 1.133-.037 1.575-.138.491-.651.798-.651.798s-.169.143-.204.177c-.625.525-.187 1.025.45 1.025.638 0 3.925-2.3 5.357-3.95 1.452-1.65 2.052-3.325 2.052-5.475C18.002 5.617 17.02 2 12.002 2zm-3.5 8.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5s.5.224.5.5v3zm5 0c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5s.5.224.5.5v3zm-2.501 0c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5s.5.224.5.5v3z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        {/* 複製連結 */}
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={copyLink}
          className="w-12 h-12 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors shadow-md flex items-center justify-center"
          aria-label="複製連結"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </motion.button>
      </div>
      
      {/* 複製成功提示 */}
      {isCopied && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center py-2 px-4 bg-green-100 text-green-700 rounded-md font-medium text-sm"
        >
          連結已複製到剪貼簿！
        </motion.div>
      )}
    </div>
  );
};

export default ShareArticle;
