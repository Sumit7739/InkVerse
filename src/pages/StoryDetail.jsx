import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Bookmark, BookOpen, ThumbsUp, ThumbsDown, MessageSquare, Star } from 'lucide-react';
import './StoryDetail.css';

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulate dynamic DB fetch based on route param
  useEffect(() => {
    setTimeout(() => {
      if (id === 'the-lovers-gambit' || id === '1') {
        setStory({
          id: 'the-lovers-gambit',
          title: "The Lover's Gambit",
          author: "Purrs",
          cover: "/img/cover.png",
          status: "In Progress",
          published: "2025",
          rating: 4.5,
          genre: "Romance, Drama",
          chapters: 10,
          description: "Beneath a smile and careless charm, a mind sharper than any blade moves in silence. The Lover’s Gambit follows Ariv a boy the world dismisses, yet a grandmaster hidden in plain sight as he navigates a ruthless game of love, loyalty, betrayal, and power. Every move is calculated. Every kindness, a strategy. Every love, a battlefield. In the end, there will be only one victor and he has already chosen his Queen.",
          chapterList: Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, title: `Chapter ${i + 1}`, date: i < 3 ? "Just now" : "2 days ago" })),
          comments: [
            { id: 1, author: "Reader123", date: "2 days ago", text: "Absolutely loved the latest chapter! The plot twists are incredible.", likes: 15, dislikes: 2 },
            { id: 2, author: "Bookworm_Pro", date: "1 week ago", text: "This story keeps getting better and better. Can't wait for the next update!", likes: 20, dislikes: 1 }
          ]
        });
        setIsBookmarked(true);
      } else {
        // Fallback for randomly clicked dummy stories
        setStory({
          id,
          author: "Author Name",
          cover: null,
          status: "Completed",
          published: "2024",
          rating: 4.0,
          genre: "Fantasy",
          chapters: 5,
          description: "An ancient prophecy foretells the coming of a hero. This is a dynamically generated placeholder for a story fetched from the database.",
          chapterList: Array.from({ length: 5 }).map((_, i) => ({ id: i + 1, title: `Chapter ${i + 1}`, date: "1 month ago" })),
          comments: []
        });
        setIsBookmarked(false);
      }
      setLoading(false);
    }, 400); // simulate network latency
  }, [id]);

  if (loading) return <div className="story-loading">Retrieving from archives...</div>;
  if (!story) return <div className="story-error">Story not found.</div>;

  return (
    <div className="story-detail-page">
      <section className="story-header-section">
        <div className="story-cover-large">
          {story.cover ? (
            <img src={story.cover} alt={story.title} className="story-cover-image" />
          ) : (
            <div className="story-cover-image" style={{ background: 'var(--border-color)' }}></div>
          )}
        </div>
        
        <div className="story-info-container">
          <h1 className="story-title-large">{story.title}</h1>
          <p className="story-author-large">by {story.author}</p>
          
          <div className="story-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <span className="meta-value">{story.status}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Chapters</span>
              <span className="meta-value">{story.chapters}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating</span>
              <span className="meta-value" style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                {story.rating} <Star size={14} fill="var(--accent-primary)" color="var(--accent-primary)" />
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Published</span>
              <span className="meta-value">{story.published}</span>
            </div>
          </div>
          
          <div className="meta-item" style={{ marginBottom: '1.5rem' }}>
            <span className="meta-label">Genres</span>
            <span className="meta-value" style={{ color: 'var(--accent-primary)' }}>{story.genre}</span>
          </div>

          <p className="story-description">{story.description}</p>
          
          <div className="story-actions">
            <button className="btn-read-now" onClick={() => navigate(`/story/${story.id}/chapter/1`)}>
              <BookOpen size={20} /> Read Chapter 1
            </button>
            <button 
              className="btn-bookmark-large"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} /> 
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </button>
          </div>
        </div>
      </section>

      <section className="chapters-section">
        <h2 className="story-section-title">Chapters List</h2>
        <div className="chapter-list">
          {story.chapterList.map(chap => (
            <Link to={`/story/${story.id}/chapter/${chap.id}`} key={chap.id} className="chapter-item">
              <span>{chap.title}</span>
              <span className="chapter-date">{chap.date}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="comments-section">
        <h2 className="story-section-title">Reader Comments</h2>
        <div className="comment-form">
          <textarea placeholder="Write your thoughts on this story..."></textarea>
          <button>Post Comment</button>
        </div>
        
        <div className="comment-list">
          {story.comments.length > 0 ? (
            story.comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-meta">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-actions">
                  <button><ThumbsUp size={14} /> {comment.likes}</button>
                  <button><ThumbsDown size={14} /> {comment.dislikes}</button>
                  <button><MessageSquare size={14} /> Reply</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{color: 'var(--text-secondary)'}}>No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>
    </div>
  );
}
