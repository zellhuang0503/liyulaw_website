import { TocItem } from '../components/article/TableOfContents';

// 從 Markdown 文本中提取標題
export const extractHeadingsFromMarkdown = (markdown: string): TocItem[] => {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
};

// 清理 Markdown 內容
export const cleanMarkdownContent = (content: string): string => {
  // 移除文章最後的特殊符號
  content = content.replace(/<div style="text-align: center">⁂<\/div>/, '');
  
  // 在這裡可以添加其他的 Markdown 清理規則
  
  return content;
};

// 添加 ID 屬性到標題元素
export const addIdsToHeadings = (htmlString: string): string => {
  return htmlString.replace(
    /<(h[2-6])>(.*?)<\/h[2-6]>/g,
    (match, tag, content) => {
      const id = content
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<${tag} id="${id}">${content}</${tag}>`;
    }
  );
};

// 滾動到指定標題
export const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id);
  
  if (element) {
    // 計算滾動位置，考慮頁面頂部的固定元素
    const yOffset = -120; // 調整滾動位置，避免標題被導航欄遮擋
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    // 滾動到目標元素
    window.scrollTo({ 
      top: y, 
      behavior: 'smooth'
    });
  }
};

// 滾動到頁面頂部
export const scrollToTop = (): void => {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
};

// 獲取當前活躍的標題
export const getActiveHeading = (headings: TocItem[]): string => {
  if (headings.length === 0) return '';

  for (let i = 0; i < headings.length; i++) {
    const id = headings[i].id;
    const element = document.getElementById(id);
    
    if (!element) continue;
    
    const rect = element.getBoundingClientRect();
    const isInView = rect.top >= 0 && rect.top <= 200;
    
    if (isInView) return id;
  }
  
  return headings[0].id;
};
