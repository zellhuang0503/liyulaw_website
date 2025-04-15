import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// 引入自定義元件
import SocialShareUnified from '../../components/common/SocialShareUnified';
import TableOfContents, { TocItem } from './TableOfContents';
import BackToTopButton from './BackToTopButton';

// 引入工具函數
import { 
  extractHeadingsFromMarkdown, 
  cleanMarkdownContent, 
  scrollToHeading, 
  scrollToTop 
} from '../../utils/articleUtils';

// 引入樣式
import { MarkdownStyles } from '../../styles/article/MarkdownStyles';

// 文章模板屬性
interface ArticleTemplateProps {
  articleFileName: string;  // Markdown 檔案名稱（不含副檔名）
  pageTitle: string;        // 頁面標題
}

// 文章模板元件
const ArticleTemplate: React.FC<ArticleTemplateProps> = ({ 
  articleFileName, 
  pageTitle 
}) => {
  // 狀態管理
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  
  // 參考
  const contentRef = useRef<HTMLDivElement>(null);

  // 處理目錄項目點擊
  const handleTocItemClick = (id: string) => {
    scrollToHeading(id);
    setActiveHeading(id);
  };

  // 處理滾動事件
  const handleScroll = () => {
    // 顯示/隱藏回到頂部按鈕
    setShowBackToTop(window.scrollY > 300);
    
    // 更新活躍標題
    if (tocItems.length > 0) {
      let currentActiveHeading = '';
      let closestHeadingDistance = Number.MAX_VALUE;
      
      tocItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 120); // 120px 是導航欄的高度
          
          if (distance < closestHeadingDistance && rect.top <= 120) {
            closestHeadingDistance = distance;
            currentActiveHeading = item.id;
          }
        }
      });
      
      if (currentActiveHeading) {
        setActiveHeading(currentActiveHeading);
      }
    }
  };

  // 從文章內容提取目錄項目
  const extractTocItems = (content: string): TocItem[] => {
    const items: TocItem[] = [];
    
    // 匹配 **標題** 格式
    const lines = content.split('\n');
    lines.forEach(line => {
      if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.replace(/\*/g, '').trim();
        const id = text.replace(/\s+/g, '-').toLowerCase();
        items.push({ id, text, level: 2 }); // 假設都是二級標題
      }
    });
    
    return items;
  };

  // 獲取文章內容
  const fetchArticle = async () => {
    try {
      setLoading(true);
      
      // 構建文章檔案路徑
      const articlePath = `/article/${articleFileName}.md`;
      
      // 獲取文章內容
      const response = await fetch(articlePath);
      if (!response.ok) {
        throw new Error('無法獲取文章內容');
      }
      
      let text = await response.text();
      
      // 清理 Markdown 內容
      text = cleanMarkdownContent(text);
      
      // 提取標題並設置目錄
      const headings = extractTocItems(text);
      setTocItems(headings);
      
      // 設置文章內容
      setContent(text);
      
      // 如果有標題，設置第一個標題為活躍標題
      if (headings.length > 0) {
        setActiveHeading(headings[0].id);
      }
    } catch (error) {
      console.error('獲取文章時出錯:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化
  useEffect(() => {
    fetchArticle();
    
    // 添加滾動事件監聽器
    window.addEventListener('scroll', handleScroll);
    
    // 清理函數
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [articleFileName]);

  // 渲染元件
  return (
    <HelmetProvider>
      <div className="bg-gray-50 min-h-screen">
        {/* SEO 優化 */}
        <Helmet>
          <title>{pageTitle} - 立宇法律事務所</title>
          <meta name="description" content={`${pageTitle} - 立宇法律事務所專業文章`} />
          <meta property="og:title" content={`${pageTitle} - 立宇法律事務所`} />
          <meta property="og:description" content={`${pageTitle} - 立宇法律事務所專業文章`} />
          <meta property="og:type" content="article" />
        </Helmet>

        {/* 文章樣式 */}
        <style>{MarkdownStyles}</style>

        {/* 文章容器 */}
        <div className="container mx-auto px-4 py-8">
          {/* 麵包屑導航 */}
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-[#D0C86D]">首頁</Link>
            <span className="mx-2">/</span>
            <Link to="/articles" className="hover:text-[#D0C86D]">文章</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{pageTitle}</span>
          </div>

          {/* 文章內容區域 */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* 主要內容區 */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* 文章標題 */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#34495E] mb-6">{pageTitle}</h1>
              
              {/* 社交分享 */}
              <SocialShareUnified 
                url={window.location.href} 
                title={pageTitle} 
                compact={true} 
              />
              
              {/* 文章內容 */}
              <div 
                ref={contentRef}
                className={`bg-white rounded-lg shadow-md p-6 article-content ${loading ? 'animate-pulse' : ''}`}
              >
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3 mt-8"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ) : (
                  <ReactMarkdown>{content}</ReactMarkdown>
                )}
              </div>
            </motion.div>

            {/* 側邊欄 */}
            <motion.div 
              className="md:w-1/4 md:min-w-[250px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* 目錄 */}
              {tocItems.length > 0 && (
                <div className="sticky top-24">
                  <div className="hidden md:block">
                    <TableOfContents 
                      items={tocItems} 
                      activeHeading={activeHeading} 
                      onItemClick={handleTocItemClick} 
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* 回到頂部按鈕 */}
        <BackToTopButton visible={showBackToTop} onClick={scrollToTop} />
      </div>
    </HelmetProvider>
  );
};

export default ArticleTemplate;
