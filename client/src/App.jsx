import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AllProjects from './pages/AllProjects';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import DifferentDetail from './pages/DifferentDetail';
import AboutDetail from './pages/AboutDetail';
import ScrollToTop from './components/ScrollToTop';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/why-we-are-different" element={<DifferentDetail />} />
        <Route path="/about" element={<AboutDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  )
}

export default App
