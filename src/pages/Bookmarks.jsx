import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Lock, BookOpen, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthSession, fetchCurrentUser, getAuthSession } from '../lib/auth';
import './Bookmarks.css';

export default function Bookmarks() {
  const navigate = useNavigate();
  const session = useMemo(() => getAuthSession(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(session));
  const [checkingSession, setCheckingSession] = useState(Boolean(session));

  useEffect(() => {
    if (!session) {
      return;
    }

    fetchCurrentUser(session.token)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        clearAuthSession();
        setIsLoggedIn(false);
      })
      .finally(() => {
        setCheckingSession(false);
      });
  }, [session]);

  const dummyBookmarks = useMemo(
    () => {
      const genres = ['Romance', 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller'];
      const reads = ['10.5k', '8.2k', '6.9k', '5.1k', '3.7k'];
      return Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        title: i === 0 ? "The Lover's Gambit" : `Saved Novel ${i + 1}`,
        author: i === 0 ? 'Purrs' : 'Author Name',
        genre: genres[i],
        reads: reads[i],
        cover: i === 0 ? '/img/cover.png' : null,
      }));
    },
    []
  );

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <h1 className="bookmarks-title">
          <Bookmark className="bookmarks-title-icon" size={36} /> My Library
        </h1>
      </div>

      {checkingSession ? (
        <div className="empty-state-container">
          <h2 className="empty-state-title">Checking your library...</h2>
        </div>
      ) : !isLoggedIn ? (
        <div className="empty-state-container">
          <Lock size={72} className="empty-state-icon" strokeWidth={1} />
          <h2 className="empty-state-title">Unlock Your Library</h2>
          <p className="empty-state-desc">
            Sign in to InkVerse to save your favorite stories, track your reading progress, and never lose your place again.
          </p>
          <div className="empty-state-actions">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/signup" className="btn-secondary">Create Account</Link>
          </div>
        </div>
      ) : (
        <div className="bookmarks-grid">
          {dummyBookmarks.map(story => (
            <div
              key={story.id} 
              className="bookmark-card" 
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
