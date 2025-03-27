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
    },
  };

  console.log('渲染文章內容，長度:', article?.length);
  console.log('文章內容前100個字符:', article?.substring(0, 100));

  return (
    <div className="article-content">
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]} 
        components={customRenderers}
      >
        {article}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
