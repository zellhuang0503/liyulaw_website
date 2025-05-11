import React from 'react';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  // 頁面切換動畫
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Banner 區塊 */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-[url('/images/law_introduce.png')] bg-cover bg-center opacity-100" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-shadow-lg mb-4"
          >
            律師介紹
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-shadow max-w-2xl"
          >
            專業團隊為您提供最優質的法律服務
          </motion.p>
        </div>
      </div>

      {/* 律師介紹內容 */}
      <div className="container mx-auto py-16 px-4">
        {/* Single Lawyer Profile Section - Replaces the grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto mb-16" // Wider, centered profile with more shadow, added margin-bottom
        >
          <div className="md:flex"> {/* Flex container for two columns */}
            {/* Left Column: Photo Placeholder */}
            <div className="md:w-1/3 bg-slate-100 p-8 flex flex-col items-center justify-center"> {/* Changed background, added padding */}
              <div className="w-full aspect-square max-w-[250px] bg-slate-200 rounded-lg flex items-center justify-center mb-4 md:mb-0">
                 <p className="text-slate-500 text-center p-4">江倍銓律師<br/>照片預留</p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">江倍銓律師</h3>
              <p className="text-xl text-[#D0C86D] font-semibold mb-6">主持律師</p> 
              <div className="text-gray-700 text-base space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1 border-gray-300">學歷</h4>
                  <ul className="list-disc list-inside pl-2 space-y-1 mt-2">
                    <li>中興大學法商學院法律系司法組</li>
                    <li>台北大學法律研究所民事法組</li>
                    <li>臺灣金融研訓院家族信託規劃顧問師證照</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1 border-gray-300">經歷</h4>
                  <div className="space-y-4 mt-2">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 text-lg">曾任</h5>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        <li>歐亞法律事務所 律師</li>
                        <li>明德法律事務所 合署律師</li>
                        <li>銓勝法律事務所 主持律師</li>
                        <li>三重區公所 民眾服務諮詢律師</li>
                        <li>北投區公所 民眾服務諮詢律師</li>
                        <li>台北律師公會 福利委員會 委員</li>
                        <li>民間公民典法治教育基金會 國小法治教育入班律師</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1 text-lg">現任</h5>
                      <ul className="list-disc list-inside pl-2 space-y-1">
                        <li>理宇法律事務所 主持律師</li>
                        <li>睿致財富傳承規劃顧問有限公司 家族信託規劃顧問師</li>
                        <li>多家中小企業顧問律師</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* New Lawyer Profile Section for 許鳳紋律師 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Added a small delay for staggered animation
          className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto"
        >
          <div className="md:flex"> {/* Flex container for two columns */}
            {/* Right Column: Details */}
            <div className="w-full p-6 md:p-8"> {/* Adjusted to full width */}
              <h3 className="text-3xl font-bold text-gray-800 mb-2">許鳳紋律師</h3>
              <p className="text-xl text-[#D0C86D] font-semibold mb-6">合署律師</p> 
              <div className="text-gray-700 text-base space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1 border-gray-300">學歷</h4>
                  <ul className="list-disc list-inside pl-2 space-y-1 mt-2">
                    <li>國立中正大學法律系法制組</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1 border-gray-300">經歷</h4>
                  <ul className="list-disc list-inside pl-2 space-y-1 mt-2">
                    <li>板橋地方法院檢察署(現改制為新北地方檢察署)書記官</li>
                    <li>理宇法律事務所律師</li>
                    <li>全國律師聯合會律師學院專業領域進修：信託法律</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team;
