import { useEffect, useState } from 'react';
import { discoverFrenchNewWaveMovies, searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import type { Movie } from '../types/tmdb';
import './Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async (pageNum = 1) => {
        if (pageNum === 1) setLoading(true);
        try {
            const results = await discoverFrenchNewWaveMovies(pageNum);
            if (pageNum === 1) {
                setMovies(results);
            } else {
                setMovies(prev => [...prev, ...results]);
            }
            if (results.length === 0) setHasMore(false);
        } catch (error) {
            console.error('Error loading movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        loadMovies(nextPage);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            loadMovies(1);
            setPage(1);
            setIsSearching(false);
            setHasMore(true);
            return;
        }

        setIsSearching(true);
        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setHasMore(false); // Search results are usually single page for simplicity here
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setPage(1);
        setHasMore(true);
        loadMovies(1);
    };

    return (
        <div className="movies-page">
            <div className="page-header film-strip">
                <div className="container">
                    <h1>Films of Le Nouvelle Vague (1958-1970)</h1>
                    <p className="page-description">
                        Explore the French cinema that changed history between 1958 and 1970
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="search-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search French New Wave movies (1958-1970)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            Search
                        </button>
                        {isSearching && (
                            <button type="button" onClick={handleClearSearch} className="clear-button">
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                <section className="movies-section">
                    {loading && page === 1 ? (
                        <div className="movies-grid">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '450px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : movies.length > 0 ? (
                        <>
                            <div className="movies-grid">
                                {movies.map((movie, index) => (
                                    <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index} />
                                ))}
                            </div>

                            {!isSearching && hasMore && (
                                <div className="load-more-container" style={{ textAlign: 'center', marginTop: 'var(--spacing-3xl)' }}>
                                    <button
                                        onClick={handleLoadMore}
                                        className="btn btn-secondary"
                                        disabled={loading}
                                        style={{
                                            padding: '12px 30px',
                                            fontSize: '1.1rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}
                                    >
                                        {loading ? 'Loading...' : 'Load More Movies'}
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-results">
                            <p>No movies found</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Movies;
