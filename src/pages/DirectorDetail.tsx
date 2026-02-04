import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPersonDetails, getProfileUrl } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import type { PersonDetails, MovieCrew } from '../types/tmdb';
import './DirectorDetail.css';

const DirectorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<PersonDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPerson = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await getPersonDetails(parseInt(id));
                setPerson(data);
            } catch (error) {
                console.error('Error loading person:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPerson();
    }, [id]);

    if (loading) {
        return (
            <div className="director-detail-page">
                <div className="container">
                    <div className="skeleton" style={{ height: '600px', marginTop: 'var(--spacing-2xl)' }} />
                </div>
            </div>
        );
    }

    if (!person) {
        return (
            <div className="director-detail-page">
                <div className="container">
                    <p className="error-message">Person not found</p>
                </div>
            </div>
        );
    }

    // Determine role and get relevant movies
    const isActor = person.known_for_department === 'Acting';
    const roleTitle = isActor
        ? (person.gender === 1 ? 'Actress' : 'Actor')
        : 'Director';

    const movies = isActor
        ? person.movie_credits?.cast
            .sort((a, b) => {
                const dateA = new Date(a.release_date || '1900-01-01').getTime();
                const dateB = new Date(b.release_date || '1900-01-01').getTime();
                return dateB - dateA; // Newest first
            }) || []
        : person.movie_credits?.crew
            .filter((credit: MovieCrew) => credit.job === 'Director')
            .sort((a: MovieCrew, b: MovieCrew) => {
                const dateA = new Date(a.release_date || '1900-01-01').getTime();
                const dateB = new Date(b.release_date || '1900-01-01').getTime();
                return dateB - dateA;
            }) || [];

    // Deduplicate movies by ID
    const uniqueMovies = Array.from(new Map(movies.map(m => [m.id, m])).values());

    // Separate Documentaries from Feature Films
    const documentaries = uniqueMovies.filter(m => m.genre_ids?.includes(99));
    const featureFilms = uniqueMovies.filter(m => !m.genre_ids?.includes(99));

    return (
        <div className="director-detail-page">
            <div className="container">
                <motion.div
                    className="director-detail-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="director-header">
                        <div className="profile-section">
                            <img
                                src={getProfileUrl(person.profile_path, 'h632')}
                                alt={person.name}
                                className="profile-photo"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `${import.meta.env.BASE_URL}no_image.png`;
                                }}
                            />
                        </div>

                        <div className="bio-section">
                            <h1 className="person-name-detail">{person.name}</h1>

                            <div className="person-meta">
                                {person.birthday && (
                                    <p className="meta-info">
                                        <strong>Born:</strong> {new Date(person.birthday).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        {person.place_of_birth && ` • ${person.place_of_birth}`}
                                    </p>
                                )}
                                {person.deathday && (
                                    <p className="meta-info">
                                        <strong>Died:</strong> {new Date(person.deathday).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                                <p className="meta-info">
                                    <strong>Known for:</strong> {person.known_for_department}
                                </p>
                            </div>

                            {person.biography && (
                                <div className="biography">
                                    <h2>Biography</h2>
                                    <p>{person.biography}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feature Films Filmography */}
                    {featureFilms.length > 0 && (
                        <div className="filmography-section">
                            <h2>Filmography as {roleTitle}</h2>
                            <div className="filmography-grid">
                                {featureFilms.map((movie, index) => (
                                    <MovieCard
                                        key={`feature-${movie.id}-${index}`}
                                        movie={{
                                            id: movie.id,
                                            title: movie.title,
                                            original_title: movie.title,
                                            overview: '',
                                            poster_path: movie.poster_path,
                                            backdrop_path: null,
                                            release_date: movie.release_date,
                                            vote_average: movie.vote_average,
                                            vote_count: 0,
                                            popularity: 0,
                                            genre_ids: movie.genre_ids || [],
                                            original_language: 'fr',
                                            adult: false,
                                            video: false,
                                        }}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Documentaries Section */}
                    {documentaries.length > 0 && (
                        <div className="filmography-section">
                            <h2>Documentaries</h2>
                            <div className="filmography-grid">
                                {documentaries.map((movie, index) => (
                                    <MovieCard
                                        key={`doc-${movie.id}-${index}`}
                                        movie={{
                                            id: movie.id,
                                            title: movie.title,
                                            original_title: movie.title,
                                            overview: '',
                                            poster_path: movie.poster_path,
                                            backdrop_path: null,
                                            release_date: movie.release_date,
                                            vote_average: movie.vote_average,
                                            vote_count: 0,
                                            popularity: 0,
                                            genre_ids: movie.genre_ids || [],
                                            original_language: 'fr',
                                            adult: false,
                                            video: false,
                                        }}
                                        index={index}
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

export default DirectorDetail;
