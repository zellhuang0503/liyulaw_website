import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeItemId?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeItemId }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [activeId, setActiveId] = useState<string | undefined>(activeItemId);

  // 監聽滾動事件，更新當前活動的目錄項
  useEffect(() => {
    const handleScroll = () => {
      // 獲取所有標題元素 - 現在匹配包含 ** 的標題
      const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, p strong'));
      
      // 找出當前視窗中最頂部的標題
      const visibleHeadings = headingElements
        .filter(heading => heading.textContent?.includes('**'))
        .map((heading) => {
          const rect = heading.getBoundingClientRect();
          return {
            id: heading.id || heading.textContent?.replace(/\*/g, '').trim().replace(/\s+/g, '-').toLowerCase() || '',
            top: rect.top,
            visible: rect.top >= 0 && rect.top <= window.innerHeight / 2
          };
        })
        .filter(heading => heading.visible)
        .sort((a, b) => a.top - b.top);
      
      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            {items.length > 0 ? (
              items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 100,
                        behavior: 'smooth'
                      });
                      setActiveId(item.id);
                    }
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

export default TableOfContents;
