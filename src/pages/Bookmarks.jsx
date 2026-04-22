import React, { useState } from 'react';
import { Bookmark, Lock, BookOpen, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Bookmarks.css';

export default function Bookmarks() {
  const navigate = useNavigate();
  // Temporary toggle state for development
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // Dummy bookmarked stories
  const dummyBookmarks = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    title: i === 0 ? "The Lover's Gambit" : `Saved Novel ${i + 1}`,
    author: i === 0 ? "Purrs" : `Author Name`,
    genre: i === 0 ? "Romance" : ['Fantasy', 'Sci-Fi', 'Romance', 'Mystery'][Math.floor(Math.random() * 4)],
    reads: `${(Math.random() * 50).toFixed(1)}k`,
    cover: i === 0 ? "/img/cover.png" : null,
  }));

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <motion.h1 
          className="bookmarks-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Bookmark className="bookmarks-title-icon" size={36} /> My Library
        </motion.h1>
        
        <button 
          className="temp-toggle"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          title="Temporary toggle for development"
        >
          {isLoggedIn ? '🔓 Mock: Logged In' : '🔒 Mock: Logged Out'}
        </button>
      </div>

      {!isLoggedIn ? (
        <motion.div 
          className="empty-state-container"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Lock size={72} className="empty-state-icon" strokeWidth={1} />
          <h2 className="empty-state-title">Unlock Your Library</h2>
          <p className="empty-state-desc">
            Sign in to InkVerse to save your favorite stories, track your reading progress, and never lose your place again.
          </p>
          <div className="empty-state-actions">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/signup" className="btn-secondary">Create Account</Link>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="bookmarks-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {dummyBookmarks.map(story => (
            <motion.div 
              key={story.id} 
              variants={fadeUp} 
              className="bookmark-card" 
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/story/${story.id === 0 ? 'the-lovers-gambit' : story.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="bookmark-cover" style={story.cover ? { backgroundImage: `url(${story.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {!story.cover && <div className="bookmark-pattern"></div>}
              </div>
              <div className="bookmark-info">
                <span className="bookmark-genre">{story.genre}</span>
                <h3 className="bookmark-title">{story.title}</h3>
                <p className="bookmark-author">by {story.author}</p>
                <div className="bookmark-stats">
                  <BookOpen size={14} />
                  <span>{story.reads} reads</span>
                </div>
              </div>
              <button 
                className="remove-bookmark-btn" 
                title="Remove from bookmarks"
                onClick={(e) => {
                  e.preventDefault();
                  // Prevent navigation if card was a link
                }}
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
