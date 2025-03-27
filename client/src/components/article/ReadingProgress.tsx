import React from 'react';

interface ReadingProgressProps {
  progress: number;
}

/**
 * 閱讀進度條組件
 * 顯示用戶閱讀文章的進度
 */
const ReadingProgress: React.FC<ReadingProgressProps> = ({ progress }) => {
  return (
    <div className="reading-progress-container">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
