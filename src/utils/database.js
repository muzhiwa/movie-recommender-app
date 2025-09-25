import { supabase } from '../lib/config';
import { openai } from '../lib/config';
import movies from '../lib/content';


export const initializeDatabase = async () => {
  try {
    const { data: existingMovies, error: checkError } = await supabase
      .from('movies')
      .select('*')
      .limit(1);

    if (checkError && checkError.code !== '42P01') { 
      console.error('Error checking database:', checkError);
      return;
    }

   
    if (existingMovies && existingMovies.length > 0) {
      console.log('Database already initialized');
      return;
    }

    console.log('Initializing database with movie embeddings...');

   
    for (const movie of movies) {
     
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: movie.content,
      });

      const embedding = embeddingResponse.data[0].embedding;

      
      const { error } = await supabase
        .from('movies')
        .insert([
          {
            title: movie.title,
            release_year: movie.releaseYear,
            description: movie.content,
            embedding: embedding
          }
        ]);

      if (error) {
        console.error('Error inserting movie:', error);
      } else {
        console.log(`Inserted: ${movie.title}`);
      }
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};


export const searchSimilarMovies = async (queryEmbedding) => {
  try {
    const { data, error } = await supabase
      .rpc('match_movies', {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 1
      });

    if (error) {
      throw error;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error searching movies:', error);
    return null;
  }
};