// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Optional: for styling

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item" onClick={() => handleNavigation('/')}>Home</div>
              <div className="navbar-item" onClick={() => handleNavigation('/tasks')}>Tasks</div>
              {/* Add more navigation items as needed */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
