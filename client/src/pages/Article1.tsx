import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Article1: React.FC = () => {
  const title = '公然侮辱與誹謗的法律界線：如何保護自己的名譽權？';
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
        
        setContent(text);
        setLoading(false);
      } catch (error) {
        console.error('載入文章時發生錯誤:', error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

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
      {/* Banner 區塊 */}
      <div className="relative h-[30vh]">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-[url('/images/knowlege_1.png')] bg-cover bg-center opacity-100" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-shadow-lg mb-4"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* 文章內容區塊 */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8"
          >
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

            {/* 文章內容 */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Article1;
