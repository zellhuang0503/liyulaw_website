import React, { useEffect, useState } from 'react';

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
  const [activeId, setActiveId] = useState<string | undefined>(activeHeadingId);

  // 當 activeHeadingId 變化時更新 activeId
  useEffect(() => {
    setActiveId(activeHeadingId);
  }, [activeHeadingId]);

  // 點擊目錄項目時滾動到對應的標題
  const scrollToHeading = (id: string) => {
    console.log(`[ArticleToc] Attempting to scroll to ID: ${id}`); 
    const element = document.getElementById(id);
    console.log(`[ArticleToc] Found element for ID ${id}:`, element); 
    
    if (element) {
      // 使用 scrollIntoView 進行滾動，並考慮頂部偏移
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // 將元素滾動到視窗頂部
      });
      
      setActiveId(id);
    } else {
      
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* 目錄標題 */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg whitespace-nowrap">文章目錄</h3>
      </div>
      
      {/* 目錄內容 */}
      <div className="space-y-0.5 toc-container max-h-[60vh] overflow-y-auto pr-2">
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
                block py-1 border-l-2 pl-3 transition-all duration-200 whitespace-normal
                ${item.level === 2 
                  ? 'font-medium text-base' 
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
      </div>
    </div>
  );
};

export default ArticleToc;
