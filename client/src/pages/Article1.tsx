import React from 'react';
import ArticleTemplate from '../components/article/ArticleTemplate';

const Article1: React.FC = () => {
  // 文章標題
  const pageTitle = '公然侮辱與誹謗的法律界線：如何保護自己的名譽權？';
  
  // 文章檔案名稱（不含副檔名）
  const articleFileName = '公然侮辱與誹謗的法律界線：如何保護自己的名譽權？';

  return (
    <ArticleTemplate 
      articleFileName={articleFileName}
      pageTitle={pageTitle}
    />
  );
};

export default Article1;
