import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/article.css';

// 引入組件
import TableOfContents from '../components/article/ArticleToc';
import RelatedArticles from '../components/article/RelatedArticlesList';
import ShareArticle from '../components/ShareArticle';
import ArticleLoader from '../components/article/ArticleLoader';
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
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // 監聽滾動事件，顯示回到頂部按鈕
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // 當滾動超過 300px 時顯示回到頂部按鈕
      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // 回到頂部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 提取文章目錄
  const toc = extractToc(article);

  // 獲取類別的中文名稱
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'criminal':
        return '刑事法律';
      case 'civil':
        return '民事法律';
      case 'administrative':
        return '行政法律';
      case 'corporate':
        return '企業法務';
      default:
        return '法律知識';
    }
  };

  return (
    <div className="article-page">
      {/* 文章載入器組件 */}
      <ArticleLoader 
        category={category || ''} 
        id={id || ''} 
        onArticleLoaded={handleArticleLoaded}
        onLoadingChange={handleLoadingChange}
      />

      {/* 頁面標題區塊 */}
      <div 
        className="page-header text-white py-24 relative"
        style={{ 
          backgroundImage: 'url("/images/knowlege_1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 黑色覆蓋層 */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* 麵包屑導航 */}
          <div className="breadcrumbs mb-4 text-sm opacity-80">
            <Link to="/" className="hover:underline">首頁</Link>
            <span className="mx-2">/</span>
            <Link to={`/articles/${category}`} className="hover:underline">{getCategoryName(category || '')}</Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg opacity-80">{getCategoryName(category || '')} - 專業法律知識，助您了解權益與義務</p>
        </div>
      </div>

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
          <div className="article-body">
            {/* 左側邊欄 - 固定目錄 */}
            <div className="article-sidebar-left">
              <div className="sticky-toc">
                {/* 文章目錄組件 */}
                <TableOfContents toc={toc} activeHeadingId={activeHeadingId} />
                
                {/* 分享文章組件 */}
                <div className="share-container mt-6">
                  <h3 className="text-lg font-semibold mb-4">分享文章</h3>
                  <ShareArticle title={title} url={window.location.href} />
                </div>
              </div>
            </div>

            {/* 文章主內容 */}
            <div className="article-main">
              {/* 文章內容組件 */}
              <ArticleContent article={article} toc={toc} />
              
              {/* 返回上一層按鈕 */}
              <div className="back-to-category mt-8 mb-8">
                <Link 
                  to={`/articles/${category}`} 
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  返回{getCategoryName(category || '')}文章列表
                </Link>
              </div>
              
              {/* 相關文章組件 */}
              <RelatedArticles 
                currentCategory={category || ''}
                currentId={id || ''}
              />
            </div>

            {/* 右側邊欄 - 已移除 */}
          </div>
        </motion.div>
      )}

      {/* 回到頂部按鈕 */}
      {showScrollTop && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default ArticlePage;
