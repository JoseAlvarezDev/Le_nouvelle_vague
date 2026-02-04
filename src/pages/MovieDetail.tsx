import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMovieDetails, getImageUrl, getProfileUrl } from '../services/tmdb';
import type { MovieDetails } from '../types/tmdb';
import './MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getMovieDetails(parseInt(id));
                setMovie(data);
            } catch (error) {
                console.error('Error loading movie:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="movie-detail-page">
                <div className="container">
                    <div className="skeleton" style={{ height: '600px', marginTop: 'var(--spacing-2xl)' }} />
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="movie-detail-page">
                <div className="container">
                    <p className="error-message">Movie not found</p>
                </div>
            </div>
        );
    }

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const director = movie.credits?.crew.find(c => c.job === 'Director');
    const cast = movie.credits?.cast.slice(0, 8) || [];

    return (
        <div className="movie-detail-page">
            {/* Backdrop */}
            {movie.backdrop_path && (
                <div className="backdrop-wrapper">
                    <img
                        src={getImageUrl(movie.backdrop_path, 'original')}
                        alt={movie.title}
                        className="backdrop"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `${import.meta.env.BASE_URL}no_image.png`;
                        }}
                    />
                    <div className="backdrop-overlay" />
                </div>
            )}

            <div className="container">
                <motion.div
                    className="movie-detail-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="movie-main">
                        <div className="poster-section">
                            <img
                                src={getImageUrl(movie.poster_path, 'w500')}
                                alt={movie.title}
                                className="detail-poster"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `${import.meta.env.BASE_URL}no_image.png`;
                                }}
                            />
                        </div>

                        <div className="info-section">
                            <h1 className="movie-title-detail">{movie.title}</h1>
                            {movie.original_title !== movie.title && (
                                <p className="original-title">{movie.original_title}</p>
                            )}

                            <div className="movie-meta">
                                <span className="meta-item">{year}</span>
                                {movie.runtime && <span className="meta-item">{movie.runtime} min</span>}
                                <span className="meta-item">★ {movie.vote_average.toFixed(1)}</span>
                            </div>

                            {movie.tagline && (
                                <p className="tagline">"{movie.tagline}"</p>
                            )}

                            {director && (
                                <div className="director-info">
                                    <h3>Director</h3>
                                    <Link to={`/director/${director.id}`} className="director-link">
                                        {director.name}
                                    </Link>
                                </div>
                            )}

                            {movie.genres.length > 0 && (
                                <div className="genres">
                                    <h3>Genres</h3>
                                    <div className="genre-tags">
                                        {movie.genres.map(genre => (
                                            <span key={genre.id} className="genre-tag">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="overview">
                                <h3>Synopsis</h3>
                                <p>{movie.overview || 'No synopsis available.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Cast */}
                    {cast.length > 0 && (
                        <div className="cast-section">
                            <h2>Cast</h2>
                            <div className="cast-grid">
                                {cast.map(actor => (
                                    <div key={actor.id} className="cast-card">
                                        <img
                                            src={getProfileUrl(actor.profile_path, 'w185')}
                                            alt={actor.name}
                                            className="cast-photo grayscale"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = `${import.meta.env.BASE_URL}no_image.png`;
                                            }}
                                        />
                                        <div className="cast-info">
                                            <p className="cast-name">{actor.name}</p>
                                            <p className="cast-character">{actor.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Images */}
                    {movie.images && movie.images.posters.length > 1 && (
                        <div className="images-section">
                            <h2>Posters</h2>
                            <div className="images-grid">
                                {movie.images.posters.slice(0, 6).map((image, index) => (
                                    <img
                                        key={index}
                                        src={getImageUrl(image.file_path, 'w500')}
                                        alt={`${movie.title} poster ${index + 1}`}
                                        className="poster-image grayscale"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MovieDetail;
