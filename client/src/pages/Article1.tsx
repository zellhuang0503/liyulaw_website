import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

// 自定義樣式組件
const MarkdownStyles = `
  .article-content h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #333;
    margin-top: 2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #D0C86D;
  }

  .article-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #34495E;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #eaeaea;
  }

  .article-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #34495E;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .article-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #666;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .article-content h5 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #666;
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .article-content h6 {
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .article-content p {
    margin-bottom: 2rem;
    line-height: 1.8;
    color: #333;
  }

  .article-content ul, .article-content ol {
    margin-left: 1.5rem;
    margin-bottom: 2rem;
  }

  .article-content li {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .article-content blockquote {
    border-left: 4px solid #D0C86D;
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: #555;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 0 0.25rem 0.25rem 0;
    margin-bottom: 2rem;
  }

  .article-content code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9rem;
  }

  .article-content pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin-bottom: 2rem;
  }

  .article-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
    margin: 2rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .article-content a {
    color: #D0C86D;
    text-decoration: none;
    transition: color 0.2s;
  }

  .article-content a:hover {
    color: #E67E22;
    text-decoration: underline;
  }

  .article-content hr {
    border: 0;
    height: 1px;
    background-color: #eaeaea;
    margin: 2.5rem 0;
  }

  .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  .article-content th, .article-content td {
    border: 1px solid #eaeaea;
    padding: 0.75rem;
    text-align: left;
  }

  .article-content th {
    background-color: #f5f5f5;
    font-weight: 600;
  }

  .article-content tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

// 目錄項目介面
interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 社交媒體分享連結
const socialMediaLinks = [
  {
    name: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    name: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.979 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    shareUrl: (url: string) => `https://www.instagram.com/?url=${encodeURIComponent(url)}`
  },
  {
    name: 'LINE',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.043-.068-.1-.068-.169v-5.229c0-.129.104-.233.233-.233h.838zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.043-.043-.067-.1-.067-.169v-5.229c0-.063.025-.12.067-.162.042-.043.099-.067.162-.067h3.363zm-10.026.001c.129 0 .233.105.233.233v5.229c0 .129-.104.234-.233.234h-.837c-.129 0-.234-.105-.234-.234v-5.229c0-.128.105-.233.234-.233h.837zm2.445 0c.129 0 .233.105.233.233v5.229c0 .129-.104.234-.233.234h-.838c-.129 0-.233-.105-.233-.234v-2.539h-1.376v2.539c0 .129-.104.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.229c0-.128.105-.233.234-.233h.837c.13 0 .234.105.234.233v1.736h1.376v-1.736c0-.128.104-.233.234-.233h.838z"/>
      </svg>
    ),
    shareUrl: (url: string) => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`
  },
  {
    name: 'Thread',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.287c.129 0 .233.104.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.119-.025-.161-.065-.043-.043-.068-.1-.068-.169v-5.229c0-.129.104-.233.233-.233h.838zm14.992 0c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.883h2.287c.129 0 .233.105.233.234v.842c0 .129-.104.234-.233.234h-2.287v.884h2.287c.129 0 .233.105.233.233v.842c0 .129-.104.234-.233.234h-3.363c-.063 0-.12-.025-.162-.065-.043-.043-.067-.1-.067-.169v-5.229c0-.063.025-.12.067-.162.042-.043.099-.067.162-.067h3.363zm-10.026.001c.129 0 .233.105.233.233v5.229c0 .129-.104.234-.233.234h-.837c-.129 0-.234-.105-.234-.234v-5.229c0-.128.105-.233.234-.233h.837zm2.445 0c.129 0 .233.105.233.233v5.229c0 .129-.104.234-.233.234h-.838c-.129 0-.233-.105-.233-.234v-2.539h-1.376v2.539c0 .129-.104.234-.234.234h-.837c-.129 0-.234-.105-.234-.234v-5.229c0-.128.105-.233.234-.233h.837c.13 0 .234.105.234.233v1.736h1.376v-1.736c0-.128.104-.233.234-.233h.838z"/>
      </svg>
    ),
    shareUrl: (url: string) => `https://www.threads.net/intent/post?url=${encodeURIComponent(url)}`
  }
];

const Article1: React.FC = () => {
  const pageTitle = '公然侮辱與誹謗的法律界線：如何保護自己的名譽權？';
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<{[key: string]: HTMLHeadingElement | null}>({});

  // 處理目錄項目點擊
  const handleTocItemClick = (id: string) => {
    // 直接使用 scrollToHeading 函數
    scrollToHeading(id);
    // 設置活躍標題
    setActiveHeading(id);
  };

  // 滾動到指定標題
  const scrollToHeading = (id: string) => {
    console.log('嘗試滾動到標題:', id); // 調試用
    const element = document.getElementById(id);
    
    if (element) {
      console.log('找到標題元素:', element); // 調試用
      
      // 計算滾動位置，考慮頁面頂部的固定元素
      const yOffset = -120; // 調整滾動位置，避免標題被導航欄遮擋
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // 滾動到目標元素
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // 設置活躍標題
      setActiveHeading(id);
      
      // 先將所有標題恢復原來的顏色
      document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6').forEach(el => {
        (el as HTMLElement).style.color = '#34495E'; // 恢復為深藍灰色
      });
      
      // 設置當前標題為橘紅色
      element.style.color = '#E67E22'; // 將標題元素設為橘紅色
      
      // 5秒後恢復顏色
      setTimeout(() => {
        element.style.color = '#34495E'; // 恢復為深藍灰色
      }, 5000);
    } else {
      console.error('找不到標題元素:', id); // 調試用
    }
  };

  // 複製當前 URL 到剪貼簿
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('連結已複製到剪貼簿');
      })
      .catch(err => {
        console.error('無法複製連結: ', err);
      });
  };

  // 提取標題生成目錄
  const generateToc = (content: string) => {
    // 匹配所有標題層級
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [...content.matchAll(headingRegex)];
    
    const items: TocItem[] = [];
    
    matches.forEach((match) => {
      const level = match[1].length; // # 是 1，## 是 2，### 是 3
      const text = match[2].trim();
      
      // 生成 ID：與 CustomHeading 組件中完全一致
      // 注意：這裡不使用中文作為 ID，因為可能導致 URL 編碼問題
      const id = `heading-${items.length + 1}`;
      
      items.push({
        id,
        text,
        level
      });
    });
    
    return items;
  };

  // 監聽滾動事件，控制回到頂部按鈕的顯示和更新活躍標題
  useEffect(() => {
    const handleScroll = () => {
      // 控制回到頂部按鈕
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // 更新活躍標題
      if (tocItems.length > 0) {
        // 找出當前視窗中最靠近頂部的標題
        const scrollPosition = window.scrollY + 150; // 添加偏移量以提前激活標題
        
        // 檢查所有標題元素的位置
        let currentActiveId = '';
        
        // 從後往前檢查，這樣可以找到最接近頂部的標題
        for (let i = tocItems.length - 1; i >= 0; i--) {
          const item = tocItems[i];
          const element = document.getElementById(item.id);
          
          if (element && element.offsetTop <= scrollPosition) {
            currentActiveId = item.id;
            break;
          }
        }
        
        if (currentActiveId !== activeHeading) {
          setActiveHeading(currentActiveId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, activeHeading]);

  // 回到頂部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // 載入 Markdown 文件
    const fetchArticle = async () => {
      try {
        const response = await fetch('/article/公然侮辱與誹謗的法律界線：如何保護自己的名譽權？.md');
        if (!response.ok) {
          throw new Error('無法載入文章');
        }
        
        let text = await response.text();
        
        // 移除最後的參考連結部分 (以 [^1]: 開頭的行)
        text = text.replace(/\n\[\^(\d+)\]:.*$/gm, '');
        
        // 移除文章中的第一個 h1 標題，避免與頁面標題重複
        text = text.replace(/^#\s+.*$/m, '');
        
        // 移除文章最後的 HTML 標籤
        text = text.replace(/<div style="text-align: center">⁂<\/div>/, '');
        
        // 提取目錄
        const toc = generateToc(text);
        setTocItems(toc);
        
        setContent(text);
        setLoading(false);
      } catch (error) {
        console.error('載入文章時發生錯誤:', error);
        setLoading(false);
      }
    };

    fetchArticle();

    // 初始化標題顏色
    const initializeHeadingColors = () => {
      document.querySelectorAll('.article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6').forEach(el => {
        (el as HTMLElement).style.color = '#34495E'; // 設置為深藍灰色
      });
    };

    // 等待內容加載後初始化標題顏色
    const timer = setTimeout(() => {
      initializeHeadingColors();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 自定義 Markdown 渲染組件，為標題添加 ID
  const CustomHeading = ({ level, children }: { level: number, children: React.ReactNode }) => {
    if (level >= 2 && level <= 6) {
      const text = children?.toString() || '';
      
      // 查找對應的 tocItem 以獲取 ID
      const tocIndex = tocItems.findIndex(item => item.text === text);
      const id = tocIndex !== -1 ? tocItems[tocIndex].id : `heading-fallback-${Math.random().toString(36).substr(2, 9)}`;
      
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      
      // 使用 React.createElement 來避免 TypeScript 錯誤
      return React.createElement(HeadingTag, { 
        id, 
        ref: (el: HTMLHeadingElement | null) => {
          if (el) headingRefs.current[id] = el;
        },
        style: { color: '#34495E' } // 初始顏色設為深藍灰色
      }, children);
    }
    
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return <HeadingTag>{children}</HeadingTag>;
  };

  // 頁面動畫
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D0C86D]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner 區塊 - 與法務常識頁面保持一致 */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-[url('/images/knowlege_1.png')] bg-cover bg-center opacity-100" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-shadow-lg mb-4"
          >
            法務常識
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-shadow max-w-2xl"
          >
            專業法律知識，讓您在各種情境下都能保護自己的權益，提前了解法律常識，避免不必要的糾紛與損失。
          </motion.p>
        </div>
      </div>

      {/* 文章內容區塊 */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* 側邊目錄 (桌面版) */}
            {tocItems.length > 0 && (
              <div className="hidden lg:block w-80 ml-8 sticky top-24 self-start bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">文章目錄</h3>
                <div className="space-y-2">
                  {tocItems.map((item, index) => (
                    <div 
                      key={index}
                      className={`
                        cursor-pointer 
                        transition-colors 
                        duration-200 
                        whitespace-nowrap
                        overflow-hidden
                        text-ellipsis
                        ${item.level === 2 
                          ? 'pl-0 text-base font-medium' 
                          : item.level === 3 
                            ? 'pl-4 text-sm' 
                            : item.level === 4 
                              ? 'pl-6 text-xs' 
                              : item.level === 5 
                                ? 'pl-8 text-xs' 
                                : 'pl-10 text-xs'
                        } 
                        text-[#34495E] hover:text-[#D0C86D]
                        ${activeHeading === item.id ? 'font-medium' : ''}
                      `}
                      onClick={() => handleTocItemClick(item.id)}
                      title={item.text}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 文章主體內容 */}
            <div className="flex-grow">
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
                {/* 返回按鈕 */}
                <div className="mb-6">
                  <Link 
                    to="/knowledge" 
                    className="inline-flex items-center text-[#D0C86D] hover:text-[#E67E22] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    返回法務常識
                  </Link>
                </div>

                {/* 文章標題和分享功能 */}
                <div className="mb-8 border-b border-gray-200 pb-4">
                  <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-4">
                    <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                      <span>理宇法律事務所</span>
                      <span className="mx-2">•</span>
                      <span>刑事法律百科</span>
                    </div>
                    
                    {/* 分享按鈕 */}
                    <div className="flex items-center space-x-4">
                      {socialMediaLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.shareUrl(window.location.href)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D0C86D] hover:text-[#34495E] transition-colors"
                          aria-label={`分享到 ${social.name}`}
                          title={`分享到 ${social.name}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                      <button
                        onClick={copyToClipboard}
                        className="text-[#D0C86D] hover:text-[#34495E] transition-colors"
                        aria-label="複製連結"
                        title="複製連結"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 添加自定義樣式 */}
                <style dangerouslySetInnerHTML={{ __html: MarkdownStyles }} />

                {/* 文章內容 */}
                <div id="article-top" ref={contentRef} className="prose prose-lg max-w-none article-content">
                  <ReactMarkdown components={{
                    h1: ({ children }) => <CustomHeading level={1} children={children} />,
                    h2: ({ children }) => <CustomHeading level={2} children={children} />,
                    h3: ({ children }) => <CustomHeading level={3} children={children} />,
                    h4: ({ children }) => <CustomHeading level={4} children={children} />,
                    h5: ({ children }) => <CustomHeading level={5} children={children} />,
                    h6: ({ children }) => <CustomHeading level={6} children={children} />
                  }}>{content}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* 目錄導航 (移動版) */}
            {tocItems.length > 0 && (
              <div className="lg:hidden mt-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-[#34495E] border-b border-gray-200 pb-2">文章目錄</h3>
                  <nav>
                    <ul className="space-y-2">
                      {tocItems.map((item, index) => (
                        <li key={index} className={`${item.level === 3 ? 'ml-4' : ''}`}>
                          <button
                            onClick={() => scrollToHeading(item.id)}
                            className={`text-left w-full px-2 py-1 rounded transition-colors ${
                              activeHeading === item.id 
                                ? 'bg-[#D0C86D] text-white font-medium' 
                                : item.level === 2 
                                  ? 'hover:bg-gray-100 font-medium text-[#34495E]' 
                                  : item.level === 3 
                                    ? 'hover:bg-gray-100 text-gray-600' 
                                    : item.level === 4 
                                      ? 'hover:bg-gray-100 text-gray-600 ml-4' 
                                      : item.level === 5 
                                        ? 'hover:bg-gray-100 text-gray-600 ml-8' 
                                        : 'hover:bg-gray-100 text-gray-600 ml-10'
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* 回到頂部按鈕 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#D0C86D] text-white rounded-full shadow-lg hover:bg-[#E67E22] transition-colors z-50"
          aria-label="回到頂部"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Article1;
