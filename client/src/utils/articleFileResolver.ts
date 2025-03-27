/**
 * 文章檔案解析器
 * 用於根據文章類別和ID解析對應的檔案路徑
 */

// 定義支援的文章類別
export type ArticleCategory = 'criminal' | 'civil' | 'family' | 'commercial' | 'intellectual' | 'administrative';

/**
 * 解析文章檔案路徑
 * @param category 文章類別
 * @param id 文章ID
 * @returns 對應的檔案路徑
 */
export const resolveArticleFilePath = (category: ArticleCategory, id: string): string => {
  // 根據類別和ID查找對應的文章檔案
  // 首先嘗試查找特定的文章檔案
  switch(category) {
    case 'criminal':
      if (id === '1') {
        return '/article/公然侮辱與誹謗的法律界線：如何保護自己的名譽權？.md';
      } else if (id === '7') {
        return '/article/犯罪被害人補償制度：如何申請與獲得法律保障.md';
      }
      break;
    case 'civil':
      if (id === '1') {
        return '/article/民事訴訟目的與流程：權利保護的法律程序.md';
      } else if (id === '2') {
        return '/article/小額訴訟攻略：快速解決民事糾紛的途徑.md';
      } else if (id === '3') {
        return '/article/合議制與獨任制：民事法院審判制度解析.md';
      }
      break;
    case 'family':
      if (id === '1') {
        return '/article/高齡父母財產規劃：老年人法律保障與財產傳承.md';
      }
      break;
    // 可以繼續添加其他類別的映射
  }
  
  // 如果找不到特定映射，則使用通用格式
  console.log(`找不到特定映射，使用通用格式: /article/${category}-${id}.md`);
  return `/article/${category}-${id}.md`;
};

/**
 * 解析文章類別的中文名稱
 * @param category 文章類別
 * @returns 類別的中文名稱
 */
export const resolveCategoryName = (category: ArticleCategory): string => {
  const categoryMap: Record<ArticleCategory, string> = {
    criminal: '刑事法律',
    civil: '民事法律',
    family: '家事法律',
    commercial: '商事法律',
    intellectual: '智慧財產權',
    administrative: '行政法律'
  };

  return categoryMap[category] || '未知類別';
};

/**
 * 獲取相關文章的類別和ID列表
 * @param currentCategory 當前文章類別
 * @param currentId 當前文章ID
 * @returns 相關文章的類別和ID列表
 */
export const getRelatedArticles = (
  currentCategory: ArticleCategory,
  currentId: string
): Array<{ category: ArticleCategory; id: string }> => {
  // 這裡可以根據實際需求實現相關文章的邏輯
  // 例如：同類別的其他文章，或者跨類別但主題相關的文章
  
  // 簡單示例：返回同類別的其他兩篇文章（ID為1和2，但排除當前文章）
  const relatedIds = ['1', '2', '3'].filter(id => id !== currentId.split('-')[1]);
  
  return relatedIds.slice(0, 2).map(id => ({
    category: currentCategory,
    id: `${currentCategory}-${id}`
  }));
};
