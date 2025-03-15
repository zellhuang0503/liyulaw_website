import React from 'react';
import { motion } from 'framer-motion';

// 服務項目資料
const serviceItems = [
  {
    id: 1,
    title: '刑事辯護',
    icon: '/images/刑事辯護.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '初步會談與案情評估',
      '證據收集與分析',
      '辯護策略制定',
      '法庭代理與辯護',
      '判決後上訴評估'
    ],
    laws: '《刑法》、《刑事訴訟法》規定被告享有無罪推定、緘默權、辯護權等權利。我們協助當事人了解案件性質、可能刑責及辯護方向，確保訴訟權益獲得充分保障。',
    cases: '曾成功為多起重大刑事案件被告爭取無罪判決或減輕刑責，包括貪污、詐欺、過失致死等案件，透過專業辯護策略及證據分析，為當事人爭取最有利結果。'
  },
  {
    id: 2,
    title: '民事訴訟',
    icon: '/images/民事訴訟.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '案件評估與協商嘗試',
      '起訴狀撰寫與提交',
      '證據準備與交換',
      '法庭辯論與攻防',
      '判決執行與後續處理'
    ],
    laws: '《民法》規定各類權利義務關係，《民事訴訟法》規範訴訟程序。我們協助當事人處理各類財產、契約、侵權等爭議，從協商、起訴到執行判決的全程法律服務。',
    cases: '成功協助當事人解決房屋買賣糾紛、租賃爭議、債務糾紛、醫療糾紛、商業合約爭議等各類民事案件，透過專業訴訟策略或庭外和解，為當事人爭取最大權益。'
  },
  {
    id: 3,
    title: '家事案件',
    icon: '/images/家事案件.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '家事調解前諮詢',
      '調解程序參與',
      '訴訟文件準備',
      '家事法庭代理',
      '後續執行與協助'
    ],
    laws: '《民法》親屬編、繼承編規範家庭關係，《家事事件法》提供專門程序處理家事爭議。我們協助當事人處理婚姻、收養、監護、遺產等家庭相關法律事務，兼顧法律權益與家庭和諧。',
    cases: '協助當事人處理離婚財產分配、子女監護權爭議、家暴保護令聲請、遺產繼承糾紛等家事案件，以專業且體貼的方式，協助當事人度過人生難關。'
  },
  {
    id: 4,
    title: '企業法律',
    icon: '/images/企業法律.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '企業法律風險評估',
      '合約審閱與擬定',
      '法規遵循諮詢',
      '商業糾紛處理',
      '企業法律健檢'
    ],
    laws: '《公司法》、《證券交易法》、《商業登記法》、《勞動基準法》等規範企業經營。我們提供企業全方位法律服務，從設立、營運到解散清算，協助企業降低法律風險，穩健經營。',
    cases: '協助多家中小企業處理股權糾紛、商標侵權、勞資爭議、企業併購等法律事務，提供符合企業需求的法律解決方案，協助企業化解危機並把握商機。'
  },
  {
    id: 5,
    title: '行政訴訟',
    icon: '/images/行政訴訟.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '行政處分評估',
      '訴願程序協助',
      '行政訴訟提起',
      '證據準備與攻防',
      '行政救濟後續處理'
    ],
    laws: '《行政程序法》、《行政訴訟法》、各類行政法規規範政府機關行使公權力的程序與救濟方式。我們協助當事人對抗不當的行政處分，透過訴願及行政訴訟程序，維護合法權益。',
    cases: '成功協助當事人處理稅務爭議、土地徵收補償不足、違建處分、環評爭議等行政案件，透過專業的行政救濟程序，為當事人爭取應有權益。'
  },
  {
    id: 6,
    title: '非訟案件',
    icon: '/images/非訟案件.png',
    color: 'bg-gray-50',
    processColor: 'bg-[#D0C86D]',
    process: [
      '案件評估與諮詢',
      '非訟聲請文件準備',
      '法院聲請程序',
      '聲請後續處理',
      '相關登記與執行'
    ],
    laws: '《非訟事件法》規範各類非爭訟性質的法律事務處理程序。我們協助當事人處理各類非訟案件，如監護宣告、輔助宣告、遺產管理人選任等，提供專業法律協助。',
    cases: '協助當事人處理監護宣告、輔助宣告、遺產管理人選任、公司登記、票據裁定等非訟案件，透過專業的法律程序，協助當事人順利完成各類法律事務。'
  }
];

interface ServiceCardProps {
  title: string;
  icon: string;
  color: string;
  processColor: string;
  process: string[];
  laws: string;
  cases: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  icon, 
  color, 
  processColor,
  process, 
  laws, 
  cases,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
      className={`rounded-lg shadow-md p-6 ${color} hover:shadow-lg transition-shadow duration-300 h-full`}
    >
      <div className="flex flex-col items-center mb-6">
        <img src={icon} alt={title} className="h-28 w-28 mb-3" />
        <h3 className="text-3xl font-extrabold text-center">{title}</h3>
      </div>
      
      <div className="mb-4">
        <h4 className="font-extrabold mb-2 text-[#D0C86D] text-xl text-center">服務流程</h4>
        <div className="flex flex-col items-center">
          {process.map((step, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <div 
                className={`${processColor} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-1 hover:bg-[#E67E22] transition-all duration-300 cursor-pointer`}
              >
                {index + 1}
              </div>
              <div className="text-center mb-1 group">
                <span className="group-hover:text-lg group-hover:font-semibold transition-all duration-300">{step}</span>
              </div>
              {index < process.length - 1 && (
                <div className={`${processColor} w-0.5 h-4 mb-1`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-extrabold mb-2 text-[#D0C86D] text-xl text-center">相關法規</h4>
        <p className="text-center">{laws}</p>
      </div>
      
      <div>
        <h4 className="font-extrabold mb-2 text-[#D0C86D] text-xl text-center">案例簡述</h4>
        <p className="text-center">{cases}</p>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner 區塊 */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute inset-0 bg-[url('/images/service_1.png')] bg-cover bg-center opacity-100" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-shadow-lg mb-4"
          >
            服務項目
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-shadow max-w-2xl"
          >
            理宇法律事務所提供全方位法律服務，無論您面臨何種法律問題，我們專業的律師團隊都能為您提供最適切的法律協助。
          </motion.p>
        </div>
      </div>
      
      {/* 服務項目卡片 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
              color={service.color}
              processColor={service.processColor}
              process={service.process}
              laws={service.laws}
              cases={service.cases}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
