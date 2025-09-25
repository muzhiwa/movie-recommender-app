import React from 'react';
import './ResultView.css';

const ResultView = ({ recommendation, onReset }) => {
  if (!recommendation) {
    return (
      <div className="result-view">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>We couldn't find a movie recommendation. Please try again.</p>
          <button onClick={onReset} className="reset-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-view">
      <h1>Your Movie Recommendation!</h1>
      
      <div className="movie-card">
        <div className="movie-header">
          <h2>{recommendation.movie.title} ({recommendation.movie.release_year})</h2>
        </div>
        
        <div className="movie-content">
          <div className="movie-description">
            <h3>About the Movie</h3>
            <p>{recommendation.movie.description}</p>
          </div>
          
          <div className="ai-explanation">
            <h3>Why we think you'll love it</h3>
            <p>{recommendation.explanation}</p>
          </div>
        </div>
      </div>

      <button onClick={onReset} className="reset-button">
        Find Another Movie
      </button>
    </div>
  );
};

export default ResultView;