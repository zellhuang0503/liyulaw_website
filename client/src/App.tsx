import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="team" element={<div>律師介紹</div>} />
          <Route path="services" element={<div>專業領域</div>} />
          <Route path="knowledge" element={<div>法務常識</div>} />
          <Route path="contact" element={<div>聯絡我們</div>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
