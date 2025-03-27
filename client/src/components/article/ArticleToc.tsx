import React from 'react';

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
  // 點擊目錄項目時滾動到對應的標題
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="article-toc">
      <h3>目錄</h3>
      <ul>
        {toc.map((item) => (
          <li 
            key={item.id}
            className={`toc-item level-${item.level} ${activeHeadingId === item.id ? 'active' : ''}`}
          >
            <button 
              onClick={() => scrollToHeading(item.id)}
              className="toc-button"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleToc;
