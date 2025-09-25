import { useState, useEffect } from 'react';
import QuestionView from './components/QuestionView';
import ResultView from './components/ResultView';
import { openai } from './lib/config';
import { initializeDatabase, searchSimilarMovies } from './utils/database';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('questions');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const handleSubmitAnswers = async (answers) => {
    setIsLoading(true);
    
    try {
      const queryText = `Favorite movie: ${answers.favoriteMovie}. Mood: ${answers.mood}. Preference: ${answers.preference}.`;
    
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: queryText,
      });
      
      const queryEmbedding = embeddingResponse.data[0].embedding;
      const similarMovie = await searchSimilarMovies(queryEmbedding);
      
      if (similarMovie) {
        const explanationResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a friendly movie recommendation assistant. Provide a short, engaging explanation (2-3 sentences) for why the recommended movie matches the user's preferences."
            },
            {
              role: "user",
              content: `User preferences: ${queryText}. Recommended movie: ${similarMovie.title} (${similarMovie.release_year}). Why is this a good match?`
            }
          ],
          max_tokens: 100,
        });
        
        const explanation = explanationResponse.choices[0].message.content;
        
        setRecommendation({
          movie: similarMovie,
          explanation: explanation
        });
      }
      
      setCurrentView('results');
    } catch (error) {
      console.error('Error getting recommendation:', error);
      setRecommendation(null);
      setCurrentView('results');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentView('questions');
    setRecommendation(null);
  };

  return (
    <div className="App">
      {currentView === 'questions' ? (
        <QuestionView onSubmit={handleSubmitAnswers} isLoading={isLoading} />
      ) : (
        <ResultView recommendation={recommendation} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;