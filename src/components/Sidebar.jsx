import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, Settings, Bell, Feather, PenTool, ChevronLeft, ChevronRight, User } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const topLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/bookmarks', icon: Bookmark, label: 'My Library' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Feather className="logo-icon" size={32} />
          {!isCollapsed && <span className="logo-text">InkVerse</span>}
        </div>
        <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <button className="sidebar-write-btn" title={isCollapsed ? "Write Story" : ""}>
        <PenTool size={20} />
        {!isCollapsed && <span>Write Story</span>}
      </button>

      <nav className="sidebar-nav">
        {topLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} title={isCollapsed ? link.label : ''}>
              <Icon size={22} />
              {!isCollapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} title={isCollapsed ? "Settings" : ""}>
          <Settings size={22} />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        
        <div className="sidebar-profile" title={isCollapsed ? "Profile" : ""}>
          <div className="profile-avatar">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="profile-info">
              <span className="profile-name">Purrs</span>
              <span className="profile-role">Author</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
