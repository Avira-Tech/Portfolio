import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AllProjects from './pages/AllProjects';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import DifferentDetail from './pages/DifferentDetail';
import AboutDetail from './pages/AboutDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/why-we-are-different" element={<DifferentDetail />} />
        <Route path="/about" element={<AboutDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  )
}

export default App
