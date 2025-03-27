import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// 定義文章內容映射表
interface ArticleContentMap {
  [key: string]: string;
}

// 文章內容資料庫 (僅保留示例，實際使用時會從外部獲取)
const articleContent: ArticleContentMap = {
  'criminal-1': `# 公然侮辱與誹謗的法律界線：如何保護自己的名譽權？

## 前言

在現代社會中，隨著網路與社群媒體的普及，言論自由的範圍不斷擴大，但同時也帶來了許多關於名譽權受侵害的糾紛。本文將探討公然侮辱與誹謗的法律界限，並提供保護個人名譽權的實用建議。

## 一、公然侮辱與誹謗的法律定義

### 公然侮辱
根據《刑法》第309條，公然侮辱是指以公然方式，以言詞、文字、圖畫或其他方法，損害他人名譽的行為。「公然」指的是不特定多數人得以共見共聞的狀態。

### 誹謗
《刑法》第310條規定，誹謗是指以散布於眾或以文字、圖畫刊布的方式，指摘或傳述足以損害他人名譽的具體事件。`,
};

// 相關文章列表
const relatedArticles = [
  { id: 'criminal-2', category: 'criminal', title: '公然侮辱罪的法律構成要件' },
  { id: 'criminal-3', category: 'criminal', title: '誹謗罪的法律構成要件' },
  { id: 'criminal-4', category: 'criminal', title: '網路行為的法律責任' },
  { id: 'civil-1', category: 'civil', title: '名譽權受侵害的民事救濟' },
  { id: 'civil-2', category: 'civil', title: '主觀惡意原則的適用' },
  { id: 'civil-3', category: 'civil', title: '言論自由與名譽權的平衡' },
];

// 文章分類
const categories = [
  { id: 'criminal', name: '刑事法律' },
  { id: 'civil', name: '民事法律' },
  { id: 'administrative', name: '行政法律' },
  { id: 'procedure', name: '訴訟程序' },
];

const ArticlePageNew: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [article, setArticle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('content'); // 'content' or 'related'
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [showToc, setShowToc] = useState<boolean>(true);

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

  useEffect(() => {
    // 使用預設的文章內容，不從外部獲取
    const loadArticle = () => {
      try {
        // 根據類別和 ID 構建文章索引
        const articleKey = `${category}-${id}`;
        
        if (articleContent[articleKey]) {
          // 從預設內容中獲取文章
          const content = articleContent[articleKey];
          
          // 從內容中提取標題（第一行的 # 後面的內容）
          const titleMatch = content.match(/^# (.+)$/m);
          const articleTitle = titleMatch ? titleMatch[1] : '未知標題';
          
          setArticle(content);
          setTitle(articleTitle);
        } else {
          // 如果找不到對應的文章，使用預設訊息
          setArticle('# 文章尚未上線\n\n此文章正在編寫中，請稍後再訪問。');
          setTitle('文章尚未上線');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('無法載入文章:', error);
        setArticle('# 載入文章時發生錯誤\n\n請稍後再試，或聯繫網站管理員。');
        setTitle('載入錯誤');
        setLoading(false);
      }
    };

    loadArticle();
  }, [category, id]);

  // 提取文章目錄
  const extractToc = (content: string) => {
    const headings = content.match(/^#{2,3} (.+)$/gm) || [];
    return headings.map((heading, index) => {
      const level = heading.match(/^(#{2,3})/)?.[0].length || 2;
      const text = heading.replace(/^#{2,3} /, '');
      return { id: `heading-${index}`, text, level };
    });
  };

  const toc = extractToc(article);

  // 頁面動畫
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 閱讀進度條 */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 返回頂部按鈕 */}
      {readingProgress > 20 && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-all z-40"
          aria-label="返回頂部"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* 文章頁頭部 */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/knowlege_1.png')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* 麵包屑導航 */}
            <div className="flex items-center text-sm text-gray-300 mb-6 space-x-2">
              <Link to="/" className="hover:text-primary transition-colors">首頁</Link>
              <span>/</span>
              <Link to="/knowledge" className="hover:text-primary transition-colors">法務常識</Link>
              <span>/</span>
              <Link to={`/knowledge/${category}`} className="hover:text-primary transition-colors">
                {categories.find(c => c.id === category)?.name || '未知分類'}
              </Link>
              <span>/</span>
              <span className="text-gray-400 truncate max-w-[200px]">{title}</span>
            </div>
            
            {/* 文章標題 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold mb-4 max-w-3xl"
            >
              {title}
            </motion.h1>
            
            {/* 文章資訊 */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>發布日期: 2025-03-01</span>
              <span>閱讀時間: 約 10 分鐘</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 側邊欄 */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                {/* 目錄切換按鈕 */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">文章目錄</h3>
                  <button 
                    onClick={() => setShowToc(!showToc)}
                    className="text-gray-500 hover:text-primary"
                  >
                    {showToc ? '隱藏' : '顯示'}
                  </button>
                </div>
                
                {/* 目錄內容 */}
                {showToc && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 mb-6"
                  >
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm py-1 border-l-2 pl-3 hover:text-primary transition-colors ${
                          item.level === 2 
                            ? 'border-primary text-gray-900 font-medium' 
                            : 'border-gray-200 text-gray-600 ml-3'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </motion.div>
                )}
                
                {/* 分享區域 */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">分享文章</h3>
                  <div className="flex space-x-3">
                    <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M18.968 8.37C18.968 4.58 15.8 1.5 12 1.5S5.032 4.58 5.032 8.37c0 3.392 3.067 6.23 7.2 6.75.28.06.663.186.76.425.087.217.056.557.027.775 0 0-.1.607-.122.735-.037.186-.17.728.636.397.806-.33 4.354-2.573 5.94-4.404 1.1-1.214 1.495-2.446 1.495-4.678zm-3.748 3.578a.409.409 0 0 1-.285.096h-2.1a.11.11 0 0 0-.11.11v.15c0 .06.05.11.11.11h2.1c.106 0 .211.042.285.096a.365.365 0 0 1 .075.454.409.409 0 0 1-.285.096h-2.1c-.32 0-.578.258-.578.577v.578c0 .06.05.11.11.11h2.1c.106 0 .211.042.285.096a.365.365 0 0 1 .075.454.409.409 0 0 1-.285.096h-2.1a.11.11 0 0 0-.11.11v.578c0 .319-.258.577-.578.577h-.578a.576.576 0 0 1-.577-.577v-.578a.11.11 0 0 0-.11-.11h-2.1a.409.409 0 0 1-.285-.096.365.365 0 0 1-.075-.454.409.409 0 0 1 .285-.096h2.1c.06 0 .11-.05.11-.11v-.578a.11.11 0 0 0-.11-.11h-2.1a.409.409 0 0 1-.285-.096.365.365 0 0 1-.075-.454.409.409 0 0 1 .285-.096h2.1c.06 0 .11-.05.11-.11v-.15a.11.11 0 0 0-.11-.11h-2.1a.409.409 0 0 1-.285-.096.365.365 0 0 1-.075-.454.409.409 0 0 1 .285-.096h2.1c.06 0 .11-.05.11-.11v-.578c0-.319.258-.577.578-.577h.578c.32 0 .578.258.578.577v.578c0 .06.05.11.11.11h2.1c.106 0 .211.042.285.096a.365.365 0 0 1 .075.454z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 文章主體 */}
            <div className="lg:w-3/4">
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* 文章內容 */}
                <div className="p-6 sm:p-8">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown>{article}</ReactMarkdown>
                  </div>
                  
                  {/* 文章評分 */}
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">這篇文章對您有幫助嗎？</h3>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                        </svg>
                        有幫助
                      </button>
                      <button className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"></path>
                        </svg>
                        沒幫助
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* 相關文章 */}
                <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">相關文章</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedArticles.slice(0, 4).map((article) => (
                      <Link 
                        key={`${article.category}-${article.id}`}
                        to={`/knowledge/${article.category}/${article.id}`}
                        className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                        <p className="text-sm text-gray-600">
                          了解更多關於{article.title}的法律知識...
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePageNew;
