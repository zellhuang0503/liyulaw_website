import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/article.css';

// 引入組件
import TableOfContents from '../components/TableOfContents';
import RelatedArticles from '../components/RelatedArticles';
import ShareArticle from '../components/ShareArticle';
import ArticleLoader from '../components/article/ArticleLoader';
import ReadingProgress from '../components/article/ReadingProgress';
import ArticleContent from '../components/article/ArticleContent';

/**
 * 文章頁面組件
 * 整合所有文章相關的子組件，負責文章的顯示和互動
 */
const ArticlePage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [article, setArticle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // 監聽滾動事件，更新閱讀進度
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const readingProgress = scrollTop / docHeight * 100;
      setReadingProgress(readingProgress);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // 監聽滾動事件，更新當前活動的標題
  useEffect(() => {
    const updateActiveHeading = () => {
      // 獲取所有標題元素
      const headings = Array.from(document.querySelectorAll('h2, h3'));
      
      if (headings.length === 0) return;
      
      // 找到當前視窗中最頂部的標題
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const rect = heading.getBoundingClientRect();
        
        // 如果標題在視窗頂部或剛剛滾過視窗頂部
        if (rect.top <= 100) {
          const id = heading.id;
          if (id) {
            setActiveHeadingId(id);
          }
        } else {
          // 如果是第一個標題且還沒滾動到，就設置它為活動標題
          if (i === 0 && rect.top > 100) {
            const id = heading.id;
            if (id) {
              setActiveHeadingId(id);
            }
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', updateActiveHeading);
    // 初始化時也執行一次
    updateActiveHeading();
    
    return () => window.removeEventListener('scroll', updateActiveHeading);
  }, [article]); // 當文章內容變化時重新綁定事件

  // 提取文章目錄
  const extractToc = (content: string) => {
    const headings = content.match(/^#{2,3} (.+)$/gm) || [];
    return headings.map((heading, index) => {
      const level = heading.match(/^(#{2,3})/)?.[0].length || 2;
      const text = heading.replace(/^#{2,3} /, '');
      return { id: `heading-${index}`, text, level };
    });
  };

  // 處理文章載入完成的回調
  const handleArticleLoaded = (articleContent: string, articleTitle: string) => {
    setArticle(articleContent);
    setTitle(articleTitle);
  };

  // 處理載入狀態變化的回調
  const handleLoadingChange = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  // 提取文章目錄
  const toc = extractToc(article);

  // 相關文章數據
  const relatedArticles = [
    { id: '1', category: 'criminal', title: '公然侮辱與誹謗的法律界線', summary: '了解名譽權受侵害時的法律救濟途徑...' },
    { id: '2', category: 'criminal', title: '網路罵人價目表', summary: '探討網路言論的法律風險與可能賠償...' },
  ];

  return (
    <div className="article-page">
      {/* 文章載入器組件 */}
      <ArticleLoader 
        category={category || ''} 
        id={id || ''} 
        onArticleLoaded={handleArticleLoaded}
        onLoadingChange={handleLoadingChange}
      />

      {/* 閱讀進度條 */}
      <ReadingProgress progress={readingProgress} />

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>正在載入文章...</p>
        </div>
      ) : (
        <motion.div
          className="article-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="article-header">
            <h1>{title}</h1>
          </div>

          <div className="article-body">
            <div className="article-sidebar">
              {/* 文章目錄組件 */}
              <TableOfContents items={toc} activeItemId={activeHeadingId} />
              
              {/* 分享文章組件 */}
              <ShareArticle title={title} url={window.location.href} />
            </div>

            <div className="article-main">
              {/* 文章內容組件 */}
              <ArticleContent article={article} toc={toc} />
              
              {/* 相關文章組件 */}
              <RelatedArticles 
                articles={relatedArticles}
                currentArticleId={`${category}-${id}`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ArticlePage;
