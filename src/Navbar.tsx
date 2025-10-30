import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate('/posts')}>KTGK Blog</div>
        <div className="links">
          <NavLink to="/posts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Trang chủ
          </NavLink>
          <button className="btn" onClick={() => navigate('/posts/create')}>
            Viết bài
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
