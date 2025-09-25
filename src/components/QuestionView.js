import React, { useState } from 'react';
import './QuestionView.css';

const QuestionView = ({ onSubmit, isLoading }) => {
  const [answers, setAnswers] = useState({
    favoriteMovie: '',
    mood: '',
    preference: ''
  });

  const handleInputChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.favoriteMovie && answers.mood && answers.preference) {
      onSubmit(answers);
    }
  };

  const isFormValid = answers.favoriteMovie && answers.mood && answers.preference;

  return (
    <div className="question-view">
      <h1>PopChoice Movie Recommender</h1>
      <p className="subtitle">Answer 3 simple questions to get your perfect movie recommendation!</p>
      
      <form onSubmit={handleSubmit} className="question-form">
        <div className="question-group">
          <label htmlFor="favoriteMovie">What's your favorite movie and why?</label>
          <textarea
            id="favoriteMovie"
            value={answers.favoriteMovie}
            onChange={(e) => handleInputChange('favoriteMovie', e.target.value)}
            placeholder="e.g., I love Inception because of its mind-bending plot..."
            rows="3"
          />
        </div>

        <div className="question-group">
          <label>Are you in the mood for something new or classic?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="new"
                checked={answers.mood === 'new'}
                onChange={(e) => handleInputChange('mood', e.target.value)}
              />
              New releases
            </label>
            <label>
              <input
                type="radio"
                value="classic"
                checked={answers.mood === 'classic'}
                onChange={(e) => handleInputChange('mood', e.target.value)}
              />
              Classic films
            </label>
          </div>
        </div>

        <div className="question-group">
          <label>Do you want to have fun, or something more serious?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="fun"
                checked={answers.preference === 'fun'}
                onChange={(e) => handleInputChange('preference', e.target.value)}
              />
              Fun & entertaining
            </label>
            <label>
              <input
                type="radio"
                value="serious"
                checked={answers.preference === 'serious'}
                onChange={(e) => handleInputChange('preference', e.target.value)}
              />
              Serious & thought-provoking
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? 'Finding your movie...' : 'Get Movie Recommendation'}
        </button>
      </form>
    </div>
  );
};

export default QuestionView;