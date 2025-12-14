import React, { useState, useEffect } from 'react';
import './LeetCodeStats.css';

// API URL configuration for deployment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function LeetCodeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your LeetCode username
  const username = 'ramith407';

  useEffect(() => {
    fetchLeetCodeStats();
  }, []);

  const fetchLeetCodeStats = async () => {
    try {
      setLoading(true);
      // Fetching from your backend API
      const response = await fetch(`${API_URL}/api/leetcode/${username}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch LeetCode stats');
      }

      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching LeetCode stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="leetcode-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading LeetCode stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leetcode-container">
        <div className="error-message">
          <p>Unable to load LeetCode stats</p>
          <button onClick={fetchLeetCodeStats} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const easyPercentage = stats.totalSolved > 0 ? (stats.easySolved / stats.totalEasy * 100).toFixed(1) : 0;
  const mediumPercentage = stats.totalSolved > 0 ? (stats.mediumSolved / stats.totalMedium * 100).toFixed(1) : 0;
  const hardPercentage = stats.totalSolved > 0 ? (stats.hardSolved / stats.totalHard * 100).toFixed(1) : 0;

  return (
    <div className="leetcode-container">
      <div className="leetcode-header">
        <h3>
          <span className="leetcode-icon">💻</span>
          LEETCODE
        </h3>
        <a 
          href={`https://leetcode.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile →
        </a>
      </div>

      <div className="leetcode-content">
        <div className="user-info">
          <p className="username">User: <span>{username}</span></p>
          <p className="ranking">Ranking: <span className="rank-badge">#{stats.ranking || 'N/A'}</span></p>
        </div>

        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-header">
              <span className="stat-label">TOTAL SOLVED</span>
            </div>
            <div className="stat-value">
              <span className="big-number">{stats.totalSolved}</span>
              <span className="stat-subtext">/ {stats.totalQuestions} problems</span>
            </div>
          </div>

          <div className="difficulties">
            <div className="difficulty-card easy">
              <div className="difficulty-header">
                <span className="difficulty-label">EASY</span>
                <span className="difficulty-count">{stats.easySolved}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill easy-fill" 
                  style={{ width: `${easyPercentage}%` }}
                ></div>
              </div>
              <p className="difficulty-text">{stats.easySolved} / {stats.totalEasy}</p>
            </div>

            <div className="difficulty-card medium">
              <div className="difficulty-header">
                <span className="difficulty-label">MEDIUM</span>
                <span className="difficulty-count">{stats.mediumSolved}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill medium-fill" 
                  style={{ width: `${mediumPercentage}%` }}
                ></div>
              </div>
              <p className="difficulty-text">{stats.mediumSolved} / {stats.totalMedium}</p>
            </div>

            <div className="difficulty-card hard">
              <div className="difficulty-header">
                <span className="difficulty-label">HARD</span>
                <span className="difficulty-count">{stats.hardSolved}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill hard-fill" 
                  style={{ width: `${hardPercentage}%` }}
                ></div>
              </div>
              <p className="difficulty-text">{stats.hardSolved} / {stats.totalHard}</p>
            </div>
          </div>
        </div>

        <div className="stats-footer">
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default LeetCodeStats;