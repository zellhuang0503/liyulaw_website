import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 定義分類和標題的類型
interface LegalCategory {
  title: string;
  description: string;
  icon: string;
  articles: {
    id: number;
    title: string;
    url: string;
  }[];
}

const LegalKnowledge: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  // 法務常識的四大分類及其標題
  const categories: LegalCategory[] = [
    {
      title: '刑事法律百科',
      description: '了解刑事法律知識，保護自身權益',
      icon: '/images/刑事辯護.png',
      articles: [
        { id: 1, title: '公然侮辱與誹謗的法律界線：如何保護自己的名譽權？', url: '/knowledge/criminal/1' },
        { id: 2, title: '網路罵人價目表：各類言論的法律風險與可能賠償金額', url: '/knowledge/criminal/2' },
        { id: 3, title: '軍法是什麼？現役軍人的特殊法律責任', url: '/knowledge/criminal/3' },
        { id: 4, title: '電子煙的法律地位：使用電子煙是否違反菸害防制法？', url: '/knowledge/criminal/4' },
        { id: 5, title: '立法委員言論免責權的界限：公職人員發言的法律保障', url: '/knowledge/criminal/5' },
        { id: 6, title: '刑事案件自保指南：被警察約談時的權利與義務', url: '/knowledge/criminal/6' },
        { id: 7, title: '犯罪被害人補償制度：如何申請與獲得法律保障', url: '/knowledge/criminal/7' },
        { id: 8, title: '緩起訴與認罪協商：刑事案件的替代處理方式', url: '/knowledge/criminal/8' },
        { id: 9, title: '正當防衛與緊急避難：合法自保的法律界限', url: '/knowledge/criminal/9' },
        { id: 10, title: '刑事訴訟程序全解析：從警詢到法院審判', url: '/knowledge/criminal/10' },
      ],
    },
    {
      title: '民事權益指南',
      description: '掌握民事法律知識，維護個人權益',
      icon: '/images/民事訴訟.png',
      articles: [
        { id: 1, title: '民事訴訟目的與流程：權利保護的法律程序', url: '/knowledge/civil/1' },
        { id: 2, title: '合議制與獨任制：民事法院審判制度解析', url: '/knowledge/civil/2' },
        { id: 3, title: '小額訴訟攻略：快速解決民事糾紛的途徑', url: '/knowledge/civil/3' },
        { id: 4, title: '損害賠償計算方式：各類人身與財產損害的求償指南', url: '/knowledge/civil/4' },
        { id: 5, title: '消費糾紛解決方案：從協商到訴訟的完整流程', url: '/knowledge/civil/5' },
        { id: 6, title: '房屋租賃糾紛處理：租屋雙方的權利義務', url: '/knowledge/civil/6' },
        { id: 7, title: '借貸關係法律保障：放款人與借款人的權益平衡', url: '/knowledge/civil/7' },
        { id: 8, title: '網購陷阱與維權指南：電子商務消費者保護法知識', url: '/knowledge/civil/8' },
        { id: 9, title: '車禍理賠完全手冊：從現場處理到後續賠償', url: '/knowledge/civil/9' },
        { id: 10, title: '調解與和解的策略運用：避免訴訟的有效途徑', url: '/knowledge/civil/10' },
      ],
    },
    {
      title: '家庭法律須知',
      description: '家庭法律知識，守護家庭和諧',
      icon: '/images/家事案件.png',
      articles: [
        { id: 1, title: '單親爸媽必讀：如何爭取子女監護權？', url: '/knowledge/family/1' },
        { id: 2, title: '家庭暴力與監護權關係：法院如何評估兒童最佳利益', url: '/knowledge/family/2' },
        { id: 3, title: '共同監護權的成功案例：打造雙贏的親子關係', url: '/knowledge/family/3' },
        { id: 4, title: '遺產分配爭議解決：繼承權的確保與維護', url: '/knowledge/family/4' },
        { id: 5, title: '婚前財產與婚後財產的法律區分：保障婚姻雙方權益', url: '/knowledge/family/5' },
        { id: 6, title: '贍養費計算與請求：離婚後的經濟支持制度', url: '/knowledge/family/6' },
        { id: 7, title: '收養子女的法律程序：從申請到正式成為家人', url: '/knowledge/family/7' },
        { id: 8, title: '婚姻協議書撰寫指南：預防未來爭議的法律工具', url: '/knowledge/family/8' },
        { id: 9, title: '跨國婚姻的特殊法律問題：權益保障全攻略', url: '/knowledge/family/9' },
        { id: 10, title: '高齡父母財產規劃：老年人法律保障與財產傳承', url: '/knowledge/family/10' },
      ],
    },
    {
      title: '企業法務錦囊',
      description: '企業法律知識，助力商業發展',
      icon: '/images/企業法律.png',
      articles: [
        { id: 1, title: '商標異議與評定程序：品牌保護的法律武器', url: '/knowledge/business/1' },
        { id: 2, title: '商標善意先使用制度：當您的品牌被他人搶先註冊', url: '/knowledge/business/2' },
        { id: 3, title: '股份有限公司監察人選任與職責全解析', url: '/knowledge/business/3' },
        { id: 4, title: '智慧財產權保護策略：從申請到侵權處理', url: '/knowledge/business/4' },
        { id: 5, title: '勞資爭議預防與處理：企業主必備的法律知識', url: '/knowledge/business/5' },
        { id: 6, title: '公司治理最佳實踐：法遵風險的有效管理', url: '/knowledge/business/6' },
        { id: 7, title: '企業合約審查關鍵點：避免法律陷阱的實用指南', url: '/knowledge/business/7' },
        { id: 8, title: '營業秘密保護機制：企業核心資產的法律防護網', url: '/knowledge/business/8' },
        { id: 9, title: '企業危機公關與法律因應：聲譽管理的雙管齊下', url: '/knowledge/business/9' },
        { id: 10, title: '企業併購法律盡職調查：交易風險的全面評估', url: '/knowledge/business/10' },
      ],
    },
  ];

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
          <div className="absolute inset-0 bg-[url('/images/knowlege_1.png')] bg-cover bg-center opacity-100" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-shadow-lg mb-4"
          >
            法務常識
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-shadow max-w-2xl"
          >
            專業法律知識，讓您在各種情境下都能保護自己的權益，提前了解法律常識，避免不必要的糾紛與損失。
          </motion.p>
        </div>
      </div>

      {/* 內容區塊 */}
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.4 }}
          >
            {/* 分類標籤 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 flex items-center ${
                    activeCategory === index
                      ? 'bg-[#D0C86D] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-[#E67E22] hover:text-white shadow'
                  }`}
                >
                  <img src={category.icon} alt={category.title} className="h-12 w-12 mr-2" />
                  {category.title}
                </button>
              ))}
            </div>

            {/* 當前分類描述 */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {categories[activeCategory].title}
              </h2>
              <p className="text-gray-600">
                {categories[activeCategory].description}
              </p>
            </div>

            {/* 文章列表 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
              <ul className="divide-y divide-gray-200">
                {categories[activeCategory].articles.map((article) => (
                  <li key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <a
                      href={article.url}
                      className="block px-6 py-4 sm:px-8 sm:py-5"
                    >
                      <div className="flex items-center">
                        <div className="min-w-8 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full font-semibold mr-4">
                          {article.id}
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600">
                          {article.title}
                        </h3>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 注意事項 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    本網站提供的法律知識僅供參考，不構成法律意見。如有具體法律問題，請諮詢專業律師。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegalKnowledge;
