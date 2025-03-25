import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

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

const ArticlePage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [article, setArticle] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
              <ReactMarkdown>{article}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
