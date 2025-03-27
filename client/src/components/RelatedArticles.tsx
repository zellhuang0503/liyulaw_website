import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Article {
  id: string;
  category: string;
  title: string;
  summary?: string;
  imageUrl?: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, currentArticleId }) => {
  // 過濾掉當前文章
  const filteredArticles = articles.filter(
    article => `${article.category}-${article.id}` !== currentArticleId
  );

  // 如果沒有相關文章，則不顯示
  if (filteredArticles.length === 0) {
    return null;
  }

  // 卡片動畫
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }
  };

  return (
    <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200 rounded-b-xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">相關文章</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.slice(0, 4).map((article, index) => (
          <motion.div
            key={`${article.category}-${article.id}`}
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="related-article-card"
          >
            <Link 
              to={`/knowledge/${article.category}/${article.id}`}
              className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {article.imageUrl && (
                <div className="mb-3 overflow-hidden rounded-md">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-32 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h4 className="font-medium text-gray-900 mb-2 hover:text-primary transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600">
                {article.summary || `了解更多關於${article.title}的法律知識...`}
              </p>
              <div className="mt-3 text-primary text-sm font-medium flex items-center">
                閱讀更多
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {filteredArticles.length > 4 && (
        <div className="mt-6 text-center">
          <Link 
            to="/knowledge" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
          >
            查看更多相關文章
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RelatedArticles;
