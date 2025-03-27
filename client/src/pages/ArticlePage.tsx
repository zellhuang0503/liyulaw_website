import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import TableOfContents from '../components/TableOfContents';
import RelatedArticles from '../components/RelatedArticles';
import ShareArticle from '../components/ShareArticle';
import '../styles/article.css';

// 定義文章內容映射表
interface ArticleContentMap {
  [key: string]: string;
}

// 文章內容資料庫
const articleContent: ArticleContentMap = {
  'criminal-1': `# 公然侮辱與誹謗的法律界線：如何保護自己的名譽權？

## 前言

在現代社會中，隨著網路與社群媒體的普及，言論自由的範圍不斷擴大，但同時也帶來了許多關於名譽權受侵害的糾紛。本文將探討公然侮辱與誹謗的法律界限，並提供保護個人名譽權的實用建議。

## 一、公然侮辱與誹謗的法律定義

### 公然侮辱
根據《刑法》第309條，公然侮辱是指以公然方式，以言詞、文字、圖畫或其他方法，損害他人名譽的行為。「公然」指的是不特定多數人得以共見共聞的狀態。

### 誹謗
《刑法》第310條規定，誹謗是指以散布於眾或以文字、圖畫刊布的方式，指摘或傳述足以損害他人名譽的具體事件。

## 二、公然侮辱與誹謗的構成要件

### 公然侮辱的構成要件
1. **公然性**：行為必須在公開場合或能被不特定多數人知悉的情況下進行
2. **侮辱行為**：具有貶低他人人格、尊嚴的言行
3. **對象特定**：針對特定的自然人或法人
4. **主觀故意**：行為人主觀上有侮辱他人的故意

### 誹謗的構成要件
1. **散布於眾**：將訊息傳播給不特定多數人知悉
2. **具體事件**：指摘或傳述具體事實，而非單純的評價或意見
3. **足以損害名譽**：所述內容足以降低他人在社會上的評價
4. **主觀故意**：行為人主觀上有傳述損害他人名譽事實的故意

## 三、言論自由與名譽權的平衡

### 《刑法》第310條第3項的特別規定
為平衡言論自由與名譽權保護，法律規定：如果行為人能證明其言論內容為真實，且為維護公共利益所必要，則不罰。這被稱為「真實惡意原則」。

### 公共人物與私人的區別
對於政治人物、名人等公眾人物，由於其行為與公共利益密切相關，一般認為他們應承受較高程度的批評，但這並不代表可以任意侮辱或誹謗。

### 言論的性質與保護強度
- **事實陳述**：需對其真實性負責
- **價值判斷**：屬於意見表達，受較高程度的保護
- **混合型言論**：部分事實、部分評價的言論，需根據具體情況分析

## 四、網路時代的名譽權保護

### 社群媒體發言的法律風險
在Facebook、Instagram、LINE等社群平台發表的言論，只要符合公然侮辱或誹謗的構成要件，同樣可能構成犯罪。

### 常見的侵權態樣
1. 在社群媒體公開批評他人的具體缺失
2. 在評論區留下侮辱性言論
3. 轉發未經證實的負面訊息
4. 使用假帳號散布不實言論

## 五、名譽權受侵害時的法律救濟

### 刑事救濟途徑
1. **提出告訴**：公然侮辱與誹謗屬於告訴乃論罪，被害人需在得知加害人身分後6個月內提出告訴
2. **刑事調解**：可在偵查或審判階段提出調解請求，尋求和解

### 民事救濟途徑
1. **請求損害賠償**：依《民法》第18條、第184條及第195條請求賠償
2. **請求回復名譽**：要求行為人採取適當方式（如登報道歉）回復名譽

### 其他救濟方式
1. **網路平台檢舉**：要求平台移除侵權內容
2. **向NCC投訴**：針對媒體的不實報導向國家通訊傳播委員會投訴

## 六、保護自身名譽權的實用建議

### 預防性措施
1. 保持良好的社交媒體使用習慣
2. 定期搜尋與自己相關的網路訊息
3. 謹慎處理個人資料，避免資訊外洩

### 遇到名譽侵害時的處置
1. 保存證據，包括截圖、網址、發言時間等
2. 評估侵害程度，選擇適合的救濟途徑
3. 考慮先私下溝通，尋求和解可能
4. 必要時尋求專業法律協助

## 結語

在資訊爆炸的時代，每個人都可能成為公然侮辱或誹謗的加害人或被害人。了解相關法律界限，既能保護自己的言論自由，也能守護個人的名譽權。在行使言論自由時，應謹記：言論自由並非無限上綱，它的邊界是他人的合法權益。`,
};

// 相關文章列表
const relatedArticles = [
  { id: '2', category: 'criminal', title: '公然侮辱罪的法律構成要件', summary: '深入解析公然侮辱罪的構成要件與相關案例分析...' },
  { id: '3', category: 'criminal', title: '誹謗罪的法律構成要件', summary: '了解誹謗罪的法律要件與抗辯事由...' },
  { id: '4', category: 'criminal', title: '網路行為的法律責任', summary: '探討在網路上的言論可能帶來的法律風險...' },
  { id: '1', category: 'civil', title: '名譽權受侵害的民事救濟', summary: '當名譽受損時，可以採取哪些民事救濟途徑...' },
  { id: '2', category: 'civil', title: '主觀惡意原則的適用', summary: '真實惡意原則在台灣法律實務的適用與發展...' },
  { id: '3', category: 'civil', title: '言論自由與名譽權的平衡', summary: '如何在保障言論自由的同時保護個人名譽權...' },
];

// 文章分類
const categories = [
  { id: 'criminal', name: '刑事法律' },
  { id: 'civil', name: '民事法律' },
  { id: 'administrative', name: '行政法律' },
  { id: 'procedure', name: '訴訟程序' },
];

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

  // 自定義 React-Markdown 的渲染器，為標題添加 ID
  const customRenderers = {
    h2: ({ node, ...props }: any) => {
      const children = props.children;
      const text = Array.isArray(children) 
        ? children.join('') 
        : String(children || '');
      const id = `heading-${toc.findIndex(item => item.text === text)}`;
      return <h2 id={id} {...props} />;
    },
    h3: ({ node, ...props }: any) => {
      const children = props.children;
      const text = Array.isArray(children) 
        ? children.join('') 
        : String(children || '');
      const id = `heading-${toc.findIndex(item => item.text === text)}`;
      return <h3 id={id} {...props} />;
    }
  };

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
          className="h-full bg-primary progress-bar transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 返回頂部按鈕 */}
      {readingProgress > 20 && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-all z-40 border border-amber-600"
          aria-label="返回頂部"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
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
            <div className="lg:w-1/4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* 目錄 */}
                <TableOfContents items={toc} activeItemId={activeHeadingId} />
                
                {/* 分享文章 */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <ShareArticle 
                    title={title} 
                    url={window.location.href} 
                  />
                </div>
              </div>
            </div>
            
            {/* 文章主體 */}
            <div className="lg:w-3/4 order-1 lg:order-2">
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
                  <div className="prose prose-lg max-w-none article-content">
                    <ReactMarkdown components={customRenderers}>{article}</ReactMarkdown>
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
                <RelatedArticles 
                  articles={relatedArticles}
                  currentArticleId={`${category}-${id}`}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
