import React from 'react';

// 目錄項目類型定義
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 目錄元件屬性
interface TableOfContentsProps {
  items: TocItem[];
  activeHeading: string;
  onItemClick: (id: string) => void;
}

// 目錄元件
const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  items, 
  activeHeading, 
  onItemClick 
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
      <h3 className="text-lg font-semibold text-[#34495E] mb-4 pb-2 border-b border-gray-200">
        文章目錄
      </h3>
      <nav>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className={`${item.level === 3 ? 'ml-4' : ''}`}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`text-left w-full px-2 py-1 rounded transition-colors ${
                  activeHeading === item.id 
                    ? 'bg-[#D0C86D] text-white font-medium' 
                    : item.level === 2 
                      ? 'hover:bg-gray-100 font-medium text-[#34495E]' 
                      : item.level === 3 
                        ? 'hover:bg-gray-100 text-gray-600' 
                        : item.level === 4 
                          ? 'hover:bg-gray-100 text-gray-600 ml-4' 
                          : item.level === 5 
                            ? 'hover:bg-gray-100 text-gray-600 ml-8' 
                            : 'hover:bg-gray-100 text-gray-600 ml-10'
                }`}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableOfContents;
