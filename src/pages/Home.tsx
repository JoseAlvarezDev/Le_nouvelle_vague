import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { discoverFrenchNewWaveMovies, getPersonDetails } from '../services/tmdb';
import { NOUVELLE_VAGUE_DIRECTORS } from '../data/directors';
import { NOUVELLE_VAGUE_ACTORS } from '../data/actors';
import MovieCard from '../components/MovieCard';
import PersonCard from '../components/PersonCard';
import type { Movie, PersonDetails, Person } from '../types/tmdb';
import './Home.css';

const Home = () => {
    const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
    const [featuredDirectors, setFeaturedDirectors] = useState<PersonDetails[]>([]);
    const [featuredActors, setFeaturedActors] = useState<PersonDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Load featured movies
                const movies = await discoverFrenchNewWaveMovies(1);
                setFeaturedMovies(movies.slice(0, 12));

                // Load featured directors (max 12)
                const directorPromises = (NOUVELLE_VAGUE_DIRECTORS as unknown as Person[]).slice(0, 12).map(dir =>
                    getPersonDetails(dir.id)
                );
                const directors = await Promise.all(directorPromises);
                setFeaturedDirectors(directors.filter(d => d !== null) as PersonDetails[]);

                // Load featured actors (max 12)
                const actorPromises = (NOUVELLE_VAGUE_ACTORS as unknown as Person[]).slice(0, 12).map(actor =>
                    getPersonDetails(actor.id)
                );
                const actors = await Promise.all(actorPromises);
                setFeaturedActors(actors.filter(a => a !== null) as PersonDetails[]);

                // Hero video is now manually set to a specific iconic clip
            } catch (error) {
                console.error('Error loading home data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero film-grain">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-trailer">
                            <img
                                src={`${import.meta.env.BASE_URL}logo_header.jpg`}
                                alt="Nouvelle Vague Cinema"
                                className="hero-bg-image"
                                style={{ objectFit: 'cover', opacity: 0.6 }}
                            />
                        </div>
                        <div className="hero-text">
                            <img src={`${import.meta.env.BASE_URL}logo_no_bg.png`} alt="La Nouvelle Vague" className="hero-logo" />
                            <h1 className="hero-title">Le Nouvelle Vague</h1>
                            <p className="hero-subtitle">
                                The movement that revolutionized world cinema
                            </p>
                            <p className="hero-description">
                                Discover the films, directors, and actors who transformed
                                the art of cinema in the 1950s and 60s.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/movies" className="btn btn-primary">
                                    Explore Movies
                                </Link>
                                <Link to="/directors" className="btn btn-secondary">
                                    View Directors
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Directors */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2>Iconic Directors</h2>
                        <Link to="/directors" className="view-all">
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid">
                            {featuredDirectors.map((director, index) => (
                                <PersonCard key={director.id} person={director} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Actors */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <h2>Iconic Actors / Actresses</h2>
                        <Link to="/actors" className="view-all">
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid">
                            {featuredActors.map((actor, index) => (
                                <PersonCard key={actor.id} person={actor} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Movies */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Films</h2>
                        <Link to="/movies" className="view-all">
                            View All →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '450px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid">
                            {featuredMovies.map((movie, index) => (
                                <MovieCard key={movie.id} movie={movie} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* About Section */}
            <section className="section">
                <div className="container">
                    <div className="about-preview">
                        <h2>What is Le Nouvelle Vague?</h2>
                        <p>
                            The Nouvelle Vague was a French film movement
                            that emerged in the late 1950s and early 1960s. Characterized
                            by its rejection of traditional cinema conventions, this movement
                            introduced innovative techniques in narrative, editing, and cinematography
                            that influenced world cinema forever.
                        </p>
                        <p>
                            Directors like Jean-Luc Godard, François Truffaut, and Agnès Varda
                            revolutionized cinematic language with films that explored
                            existential, social, and political themes in completely new ways.
                        </p>
                        <Link to="/about" className="btn btn-primary">
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
