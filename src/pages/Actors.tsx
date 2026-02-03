import { useEffect, useState } from 'react';
import { getPersonDetails } from '../services/tmdb';
import { NOUVELLE_VAGUE_ACTORS } from '../data/actors';
import PersonCard from '../components/PersonCard';
import type { PersonDetails } from '../types/tmdb';
import './Actors.css';

const Actors = () => {
    const [actors, setActors] = useState<PersonDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadActors = async () => {
            try {
                const actorPromises = NOUVELLE_VAGUE_ACTORS.map(actor =>
                    getPersonDetails(actor.id)
                );
                const results = await Promise.all(actorPromises);
                setActors(results.filter(a => a !== null) as PersonDetails[]);
            } catch (error) {
                console.error('Error loading actors:', error);
            } finally {
                setLoading(false);
            }
        };

        loadActors();
    }, []);

    return (
        <div className="actors-page">
            <div className="page-header film-strip">
                <div className="container">
                    <h1>Icons of the Nouvelle Vague</h1>
                    <p className="page-description">
                        The faces that defined a generation of cinema
                    </p>
                </div>
            </div>

            <div className="container">
                <section className="actors-section">
                    {loading ? (
                        <div className="actors-grid">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: '450px', borderRadius: 'var(--radius-md)' }} />
                            ))}
                        </div>
                    ) : (
                        <div className="actors-grid">
                            {actors.map((actor, index) => (
                                <PersonCard key={actor.id} person={actor} index={index} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Actors;
