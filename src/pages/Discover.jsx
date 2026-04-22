import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import './Discover.css';

export default function Discover() {
  const [activeGenre, setActiveGenre] = useState('All');
  const navigate = useNavigate();
  
  const genres = ['All', 'Fantasy', 'Sci-Fi', 'Romance', 'Mystery', 'Thriller', 'Historical'];
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // Dummy placeholders
  const dummyStories = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    title: i === 0 ? "The Lover's Gambit" : `Novel Title ${i + 1}`,
    author: i === 0 ? "Purrs" : `Author Name`,
    genre: i === 0 ? "Romance" : genres[Math.floor(Math.random() * (genres.length - 1)) + 1],
    cover: i === 0 ? "/img/cover.png" : null,
    reads: `${(Math.random() * 50).toFixed(1)}k`,
    description: i === 0 ? "Beneath a smile and careless charm, a mind sharper than any blade moves in silence. The Lover’s Gambit follows Ariv a boy the world dismisses, yet a grandmaster hidden in plain sight as he navigates a ruthless game of love, loyalty, betrayal, and power." : "An ancient prophecy foretells the coming of a hero. This is a short placeholder description summarizing the plot..."
  }));

  // Filter logic placeholder
  const displayedStories = activeGenre === 'All' 
    ? dummyStories 
    : dummyStories.filter(s => s.genre === activeGenre);

  return (
    <div className="discover-page">
      <div className="discover-header">
        <motion.h1 
          className="discover-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Discover New Worlds
        </motion.h1>
        
        <motion.div 
          className="search-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for novels, authors, or tags..." 
          />
        </motion.div>
      </div>

      <motion.div 
        className="filter-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="genre-tags">
          {genres.map(genre => (
            <button 
              key={genre} 
              className={`genre-tag ${activeGenre === genre ? 'active' : ''}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        
        <div className="sort-dropdown">
          <select className="sort-select">
            <option>Trending</option>
            <option>Newest Arrivals</option>
            <option>Most Read</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </motion.div>

      <motion.div 
        className="discover-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={activeGenre} // Force re-animation when genre changes
      >
        {displayedStories.map((story) => (
          <motion.div 
            key={story.id} 
            variants={fadeUp} 
            className="discover-story-card" 
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/story/${story.id === 0 ? 'the-lovers-gambit' : story.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="discover-cover-placeholder" style={story.cover ? { backgroundImage: `url(${story.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              {!story.cover && <div className="discover-cover-pattern"></div>}
            </div>
            <div className="discover-story-info">
              <span className="discover-story-genre">{story.genre}</span>
              <h3 className="discover-story-title">{story.title}</h3>
              <p className="discover-story-author">by {story.author}</p>
              <p className="discover-story-desc">{story.description}</p>
              <div className="discover-story-stats">
                <BookOpen size={14} />
                <span>{story.reads} reads</span>
              </div>
            </div>
          </motion.div>
        ))}
        {displayedStories.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            No stories found in this genre.
          </div>
        )}
      </motion.div>

      {displayedStories.length > 0 && (
        <div className="load-more-container">
          <button className="btn-load-more">Load More Stories</button>
        </div>
      )}
    </div>
  );
}
