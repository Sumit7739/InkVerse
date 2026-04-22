import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, Feather, Sparkles, LayoutGrid, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="hero-badge">
            <Feather size={16} /> A sanctuary for stories
          </motion.div>
          <motion.h1 variants={fadeUp} className="hero-title">
            Where Novels Breathe with <span className="highlight">Untamed Spirit</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-description">
            Step into a world where storytelling defies tradition. InkVerse is your digital haven to explore unique narratives, bold characters, and immersive reading experiences.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-actions">
            <button className="btn-primary">
              <BookOpen size={20} />
              Start Reading
            </button>
            <button className="btn-secondary">Publish Your Story</button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="cover-stack"
            initial="stacked"
            animate="twisted"
            whileHover="expanded"
          >
            <motion.div 
              className="cover-card"
              style={{ backgroundColor: '#2D3033', color: '#fff', originX: 0.5, originY: 1 }}
              variants={{
                stacked: { x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                twisted: { x: -35, y: 15, rotate: -10, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                expanded: { x: -80, y: 35, rotate: -22, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
            >
               <span className="cover-genre">Mystery</span>
               <h3 className="cover-title">Novel Title</h3>
            </motion.div>
            <motion.div 
              className="cover-card"
              style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', originX: 0.5, originY: 1 }}
              variants={{
                stacked: { x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                twisted: { x: -15, y: 5, rotate: -4, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                expanded: { x: -35, y: 15, rotate: -10, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
            >
               <span className="cover-genre">Fantasy</span>
               <h3 className="cover-title">The Lost Crown</h3>
               <p className="cover-author">by A.A. Author</p>
            </motion.div>
            <motion.div 
              className="cover-card"
              style={{ 
                backgroundColor: '#3A405A', 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('/img/cover.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff', 
                originX: 0.5, 
                originY: 1,
                cursor: 'pointer'
              }}
              variants={{
                stacked: { x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                twisted: { x: 5, y: -5, rotate: 3, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.5 } },
                expanded: { x: 25, y: -15, rotate: 8, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              onClick={() => navigate('/story/the-lovers-gambit')}
            >
               <span className="cover-genre">Romance</span>
               <h3 className="cover-title">The Lover's Gambit</h3>
               <p className="cover-author">by Purrs</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <motion.section 
        className="categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="section-header">
          <h2 className="section-title">
            <LayoutGrid className="section-icon" /> Explore Genres
          </h2>
        </motion.div>
        <div className="category-grid">
          {['Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Thriller', 'Historical'].map((genre, idx) => (
            <motion.div key={idx} variants={fadeUp} className="category-card" whileHover={{ scale: 1.05 }}>
              <h3>{genre}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trending Section */}
      <motion.section 
        className="trending-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="section-header">
          <h2 className="section-title">
            <TrendingUp className="section-icon" /> Trending Today
          </h2>
          <a href="/discover" className="view-all-link">View all &rarr;</a>
        </motion.div>
        
        <div className="story-grid">
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item} 
              variants={fadeUp} 
              className="story-card" 
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/story/${item === 1 ? 'the-lovers-gambit' : item}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="story-cover-placeholder" style={item === 1 ? { backgroundImage: `url('/img/cover.png')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                {item !== 1 && <div className="cover-pattern"></div>}
              </div>
              <div className="story-info">
                <span className="story-genre">{item === 1 ? 'Romance' : 'Genre Name'}</span>
                <h3 className="story-title">{item === 1 ? "The Lover's Gambit" : "Novel Title"}</h3>
                <p className="story-author">by {item === 1 ? 'Purrs' : 'Author Name'}</p>
                <div className="story-stats">
                  <span>{item === 1 ? '10.5k' : '2.1k'} reads</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* New Arrivals Section */}
      <motion.section 
        className="new-arrivals-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="section-header">
          <h2 className="section-title">
            <Clock className="section-icon" /> New Arrivals
          </h2>
        </motion.div>
        
        <div className="story-list">
          {[1, 2, 3, 4].map((item) => (
            <motion.div key={item} variants={fadeUp} className="list-item" whileHover={{ x: 10 }}>
              <div className="list-item-cover"></div>
              <div className="list-item-details">
                <h4 className="list-item-title">Novel Title {item}</h4>
                <p className="list-item-author">Author Name</p>
              </div>
              <div className="list-item-genre">Genre</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Feature Highlight */}
      <motion.section 
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="feature-item">
          <div className="feature-icon"><Sparkles /></div>
          <h3>Curated Reading</h3>
          <p>Discover hand-picked stories tailored to your unique taste and reading history.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="feature-item">
          <div className="feature-icon"><Feather /></div>
          <h3>Writer's Canvas</h3>
          <p>A distraction-free environment with tools designed specifically for novel crafting.</p>
        </motion.div>
        <motion.div variants={fadeUp} className="feature-item">
          <div className="feature-icon"><BookOpen /></div>
          <h3>Active Community</h3>
          <p>Engage with authors through line-by-line comments and lively discussions.</p>
        </motion.div>
      </motion.section>
    </div>
  );
}
