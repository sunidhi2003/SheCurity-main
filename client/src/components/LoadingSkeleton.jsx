import React from 'react';
import '../styles/LoadingSkeleton.css';

export const CardSkeleton = () => (
  <div className="glass-card skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
    </div>
  </div>
);

export const ListSkeleton = ({ count = 3 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="skeleton-list-item">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton-list-content">
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line short"></div>
        </div>
      </div>
    ))}
  </>
);

export const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p className="loader-text gradient-text">Loading SheCurity...</p>
  </div>
);
