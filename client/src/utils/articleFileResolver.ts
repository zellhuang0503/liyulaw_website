/**
 * 文章檔案解析器
 * 用於根據文章類別和ID解析對應的檔案路徑
 */

// 定義支援的文章類別
export type ArticleCategory = 'criminal' | 'civil' | 'family' | 'commercial' | 'intellectual' | 'administrative' | 'business';

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
      } else if (id === '2') {
        return '/article/網路罵人價目表：各類言論的法律風險與可能賠償金額.md';
      } else if (id === '3') {
        return '/article/軍法是什麼？現役軍人的特殊法律責任.md';
      } else if (id === '4') {
        return '/article/電子煙的法律地位：使用電子煙是否違反菸害防制法？.md';
      } else if (id === '5') {
        return '/article/立法委員言論免責權的界限：公職人員發言的法律保障.md';
      } else if (id === '6') {
        return '/article/刑事案件自保指南：被警察約談時的權利與義務.md';
      } else if (id === '7') {
        return '/article/犯罪被害人補償制度：如何申請與獲得法律保障.md';
      } else if (id === '8') {
        return '/article/緩起訴與認罪協商：刑事案件的替代處理方式.md';
      } else if (id === '9') {
        return '/article/正當防衛與緊急避難：合法自保的法律界限.md';
      } else if (id === '10') {
        return '/article/刑事訴訟程序全解析：從警詢到法院審判.md';
      }
      break;
    case 'civil':
      if (id === '1') {
        return '/article/民事訴訟目的與流程：權利保護的法律程序.md';
      } else if (id === '2') {
        return '/article/小額訴訟攻略：快速解決民事糾紛的途徑.md';
      } else if (id === '3') {
        return '/article/合議制與獨任制：民事法院審判制度解析.md';
      } else if (id === '4') {
        return '/article/損害賠償計算方式：各類人身與財產損害的求償指南.md';
      } else if (id === '5') {
        return '/article/調解與和解的策略運用：避免訴訟的有效途徑.md';
      } else if (id === '6') {
        return '/article/消費糾紛解決方案：從協商到訴訟的完整流程.md';
      } else if (id === '7') {
        return '/article/房屋租賃糾紛處理：租屋雙方的權利義務.md';
      }
      break;
    case 'family':
      if (id === '1') {
        return '/article/單親爸媽必讀：如何爭取子女監護權？.md';
      } else if (id === '2') {
        return '/article/家庭暴力與監護權關係：法院如何評估兒童最佳利益.md';
      } else if (id === '3') {
        return '/article/共同監護權的成功案例：打造雙贏的親子關係.md';
      } else if (id === '4') {
        return '/article/遺產分配爭議解決：繼承權的確保與維護.md';
      } else if (id === '5') {
        return '/article/婚前財產與婚後財產的法律區分：保障婚姻雙方權益.md';
      } else if (id === '6') {
        return '/article/贍養費計算與請求：離婚後的經濟支持制度.md';
      } else if (id === '7') {
        return '/article/收養子女的法律程序：從申請到正式成為家人.md';
      } else if (id === '8') {
        return '/article/婚姻協議書撰寫指南：預防未來爭議的法律工具.md';
      } else if (id === '9') {
        return '/article/跨國婚姻的特殊法律問題：權益保障全攻略.md';
      } else if (id === '10') {
        return '/article/高齡父母財產規劃：老年人法律保障與財產傳承.md';
      }
      break;
    case 'business':
      if (id === '1') {
        return '/article/商標異議與評定程序：品牌保護的法律武器.md';
      } else if (id === '2') {
        return '/article/商標善意先使用制度：當您的品牌被他人搶先註冊.md';
      } else if (id === '3') {
        return '/article/股份有限公司監察人選任與職責全解析.md';
      } else if (id === '4') {
        return '/article/智慧財產權保護策略：從申請到侵權處理.md';
      } else if (id === '5') {
        return '/article/勞資爭議預防與處理：企業主必備的法律知識.md';
      } else if (id === '6') {
        return '/article/公司治理最佳實踐：法遵風險的有效管理.md';
      } else if (id === '7') {
        return '/article/企業合約審查關鍵點：避免法律陷阱的實用指南.md';
      } else if (id === '8') {
        return '/article/營業秘密保護機制：企業核心資產的法律防護網.md';
      } else if (id === '9') {
        return '/article/企業危機公關與法律因應：聲譽管理的雙管齊下.md';
      } else if (id === '10') {
        return '/article/企業併購法律盡職調查：交易風險的全面評估.md';
      }
      break;
    case 'commercial':
      if (id === '1') {
        return '/article/企業合約審查關鍵點：避免法律陷阱的實用指南.md';
      } else if (id === '2') {
        return '/article/公司治理最佳實踐：法遵風險的有效管理.md';
      } else if (id === '3') {
        return '/article/企業併購法律盡職調查：交易風險的全面評估.md';
      } else if (id === '4') {
        return '/article/企業危機公關與法律因應：聲譽管理的雙管齊下.md';
      } else if (id === '5') {
        return '/article/勞資爭議預防與處理：企業主必備的法律知識.md';
      } else if (id === '6') {
        return '/article/營業秘密保護機制：企業核心資產的法律防護網.md';
      } else if (id === '7') {
        return '/article/股份有限公司監察人選任與職責全解析.md';
      } else if (id === '8') {
        return '/article/借貸關係法律保障：放款人與借款人的權益平衡.md';
      }
      break;
    case 'intellectual':
      if (id === '1') {
        return '/article/智慧財產權保護策略：從申請到侵權處理.md';
      } else if (id === '2') {
        return '/article/商標異議與評定程序：品牌保護的法律武器.md';
      } else if (id === '3') {
        return '/article/商標善意先使用制度：當您的品牌被他人搶先註冊.md';
      }
      break;
    case 'administrative':
      if (id === '1') {
        return '/article/網購陷阱與維權指南：電子商務消費者保護法知識.md';
      } else if (id === '2') {
        return '/article/車禍理賠完全手冊：從現場處理到後續賠償.md';
      }
      break;
  }
  
  // 如果找不到特定映射，則使用通用格式
  console.log(`找不到特定映射，使用通用格式: /article/${category}-${id}.md`);
  return `/article/${category}-${id}.md`;
};

/**
 * 將文章類別映射到 LegalKnowledge 頁面中的類別索引
 * @param category 文章類別
 * @returns 對應的類別索引
 */
export const mapCategoryToIndex = (category: ArticleCategory): number => {
  switch(category) {
    case 'criminal':
      return 0; // 刑事法律百科
    case 'civil':
      return 1; // 民事權益指南
    case 'family':
      return 2; // 家庭法律須知
    case 'business':
    case 'commercial':
    case 'intellectual':
      return 3; // 企業法務錦囊
    case 'administrative':
      return 1; // 行政法律歸類到民事權益指南
    default:
      return 0;
  }
};

/**
 * 解析文章類別的中文名稱
 * @param category 文章類別
 * @returns 類別的中文名稱
 */
export const resolveCategoryName = (category: ArticleCategory): string => {
  switch(category) {
    case 'criminal':
      return '刑事法律';
    case 'civil':
      return '民事法律';
    case 'family':
      return '家事法律';
    case 'commercial':
      return '商業法律';
    case 'intellectual':
      return '智慧財產權';
    case 'administrative':
      return '行政法律';
    case 'business':
      return '企業法務';
    default:
      return '法律知識';
  }
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
  // 同類別的其他文章
  const sameCategory = [];
  
  // 根據當前文章類別和ID，推薦相關文章
  // 這裡可以根據實際需求進行更複雜的推薦邏輯
  
  // 簡單示例：推薦同類別的其他文章
  for (let i = 1; i <= 10; i++) {
    const id = i.toString();
    if (id !== currentId) {
      sameCategory.push({ category: currentCategory, id });
    }
    
    // 最多推薦4篇相關文章
    if (sameCategory.length >= 4) {
      break;
    }
  }
  
  return sameCategory;
};
