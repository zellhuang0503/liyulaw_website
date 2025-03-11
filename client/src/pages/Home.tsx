import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // 專業領域資料
  const services = [
    { title: '刑事辯護', icon: '/images/刑事辯護.png', description: '專業刑事辯護，保障您的合法權益' },
    { title: '民事訴訟', icon: '/images/民事訴訟.png', description: '處理各類民事糾紛，解決權益受損問題' },
    { title: '家事案件', icon: '/images/家事案件.png', description: '婚姻、繼承等家事法律諮詢' },
    { title: '企業法律', icon: '/images/企業法律.png', description: '企業法務諮詢，協助企業合法經營' },
    { title: '行政訴訟', icon: '/images/行政訴訟.png', description: '行政爭議處理，保障您的權益' },
    { title: '非訟案件', icon: '/images/非訟案件.png', description: '調解、和解等非訟事件處理' }
  ]

  // 最新法務常識文章
  const articles = [
    {
      title: '認識刑事訴訟程序',
      category: '刑事法律百科',
      date: '2025-02-15',
      summary: '了解刑事訴訟的基本流程和您的權利...',
      image: '/images/了解刑事訴訟的基本流程和您的權利.jpg'
    },
    {
      title: '租賃糾紛案例分析',
      category: '民事權益指南',
      date: '2025-02-14',
      summary: '常見租賃糾紛的處理方式和注意事項...',
      image: '/images/常見租賃糾紛的處理方式和注意事項.jpg'
    },
    {
      title: '遺產繼承須知',
      category: '家庭法律須知',
      date: '2025-02-13',
      summary: '遺產繼承的法律規定和注意事項...',
      image: '/images/遺產繼承的法律規定和注意事項.jpg'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* 首頁橫幅 */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-black z-0">
          <motion.div
            style={{
              height: '100%',
              width: '100%',
              y: y,
            }}
          >
            <div className="absolute inset-0 bg-[url('/images/Lady_Justice.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl font-black text-shadow-lg mb-4"
          >
            理宇法律事務所
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-shadow mb-8"
          >
            專業法律諮詢，為您解決所有法律問題
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            href="/contact"
            className="bg-[#D0C86D] hover:bg-[#E67E22] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300"
          >
            立即諮詢
          </motion.a>
        </div>
      </div>

      {/* 專業領域和其他內容 */}
      <div>
        {/* 專業領域 */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">服務項目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <img src={service.icon} alt={service.title} className="h-32 w-32" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 最新法務常識 */}
        <section className="py-16" style={{ backgroundColor: '#FDF2E9' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">最新法務常識</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <img src={article.image} alt={article.title} className="w-full h-48 object-cover mb-4" />
                  <div className="text-sm text-primary mb-2">{article.category}</div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <a href="#" className="text-primary hover:text-[#d35400] transition-colors duration-200">
                      閱讀更多 →
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
