import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Home = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  // 專業領域資料
  const services = [
    { title: '刑事辯護', icon: '⚖️', description: '專業刑事辯護，保障您的合法權益' },
    { title: '民事訴訟', icon: '📋', description: '處理各類民事糾紛，解決權益受損問題' },
    { title: '家事案件', icon: '👨‍👩‍👧‍👦', description: '婚姻、繼承等家事法律諮詢' },
    { title: '企業法律', icon: '🏢', description: '企業法務諮詢，協助企業合法經營' },
    { title: '行政訴訟', icon: '📜', description: '行政爭議處理，保障您的權益' },
    { title: '非訟案件', icon: '🤝', description: '調解、和解等非訟事件處理' }
  ]

  // 最新法務常識文章
  const articles = [
    {
      title: '認識刑事訴訟程序',
      category: '刑事法律百科',
      date: '2025-02-15',
      summary: '了解刑事訴訟的基本流程和您的權利...'
    },
    {
      title: '租賃糾紛案例分析',
      category: '民事權益指南',
      date: '2025-02-14',
      summary: '常見租賃糾紛的處理方式和注意事項...'
    },
    {
      title: '遺產繼承須知',
      category: '家庭法律須知',
      date: '2025-02-13',
      summary: '遺產繼承的法律規定和注意事項...'
    }
  ]

  return (
    <div className="relative">
      {/* 懸浮式 CTA 按鈕 */}
      <a
        href="/contact"
        className="fixed bottom-8 right-8 z-50 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#d35400] transition-colors duration-200 flex items-center space-x-2"
      >
        <span className="material-icons">chat</span>
        <span>立即諮詢</span>
      </a>

      {/* 視差滾動英雄區塊 */}
      <div ref={ref} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[url('/images/Lady_Justice.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center text-white container mx-auto px-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-black text-shadow-lg mb-4"
            >
              理宇法律事務所
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-shadow mb-8"
            >
              專業法律諮詢，為您解決所有法律問題
            </motion.p>
          </div>
        </div>
      </div>

      {/* 專業領域和其他內容 */}
      <div className="relative bg-white">
        {/* 專業領域 */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">專業領域</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-primary text-4xl mb-4">
                  <span className="material-icons">{service.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 最新法務常識 */}
        <section className="bg-gray-50 py-16">
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

        {/* 事務所簡介 */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">關於我們</h2>
          {/* 這裡添加事務所簡介的內容 */}
        </section>
      </div>
    </div>
  )
}

export default Home
