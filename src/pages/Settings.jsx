import React, { useState } from 'react';
import { Settings as SettingsIcon, User, BookOpen, Bell, Monitor, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Settings.css';

import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reading');

  // Dummy state for settings
  const [settings, setSettings] = useState({
    emailUpdates: true,
    pushNotifications: false,
    weeklyDigest: true,
    readingTime: true,
    immersiveMode: false,
    dyslexiaFont: false,
    parchmentIntensity: 'medium',
    autoNightMode: true,
  });

  const toggleSetting = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const tabs = [
    { id: 'account', icon: User, label: 'Account Profile' },
    { id: 'reading', icon: BookOpen, label: 'Reading Experience' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'appearance', icon: Monitor, label: 'Appearance' },
    { id: 'privacy', icon: Shield, label: 'Privacy & Security' }
  ];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <motion.div key="account" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="settings-section">
            <h2 className="settings-section-title">Account Profile</h2>
            <p className="settings-section-desc">Manage your public persona and account details.</p>
            
            {user ? (
              !isEditingProfile ? (
                <div className="profile-view">
                  <div className="profile-info-row">
                    <span className="profile-label">Username</span>
                    <span className="profile-value">{user.username}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="profile-label">Email Address</span>
                    <span className="profile-value">{user.email}</span>
                  </div>
                  <div className="profile-info-row">
                    <span className="profile-label">Bio</span>
                    <span className="profile-value">Avid reader of fantasy and sci-fi.</span>
                  </div>
                  <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button className="btn-secondary" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
                  </div>
                </div>
              ) : (
                <div className="setting-group">
                  <div className="input-group">
                    <label>Username</label>
                    <input type="text" defaultValue={user.username} />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue={user.email} />
                  </div>
                  <div className="input-group">
                    <label>Bio</label>
                    <textarea rows="4" defaultValue="Avid reader of fantasy and sci-fi."></textarea>
                  </div>
                  <div className="form-actions">
                    <button className="btn-save" onClick={() => setIsEditingProfile(false)}>Save Changes</button>
                    <button className="btn-cancel" onClick={() => setIsEditingProfile(false)}>Cancel</button>
                  </div>
                </div>
              )
            ) : (
              <div className="profile-view">
                <p>Please log in to view and edit your profile.</p>
              </div>
            )}
          </motion.div>
        );
      case 'appearance':
        return (
          <motion.div key="appearance" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="settings-section">
            <h2 className="settings-section-title">Appearance</h2>
            <p className="settings-section-desc">Customize the look and feel of InkVerse.</p>
            <div className="setting-group">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Parchment Intensity</h3>
                  <p>Adjust the warmth of the background in Light Mode.</p>
                </div>
                <select className="settings-select" value={settings.parchmentIntensity} onChange={(e) => setSettings(p => ({...p, parchmentIntensity: e.target.value}))}>
                  <option value="light">Subtle</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Rich Warmth</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Auto Night Mode</h3>
                  <p>Automatically switch to Dark Mode based on your system settings.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.autoNightMode} onChange={() => toggleSetting('autoNightMode')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </motion.div>
        );
      case 'privacy':
        return (
          <motion.div key="privacy" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="settings-section">
            <h2 className="settings-section-title">Privacy & Security</h2>
            <p className="settings-section-desc">Keep your account safe and control your visibility.</p>
            <div className="setting-group">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Private Library</h3>
                  <p>Hide your reading lists and bookmarks from public view.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', borderBottom: 'none' }}>
                <div className="setting-info">
                  <h3>Password</h3>
                  <p>Secure your account with a strong password.</p>
                </div>
                {!isChangingPassword ? (
                  <button className="btn-secondary" onClick={() => setIsChangingPassword(true)}>Change Password</button>
                ) : (
                  <div className="password-form" style={{ width: '100%', maxWidth: '400px', marginTop: '1rem' }}>
                    <div className="input-group">
                      <label>Current Password</label>
                      <input type="password" placeholder="••••••••" />
                    </div>
                    <div className="input-group">
                      <label>New Password</label>
                      <input type="password" placeholder="••••••••" />
                    </div>
                    <div className="form-actions">
                      <button className="btn-save" onClick={() => setIsChangingPassword(false)}>Update Password</button>
                      <button className="btn-cancel" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="settings-section">
            <h2 className="settings-section-title">Notification Preferences</h2>
            <p className="settings-section-desc">Stay in the loop with your favorite stories and authors.</p>
            <div className="setting-group">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Updates for Bookmarked Stories</h3>
                  <p>Get notified instantly via email when an author publishes a new chapter.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.emailUpdates} onChange={() => toggleSetting('emailUpdates')} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Push Notifications</h3>
                  <p>Receive browser notifications for replies to your comments.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.pushNotifications} onChange={() => toggleSetting('pushNotifications')} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Weekly Reading Digest</h3>
                  <p>A curated email every Sunday with trending novels and your reading statistics.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.weeklyDigest} onChange={() => toggleSetting('weeklyDigest')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </motion.div>
        );
      case 'reading':
        return (
          <motion.div key="reading" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="settings-section">
            <h2 className="settings-section-title">Reading Experience</h2>
            <p className="settings-section-desc">Tailor InkVerse to suit your personal reading habits.</p>
            <div className="setting-group">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Show Reading Time Estimates</h3>
                  <p>Display the estimated minutes required to read a chapter before you start.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.readingTime} onChange={() => toggleSetting('readingTime')} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Immersive Mode</h3>
                  <p>Automatically hide the sidebar, header, and all UI elements when you start scrolling down a story.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.immersiveMode} onChange={() => toggleSetting('immersiveMode')} />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Dyslexia-Friendly Font</h3>
                  <p>Override the platform's standard typography with OpenDyslexic for improved accessibility.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.dyslexiaFont} onChange={() => toggleSetting('dyslexiaFont')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">
          <SettingsIcon className="settings-title-icon" size={36} /> Settings
        </h1>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button 
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </aside>

        <main className="settings-content">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
