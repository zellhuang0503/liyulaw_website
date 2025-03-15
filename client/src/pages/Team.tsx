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
    <div className="min-h-screen flex flex-col">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 律師卡片 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-64 bg-gray-200">
              {/* 律師照片 */}
              <div className="w-full h-full bg-[url('/images/lawyer1.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">李律師</h3>
              <p className="text-gray-600 mb-4">主持律師</p>
              <p className="text-gray-700">
                專長於民事訴訟、商業糾紛、勞資爭議等領域，擁有豐富的訴訟經驗和專業知識。
              </p>
            </div>
          </motion.div>

          {/* 律師卡片 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-64 bg-gray-200">
              {/* 律師照片 */}
              <div className="w-full h-full bg-[url('/images/lawyer2.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">王律師</h3>
              <p className="text-gray-600 mb-4">資深律師</p>
              <p className="text-gray-700">
                專長於刑事辯護、家事案件、智慧財產權等領域，具有深厚的法學理論基礎和實務經驗。
              </p>
            </div>
          </motion.div>

          {/* 律師卡片 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-64 bg-gray-200">
              {/* 律師照片 */}
              <div className="w-full h-full bg-[url('/images/lawyer3.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">張律師</h3>
              <p className="text-gray-600 mb-4">專業律師</p>
              <p className="text-gray-700">
                專長於不動產交易、企業法務、合約審閱等領域，致力於為客戶提供全方位的法律諮詢服務。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Team;
