import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  // 卡片動畫效果
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }
  };

  // 容器動畫效果
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="related-articles mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">相關文章</h3>
      
      {relatedArticles.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {relatedArticles.map((article, index) => {
            // 直接使用類別和ID構建 articleKey
            const articleKey = `${article.category}-${article.id}`;
            const title = articleTitles[articleKey] || '未知標題';
            
            return (
              <motion.div
                key={index}
                className="related-article-card bg-white rounded-lg p-4 border border-gray-100 shadow-sm h-full"
                variants={cardVariants}
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to={`/article/${article.category}/${article.id}`}
                  className="block h-full"
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 hover:text-primary transition-colors">{title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {getCategoryName(article.category)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <p className="text-gray-500 italic">沒有找到相關文章</p>
      )}
    </div>
  );
};

// 獲取類別的中文名稱
const getCategoryName = (category: string) => {
  switch (category) {
    case 'criminal':
      return '刑事法律';
    case 'civil':
      return '民事法律';
    case 'administrative':
      return '行政法律';
    case 'family':
      return '家事法律';
    case 'corporate':
    case 'business':
      return '企業法務';
    case 'commercial':
      return '商業法律';
    case 'intellectual':
      return '智慧財產權';
    default:
      return '法律知識';
  }
};

export default RelatedArticlesList;
