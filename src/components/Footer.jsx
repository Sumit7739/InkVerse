import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} InkVerse. All rights reserved.
          <br />
          <span className="footer-author">Created by Purrs.</span>
        </p>
      </div>
    </footer>
  );
}
