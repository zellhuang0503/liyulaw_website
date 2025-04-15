import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface ArticleContentProps {
  article: string;
  toc: Array<{ id: string; text: string; level: number }>;
}

/**
 * 文章內容組件
 * 負責渲染 Markdown 格式的文章內容
 */
const ArticleContent: React.FC<ArticleContentProps> = ({ article, toc }) => {
  
  // 自定義渲染器 for <p> tags
  const customRenderers = {
    p: ({ node, children, ...props }: any) => {
      // 檢查段落是否只包含一個 strong 元素
      if (node.children.length === 1 && node.children[0].tagName === 'strong') {
        const strongNode = node.children[0];
        // 提取 strong 元素內的文本
        const potentialHeadingText = strongNode.children?.[0]?.value || '';
        const cleanText = potentialHeadingText.trim(); // strong 元素内的文本通常不需要再移除 **

        if(cleanText) {
          // 在 toc 中查找匹配項 (使用從 strong 内部提取的文本)
          const tocItem = toc.find(item => item.text.trim() === cleanText);

          if (tocItem) {
            // 找到了，渲染為帶有 ID 的標題樣式 div
            return (
              <div id={tocItem.id} className={`article-heading heading-level-${tocItem.level}`}>
                 <span className="heading-anchor"></span>
                {cleanText} {/* 直接使用清理後的文本 */}
              </div>
            );
          } else {
            // 雖然是 p > strong 結構，但在 toc 中沒有匹配項
            // 可能是普通加粗文本，按原樣渲染（保留 strong）
            return <p {...props}>{children}</p>; // 使用原始 children 渲染，保留 strong
          }
        } 
      }
      
      // --- 原有的 **...** 檢查邏輯 (作為備用，以防萬一有不同格式) ---
      const paragraphText = node?.children?.[0]?.type === 'text' ? node.children[0].value : '';
      if (paragraphText.trim().startsWith('**') && paragraphText.trim().endsWith('**') && paragraphText.trim().length > 4) {
          const cleanTextFromStars = paragraphText.replace(/\*\*/g, '').trim();
          const tocItemFromStars = toc.find(item => item.text.trim() === cleanTextFromStars);
          if(tocItemFromStars){
              return (
                  <div id={tocItemFromStars.id} className={`article-heading heading-level-${tocItemFromStars.level}`}>
                      <span className="heading-anchor"></span>
                      {cleanTextFromStars}
                  </div>
              );
          } else {
              return <p {...props}>{cleanTextFromStars}</p>;
          }
      }
      // --- 結束備用邏輯 ---

      // 不是標題結構，正常渲染段落
      return <p {...props}>{children}</p>; // 使用原始 children 渲染
    },
  };

  console.log('渲染文章內容，長度:', article?.length);
  console.log('文章內容前100個字符:', article?.substring(0, 100));

  return (
    <div className="article-content"> 
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]} 
        components={customRenderers} // 使用自定義渲染器
      >
        {article}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
