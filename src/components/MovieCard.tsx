import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl, getMovieCredits } from '../services/tmdb';
import type { Movie } from '../types/tmdb';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
    const [hasError, setHasError] = useState(false);
    const [director, setDirector] = useState<string | null>(null);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    useEffect(() => {
        const fetchDirector = async () => {
            const credits = await getMovieCredits(movie.id);
            if (credits) {
                const directorInfo = credits.crew.find(person => person.job === 'Director');
                if (directorInfo) {
                    setDirector(directorInfo.name);
                }
            }
        };
        fetchDirector();
    }, [movie.id]);

    return (
        <motion.div
            className="movie-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            <Link to={`/movie/${movie.id}`} className="movie-card-link">
                <div className="movie-poster-wrapper">
                    <img
                        src={hasError ? `${import.meta.env.BASE_URL}no_image.png` : getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className={`movie-poster ${hasError ? 'is-placeholder' : ''}`}
                        loading="lazy"
                        onError={() => setHasError(true)}
                    />
                    <div className="movie-rating">
                        <span>★</span> {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="movie-content">
                        <h3 className="movie-title">{movie.title}</h3>
                        <p className="movie-meta">
                            {director && <span className="movie-director">{director}</span>}
                            {director && <span className="meta-separator">•</span>}
                            <span className="movie-year">{year}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default MovieCard;
