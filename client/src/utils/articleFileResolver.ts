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
  // 根據類別和ID生成檔案路徑
  return `/articles/${category}/${id}.md`;
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
