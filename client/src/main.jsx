import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import Preloader from './components/Preloader'
import './index.css'

const AppWithPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already visited
    const hasVisited = sessionStorage.getItem('avira-tech-visited');
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('avira-tech-visited', 'true');
    setIsLoading(false);
  };

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {!isLoading && <App />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppWithPreloader />
    </HelmetProvider>
  </React.StrictMode>
)
