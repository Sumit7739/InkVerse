import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, List, X, Settings2, Minus, Plus, Type, Maximize, Minimize, AlignLeft, AlignJustify, Play, Pause, MessageSquare, Send, Heart } from 'lucide-react';
import './ChapterReader.css';

const chapterModules = import.meta.glob('../../legacy/stories/lovergambitschapters/ch*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function getChapterFiles() {
  return Object.keys(chapterModules)
    .map((path) => {
      const filename = path.split('/').pop();
      const chapterNumber = Number(filename.replace('ch', '').replace('.md', ''));
      return {
        filename,
        chapterNumber,
        content: chapterModules[path],
      };
    })
    .sort((a, b) => a.chapterNumber - b.chapterNumber);
}

function parseInlineFormatting(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`strong-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`span-${index}`}>{part}</span>;
  });
}

function renderMarkdownBlocks(raw) {
  return raw
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      if (block.startsWith('## ')) {
        return <h2 key={`h2-${index}`}>{parseInlineFormatting(block.slice(3))}</h2>;
      }

      if (block.startsWith('# ')) {
        return <h1 key={`h1-${index}`}>{parseInlineFormatting(block.slice(2))}</h1>;
      }

      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      return (
        <p key={`p-${index}`}>
          {lines.map((line, lineIndex) => (
            <React.Fragment key={`line-${lineIndex}`}>
              {lineIndex > 0 && <br />}
              {parseInlineFormatting(line)}
            </React.Fragment>
          ))}
        </p>
      );
    });
}

export default function ChapterReader() {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();

  const chapters = useMemo(() => getChapterFiles(), []);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sidebars State
  const [tocOpen, setTocOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: "Bookworm_Pro", text: "This chapter was amazing! Ariv is so smart.", time: "10 mins ago", likes: 24, replies: [] },
    { id: 2, author: "Reader123", text: "Can't wait for the next chapter. The pacing is perfect.", time: "1 hour ago", likes: 8, replies: [
      { id: 21, author: "FanGirl", text: "I know right?! The way he handled that situation was flawless.", time: "45 mins ago", likes: 2 }
    ] },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([{ id: Date.now(), author: "Purrs", text: newComment, time: "Just now", likes: 0, replies: [] }, ...comments]);
    setNewComment("");
  };

  // New Reader Settings State
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState('serif');
  const [theme, setTheme] = useState(() => localStorage.getItem('inkverse-reader-theme') || 'default');
  const [lineHeight, setLineHeight] = useState(1.8);
  const [textAlign, setTextAlign] = useState('justify');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    localStorage.setItem('inkverse-reader-theme', theme);
  }, [theme]);

  const chapterNumber = Number(chapterId);
  const activeIndex = chapters.findIndex((entry) => entry.chapterNumber === chapterNumber);
  const activeChapter = activeIndex >= 0 ? chapters[activeIndex] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTocOpen(false);
    setCommentsOpen(false);
    setSettingsOpen(false);
  }, [id, chapterId]);

  useEffect(() => {
    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = Math.min((window.scrollY / documentHeight) * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Auto Scroll Effect
  useEffect(() => {
    let scrollInterval;
    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy({ top: autoScrollSpeed, left: 0, behavior: 'auto' });
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling, autoScrollSpeed]);

  // Fullscreen Handlers
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!activeChapter) {
    return (
      <div className="chapter-reader-page">
        <div className="chapter-error-card">
          <h2>Chapter not found</h2>
          <p>That chapter does not exist for this story yet.</p>
          <Link to={`/story/${id}`} className="reader-back-link">Back to story</Link>
        </div>
      </div>
    );
  }

  const prevChapter = activeIndex > 0 ? chapters[activeIndex - 1] : null;
  const nextChapter = activeIndex < chapters.length - 1 ? chapters[activeIndex + 1] : null;

  const fontFamVar = fontFamily === 'serif' ? 'var(--font-serif)' : fontFamily === 'sans' ? 'var(--font-sans)' : 'monospace';

  return (
    <div 
      className={`chapter-reader-page theme-${theme}`}
      style={{
        '--reader-font-size': `${fontSize}px`,
        '--reader-font-family': fontFamVar,
        '--reader-line-height': lineHeight,
        '--reader-text-align': textAlign,
      }}
    >
      <div className="reader-progress" style={{ width: `${scrollProgress}%` }}></div>

      <aside className={`reader-toc ${tocOpen ? 'open' : ''}`}>
        <div className="toc-header">
          <h3>Chapters</h3>
          <button type="button" onClick={() => setTocOpen(false)} aria-label="Close chapter list">
            <X size={18} />
          </button>
        </div>

        <div className="toc-list">
          {chapters.map((chapter) => (
            <Link
              key={chapter.filename}
              to={`/story/${id}/chapter/${chapter.chapterNumber}`}
              className={`toc-item ${chapter.chapterNumber === activeChapter.chapterNumber ? 'active' : ''}`}
            >
              Chapter {chapter.chapterNumber}
            </Link>
          ))}
        </div>
      </aside>

      <aside className={`reader-comments-sidebar ${commentsOpen ? 'open' : ''}`}>
        <div className="comments-header">
          <h3>Comments</h3>
          <button type="button" onClick={() => setCommentsOpen(false)} aria-label="Close comments">
            <X size={18} />
          </button>
        </div>

        <div className="comments-panel">
          <form className="comment-input-area" onSubmit={handlePostComment}>
            <input 
              type="text" 
              placeholder="Post a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" disabled={!newComment.trim()} aria-label="Send">
              <Send size={16} />
            </button>
          </form>

          <div className="comments-list">
            {comments.map(c => (
              <div key={c.id} className="comment-thread">
                <div className="reader-comment">
                  <div className="comment-meta">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-time">{c.time}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                  <div className="comment-actions">
                    <button type="button" className="action-btn"><Heart size={14} /> {c.likes > 0 ? c.likes : 'Like'}</button>
                    <button type="button" className="action-btn"><MessageSquare size={14} /> Reply</button>
                  </div>
                </div>
                {c.replies && c.replies.length > 0 && (
                  <div className="comment-replies">
                    {c.replies.map(r => (
                      <div key={r.id} className="reader-comment reply">
                         <div className="comment-meta">
                            <span className="comment-author">{r.author}</span>
                            <span className="comment-time">{r.time}</span>
                          </div>
                          <p className="comment-text">{r.text}</p>
                          <div className="comment-actions">
                            <button type="button" className="action-btn"><Heart size={14} /> {r.likes > 0 ? r.likes : 'Like'}</button>
                            <button type="button" className="action-btn"><MessageSquare size={14} /> Reply</button>
                          </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <header className="reader-header">
        <div className="reader-actions-left">
          <button type="button" className="toc-toggle" onClick={() => { setTocOpen(true); setCommentsOpen(false); }} aria-label="Chapters">
            <List size={20} />
          </button>
        </div>

        <div className="reader-heading">
          <h1>The Lover&apos;s Gambit</h1>
          <p>Chapter {activeChapter.chapterNumber}</p>
        </div>

        <div className="reader-actions-right">
          <div className="reader-theme-switcher">
             <button className={`theme-circle ${theme === 'default' ? 'active' : ''}`} onClick={() => setTheme('default')} style={{background: '#fdfbf7', border: '1px solid #ddd'}} aria-label="Light theme"></button>
             <button className={`theme-circle ${theme === 'sepia' ? 'active' : ''}`} onClick={() => setTheme('sepia')} style={{background: '#f4ecd8', border: '1px solid #dcd3c1'}} aria-label="Sepia theme"></button>
             <button className={`theme-circle ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')} style={{background: '#1a1a1a', border: '1px solid #333'}} aria-label="Dark theme"></button>
          </div>
          <button type="button" className="settings-toggle" onClick={() => { setCommentsOpen(true); setTocOpen(false); }} aria-label="Comments" title="Comments">
            <MessageSquare size={18} />
          </button>
          <button 
            type="button" 
            className="settings-toggle" 
            onClick={toggleFullscreen} 
            aria-label="Toggle Fullscreen"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>

          <button 
            type="button" 
            className={`settings-toggle ${isAutoScrolling ? 'active-pulse' : ''}`} 
            onClick={() => setIsAutoScrolling(!isAutoScrolling)} 
            aria-label="Auto Scroll"
            title="Auto Scroll"
          >
            {isAutoScrolling ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button 
            type="button" 
            className="settings-toggle" 
            onClick={() => setSettingsOpen(!settingsOpen)} 
            aria-label="Reader Settings"
          >
            <Settings2 size={20} />
          </button>
          
          <Link to={`/story/${id}`} className="reader-story-btn" aria-label="Back to Story">
            <X size={22} />
          </Link>

          {settingsOpen && (
            <div className="reader-settings-panel">
              <div className="settings-section">
                <span>Text Size</span>
                <div className="settings-controls">
                  <button onClick={() => setFontSize(f => Math.max(14, f - 2))}><Minus size={18}/></button>
                  <span className="font-size-val">{fontSize}px</span>
                  <button onClick={() => setFontSize(f => Math.min(36, f + 2))}><Plus size={18}/></button>
                </div>
              </div>
              <div className="settings-section">
                <span>Font Style</span>
                <div className="settings-controls">
                  <button className={fontFamily === 'serif' ? 'active' : ''} onClick={() => setFontFamily('serif')} style={{fontFamily: 'var(--font-serif)'}}>Serif</button>
                  <button className={fontFamily === 'sans' ? 'active' : ''} onClick={() => setFontFamily('sans')} style={{fontFamily: 'var(--font-sans)'}}>Sans</button>
                </div>
              </div>
              <div className="settings-section">
                <span>Spacing</span>
                <div className="settings-controls">
                  <button className={lineHeight === 1.5 ? 'active' : ''} onClick={() => setLineHeight(1.5)}><List size={16} style={{transform: 'scaleY(0.8)'}}/></button>
                  <button className={lineHeight === 1.8 ? 'active' : ''} onClick={() => setLineHeight(1.8)}><List size={16}/></button>
                  <button className={lineHeight === 2.2 ? 'active' : ''} onClick={() => setLineHeight(2.2)}><List size={16} style={{transform: 'scaleY(1.2)'}}/></button>
                </div>
              </div>
              <div className="settings-section">
                <span>Alignment</span>
                <div className="settings-controls">
                  <button className={textAlign === 'left' ? 'active' : ''} onClick={() => setTextAlign('left')}><AlignLeft size={16}/></button>
                  <button className={textAlign === 'justify' ? 'active' : ''} onClick={() => setTextAlign('justify')}><AlignJustify size={16}/></button>
                </div>
              </div>
              <div className="settings-section">
                <span>Auto Scroll Speed</span>
                <div className="settings-controls">
                  <button onClick={() => setAutoScrollSpeed(s => Math.max(1, s - 1))}><Minus size={16}/></button>
                  <span className="font-size-val">{autoScrollSpeed}x</span>
                  <button onClick={() => setAutoScrollSpeed(s => Math.min(5, s + 1))}><Plus size={16}/></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="reader-main">
        <article className="reader-content" onClick={() => setSettingsOpen(false)}>
          {renderMarkdownBlocks(activeChapter.content)}
        </article>

        <nav className="reader-nav" onClick={() => setSettingsOpen(false)}>
          {prevChapter ? (
            <Link to={`/story/${id}/chapter/${prevChapter.chapterNumber}`} className="reader-nav-btn">
              <ChevronLeft size={18} /> Previous Chapter
            </Link>
          ) : (
            <button type="button" className="reader-nav-btn ghost" disabled>
              <ChevronLeft size={18} /> Previous Chapter
            </button>
          )}

          {nextChapter ? (
            <Link to={`/story/${id}/chapter/${nextChapter.chapterNumber}`} className="reader-nav-btn">
              Next Chapter <ChevronRight size={18} />
            </Link>
          ) : (
            <Link to={`/story/${id}`} className="reader-nav-btn">
              Back to Story <ArrowLeft size={16} />
            </Link>
          )}
        </nav>
      </main>

      {(tocOpen || commentsOpen) && <button type="button" className="reader-overlay" aria-label="Close sidebar" onClick={() => {setTocOpen(false); setCommentsOpen(false);}}></button>}
    </div>
  );
}
