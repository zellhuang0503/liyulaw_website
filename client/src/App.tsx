import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import LegalKnowledge from './pages/LegalKnowledge'
import Contact from './pages/Contact'
import Team from './pages/Team'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="services" element={<Services />} />
          <Route path="knowledge" element={<LegalKnowledge />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
