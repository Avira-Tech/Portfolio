import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Avira_Tech_logo.png';

const Logo = ({ className = '', size = 36 }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to="#home" className={`flex items-center gap-3 ${className}`} aria-label="Avira Tech Home">
      {!imgError && (
        <img
          src={logo}
          alt="Avira Tech Logo"
          width={size}
          height={size}
          onError={() => setImgError(true)}
          className="object-contain rounded-md"
          loading="lazy"
        />
      )}
      <div className="text-2xl font-bold tracking-tighter">
        <span className="text-white">AVIRA</span>
        <span className="text-primary">TECH</span>
      </div>
    </Link>
  );
};

export default Logo;
