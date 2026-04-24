import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Moon, Sun, User, Bell, BookOpen, Heart, MessageSquare } from 'lucide-react';
import './Layout.css';

export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [showNotifs, setShowNotifs] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Click outside to close notification popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main-wrapper">
        <header className="layout-header">
          <div className="spacer"></div>
          <div className="header-actions">
            
            <div className="notification-wrapper" ref={popupRef}>
              <button 
                className={`notification-btn ${showNotifs ? 'active' : ''}`} 
                onClick={() => setShowNotifs(!showNotifs)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>

              {showNotifs && (
                <div className="notification-popup">
                  <div className="popup-header">
                    <h4>Notifications</h4>
                    <button className="popup-mark-read">Mark all as read</button>
                  </div>
                  <div className="popup-list">
                    <div className="popup-item unread">
                      <div className="popup-icon-wrap update"><BookOpen size={16} /></div>
                      <div className="popup-item-content">
                        <p><strong>Neon Shadows</strong> updated with Chapter 42.</p>
                        <span>2h ago</span>
                      </div>
                    </div>
                    <div className="popup-item unread">
                      <div className="popup-icon-wrap like"><Heart size={16} /></div>
                      <div className="popup-item-content">
                        <p>Someone loved your comment.</p>
                        <span>5h ago</span>
                      </div>
                    </div>
                    <div className="popup-item">
                      <div className="popup-icon-wrap comment"><MessageSquare size={16} /></div>
                      <div className="popup-item-content">
                        <p>Author replied to your comment.</p>
                        <span>1d ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="popup-footer">
                    <Link to="/notifications" onClick={() => setShowNotifs(false)}>View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <NavLink to="/login" className="login-btn">
              <User size={18} />
              <span>Log In</span>
            </NavLink>
          </div>
        </header>
        <main className="layout-main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
