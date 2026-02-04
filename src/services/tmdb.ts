import axios from 'axios';
import type {
    Movie,
    MovieDetails,
    Person,
    PersonDetails,
    TMDBResponse,
    Credits,
    Images,
    MovieCredits,
    Video,
    VideoResponse,
} from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with default config
const tmdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US', // English language for the interface
    },
});

// Image URL builders
export const getImageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return `${import.meta.env.BASE_URL}no_image.png`;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path: string | null, size: 'w185' | 'h632' | 'original' = 'w185'): string => {
    if (!path) return `${import.meta.env.BASE_URL}no_image.png`;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Search for a person (director, actor, actress)
export const searchPerson = async (name: string): Promise<Person[]> => {
    try {
        const response = await tmdbClient.get<TMDBResponse<Person>>('/search/person', {
            params: { query: name },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching person:', error);
        return [];
    }
};

// Get person details
export const getPersonDetails = async (personId: number): Promise<PersonDetails | null> => {
    try {
        const response = await tmdbClient.get<PersonDetails>(`/person/${personId}`, {
            params: {
                append_to_response: 'movie_credits,images',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching person details:', error);
        return null;
    }
};

// Get person movie credits
export const getPersonMovieCredits = async (personId: number): Promise<MovieCredits | null> => {
    try {
        const response = await tmdbClient.get<MovieCredits>(`/person/${personId}/movie_credits`);
        return response.data;
    } catch (error) {
        console.error('Error fetching person movie credits:', error);
        return null;
    }
};

// Get movie details
export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
    try {
        const response = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`, {
            params: {
                append_to_response: 'credits,images',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

// Get movie credits
export const getMovieCredits = async (movieId: number): Promise<Credits | null> => {
    try {
        const response = await tmdbClient.get<Credits>(`/movie/${movieId}/credits`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        return null;
    }
};

// Get movie images
export const getMovieImages = async (movieId: number): Promise<Images | null> => {
    try {
        const response = await tmdbClient.get<Images>(`/movie/${movieId}/images`);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie images:', error);
        return null;
    }
};

// Discover French movies from the 1950s-1960s
export const discoverFrenchNewWaveMovies = async (page: number = 1): Promise<Movie[]> => {
    try {
        const response = await tmdbClient.get<TMDBResponse<Movie>>('/discover/movie', {
            params: {
                with_original_language: 'fr',
                'primary_release_date.gte': '1958-01-01',
                'primary_release_date.lte': '1970-12-31',
                sort_by: 'vote_average.desc',
                'vote_count.gte': 50,
                page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error discovering French New Wave movies:', error);
        return [];
    }
};

// Search movies
export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
    try {
        const response = await tmdbClient.get<TMDBResponse<Movie>>('/search/movie', {
            params: { query, page },
        });

        // Filter results client-side for French New Wave criteria (1958-1970)
        return response.data.results.filter(movie => {
            if (movie.original_language !== 'fr') return false;
            if (!movie.release_date) return false;
            const year = new Date(movie.release_date).getFullYear();
            return year >= 1958 && year <= 1970;
        });
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
};

// Get popular French movies
export const getPopularFrenchMovies = async (page: number = 1): Promise<Movie[]> => {
    try {
        const response = await tmdbClient.get<TMDBResponse<Movie>>('/discover/movie', {
            params: {
                with_original_language: 'fr',
                sort_by: 'popularity.desc',
                page,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular French movies:', error);
        return [];
    }
};

// Get movie videos
export const getMovieVideos = async (movieId: number): Promise<Video[]> => {
    try {
        const response = await tmdbClient.get<VideoResponse>(`/movie/${movieId}/videos`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie videos:', error);
        return [];
    }
};
