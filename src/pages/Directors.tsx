import { useEffect, useState } from 'react';
import { getPersonDetails } from '../services/tmdb';
import { NOUVELLE_VAGUE_DIRECTORS } from '../data/directors';
import PersonCard from '../components/PersonCard';
import type { PersonDetails, Person } from '../types/tmdb';
import './Directors.css';

const Directors = () => {
    const [directors, setDirectors] = useState<PersonDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDirectors = async () => {
            try {
                const directorPromises = (NOUVELLE_VAGUE_DIRECTORS as unknown as Person[]).map(dir =>
                    getPersonDetails(dir.id)
                );
                const results = await Promise.all(directorPromises);
                setDirectors(results.filter(d => d !== null) as PersonDetails[]);
            } catch (error) {
                console.error('Error loading directors:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDirectors();
    }, []);

    return (
        <div className="directors-page">
            <div className="page-header film-strip">
                <div className="container">
                    <h1>Directors of Le Nouvelle Vague</h1>
                    <p className="page-description">
                        The visionaries who revolutionized French and world cinema
                    </p>
                </div>
            </div>

            <div className="container">
                <section className="directors-section">
                    {loading ? (
                        <div className="directors-grid">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '450px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="directors-grid">
                            {directors.map((director, index) => (
                                <PersonCard key={director.id} person={director} index={index} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Directors;
