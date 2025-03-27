import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTocProps {
  toc: TocItem[];
  activeHeadingId: string;
}

/**
 * 文章目錄組件
 * 顯示文章的目錄結構，並支援目錄項目的高亮顯示
 */
const ArticleToc: React.FC<ArticleTocProps> = ({ toc, activeHeadingId }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [activeId, setActiveId] = useState<string | undefined>(activeHeadingId);

  // 當 activeHeadingId 變化時更新 activeId
  useEffect(() => {
    setActiveId(activeHeadingId);
  }, [activeHeadingId]);

  // 點擊目錄項目時滾動到對應的標題
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* 目錄標題和切換按鈕 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">文章目錄</h3>
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-500 hover:text-primary transition-colors"
          aria-label={isVisible ? '隱藏目錄' : '顯示目錄'}
        >
          {isVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {/* 目錄內容 */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1 toc-container max-h-[60vh] overflow-y-auto pr-2"
          >
            {toc.length > 0 ? (
              toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading(item.id);
                  }}
                  className={`
                    block text-sm py-1.5 border-l-2 pl-3 transition-all duration-200
                    ${item.level === 2 
                      ? 'font-medium' 
                      : 'ml-3 text-sm'
                    }
                    ${activeId === item.id
                      ? 'border-primary text-primary font-medium'
                      : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400'
                    }
                  `}
                >
                  {item.text}
                </a>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">此文章沒有目錄</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleToc;
