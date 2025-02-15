import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: '首頁', path: '/' },
    { name: '律師介紹', path: '/team' },
    { name: '專業領域', path: '/services' },
    { name: '法務常識', path: '/knowledge' },
    { name: '聯絡我們', path: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                className={`text-2xl font-serif font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-accent' : 'text-[#D0C86D]'
                }`}
              >
                理宇法律事務所
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-primary' 
                      : 'text-[#D0C86D] hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-[#D0C86D]'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-accent text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">聯絡資訊</h3>
              <address className="not-italic">
                <p>地址：10002台北市中正區博愛路49號7樓</p>
                <p>電話：(02)2312-2308</p>
                <p>傳真：(02)2312-2307</p>
              </address>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">快速連結</h3>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      className="hover:text-secondary transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-lg font-bold mb-4">營業時間</h3>
              <p>週一至週五：09:00 - 18:00</p>
              <p>週六、週日：休息</p>
              <p className="mt-4">※ 如需約談請先預約</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} 理宇法律事務所. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RootLayout
