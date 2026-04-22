import React from 'react';
import { Bell, BookOpen, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import './Notifications.css';

export default function Notifications() {
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const notifications = [
    {
      dateGroup: 'Today',
      items: [
        {
          id: 1,
          type: 'update',
          icon: BookOpen,
          title: 'New Chapter Available',
          desc: '"Neon Shadows" just updated with Chapter 42: The Awakening.',
          time: '2 hours ago',
          unread: true
        },
        {
          id: 2,
          type: 'like',
          icon: Heart,
          title: 'Someone loved your comment',
          desc: 'Another reader liked your thoughts on Chapter 12 of "The Last Heir".',
          time: '5 hours ago',
          unread: true
        }
      ]
    },
    {
      dateGroup: 'Yesterday',
      items: [
        {
          id: 3,
          type: 'comment',
          icon: MessageSquare,
          title: 'New Reply',
          desc: 'The author replied to your comment: "Thank you so much! That means a lot."',
          time: '1 day ago',
          unread: false
        },
        {
          id: 4,
          type: 'system',
          icon: Bell,
          title: 'Welcome to InkVerse!',
          desc: 'Your reading journey begins. Head over to Discover to find your next favorite story.',
          time: '1 day ago',
          unread: false
        }
      ]
    }
  ];

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h1 className="notifications-title">
          <Bell className="notifications-title-icon" size={36} /> Notifications
        </h1>
        <button className="mark-read-btn">Mark all as read</button>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {notifications.map(group => (
          <div key={group.dateGroup} className="notification-group">
            <h3 className="notification-date-label">{group.dateGroup}</h3>
            <div className="notifications-list">
              {group.items.map(notif => {
                const Icon = notif.icon;
                return (
                  <motion.div 
                    key={notif.id} 
                    variants={fadeUp} 
                    className={`notification-item ${notif.unread ? 'unread' : ''}`}
                  >
                    <div className={`notification-icon-wrapper ${notif.type}`}>
                      <Icon size={22} />
                    </div>
                    <div className="notification-content">
                      <h3 className="notification-item-title">{notif.title}</h3>
                      <p className="notification-item-desc">{notif.desc}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                    {notif.unread && <div className="unread-dot"></div>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
