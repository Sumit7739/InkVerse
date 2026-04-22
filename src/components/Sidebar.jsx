import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, Settings, Bell, Feather } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const topLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/bookmarks', icon: Bookmark, label: 'My Library' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Feather className="logo-icon" size={32} />
        <span className="logo-text">InkVerse</span>
      </div>

      <nav className="sidebar-nav">
        {topLinks.map(link => {
          const Icon = link.icon;
          return (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Icon size={22} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={22} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
