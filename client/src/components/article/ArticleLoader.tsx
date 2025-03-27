import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArticleCategory, resolveArticleFilePath } from '../../utils/articleFileResolver';
import articleContent from '../../data/articleDefaultContent';
import articleTitles from '../../data/articleTitles';

interface ArticleLoaderProps {
  category: string;
  id: string;
  onArticleLoaded: (article: string, title: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

/**
 * 文章載入器組件
 * 負責從檔案系統或預設內容中載入文章
 */
const ArticleLoader: React.FC<ArticleLoaderProps> = ({ 
  category, 
  id, 
  onArticleLoaded, 
  onLoadingChange 
}) => {
  useEffect(() => {
    // 從檔案系統讀取 Markdown 文件
    const loadArticle = async () => {
      try {
        // 根據類別和 ID 構建文章索引
        const articleKey = `${category}-${id}`;
        
        // 嘗試從預設標題映射中獲取文章標題
        const defaultTitle = articleTitles[articleKey] || '未知標題';
        
        // 使用文章檔案解析器獲取檔案路徑
        const filePath = resolveArticleFilePath(category as ArticleCategory, id);
        
        try {
          // 使用 axios 獲取 Markdown 文件內容
          const response = await axios.get(filePath);
          const content = response.data;
          
          // 從內容中提取標題（第一行的 # 後面的內容）
          const titleMatch = content.match(/^# (.+)$/m);
          const articleTitle = titleMatch ? titleMatch[1] : defaultTitle;
          
          onArticleLoaded(content, articleTitle);
          onLoadingChange(false);
        } catch (error) {
          console.error('無法從檔案系統載入文章:', error);
          
          // 嘗試使用預設內容作為備用
          if (articleContent[articleKey]) {
            const content = articleContent[articleKey];
            const titleMatch = content.match(/^# (.+)$/m);
            const articleTitle = titleMatch ? titleMatch[1] : defaultTitle;
            
            onArticleLoaded(content, articleTitle);
          } else {
            onArticleLoaded('# 文章尚未上線\n\n此文章正在編寫中，請稍後再訪問。', '文章尚未上線');
          }
          
          onLoadingChange(false);
        }
      } catch (error) {
        console.error('載入文章時發生錯誤:', error);
        onArticleLoaded('# 載入文章時發生錯誤\n\n請稍後再試，或聯繫網站管理員。', '載入錯誤');
        onLoadingChange(false);
      }
    };

    loadArticle();
  }, [category, id, onArticleLoaded, onLoadingChange]);

  return null; // 這是一個邏輯組件，不渲染任何 UI
};

export default ArticleLoader;
