import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleCategory, getRelatedArticles } from '../../utils/articleFileResolver';
import articleTitles from '../../data/articleTitles';

interface RelatedArticlesListProps {
  currentCategory: string;
  currentId: string;
}

/**
 * 相關文章列表組件
 * 顯示與當前文章相關的其他文章列表
 */
const RelatedArticlesList: React.FC<RelatedArticlesListProps> = ({ 
  currentCategory, 
  currentId 
}) => {
  // 獲取相關文章列表
  const relatedArticles = getRelatedArticles(
    currentCategory as ArticleCategory, 
    currentId
  );

  return (
    <div className="related-articles">
      <h3>相關文章</h3>
      <ul className="related-articles-list">
        {relatedArticles.map((article, index) => {
          const articleKey = `${article.category}-${article.id.split('-')[1]}`;
          const title = articleTitles[articleKey] || '未知標題';
          
          return (
            <li key={index} className="related-article-item">
              <Link to={`/article/${article.category}/${article.id.split('-')[1]}`}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedArticlesList;
