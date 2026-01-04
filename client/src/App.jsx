import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const DifferentDetail = lazy(() => import('./pages/DifferentDetail'));
const AboutDetail = lazy(() => import('./pages/AboutDetail'));

const PageLoader = () => (
  <div className="min-h-screen bg-dark flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/why-we-are-different" element={<DifferentDetail />} />
          <Route path="/about" element={<AboutDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </HelmetProvider>
  )
}

export default App
