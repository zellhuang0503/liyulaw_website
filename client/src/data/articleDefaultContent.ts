// 文章內容資料庫 (作為備用，當無法從文件讀取時使用)
// 定義文章內容映射表
export interface ArticleContentMap {
  [key: string]: string;
}

// 引入各類別的文章內容
import criminalArticles from './articleContent/criminalArticles';
import civilArticles from './articleContent/civilArticles';

// 合併所有文章內容
const articleContent: ArticleContentMap = {
  ...criminalArticles,
  ...civilArticles,
  // 可以在這裡添加更多類別的文章內容
};

export default articleContent;
