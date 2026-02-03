import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProfileUrl } from '../services/tmdb';
import type { Person } from '../types/tmdb';
import './PersonCard.css';

interface PersonCardProps {
    person: Person;
    index?: number;
}

const getRole = (department: string, gender?: number) => {
    if (department === 'Directing') return 'Director';
    if (department === 'Acting') {
        if (gender === 1) return 'Actress';
        if (gender === 2) return 'Actor';
        return 'Actor';
    }
    return department;
};

const PersonCard = ({ person, index = 0 }: PersonCardProps) => {
    const [hasError, setHasError] = useState(false);
    return (
        <motion.div
            className="person-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
            <Link to={`/director/${person.id}`} className="person-card-link">
                <div className="person-photo-wrapper">
                    <img
                        src={hasError ? '/no_image.png' : getProfileUrl(person.profile_path, 'h632')}
                        alt={person.name}
                        className={`person-photo ${hasError ? 'is-placeholder' : ''}`}
                        loading="lazy"
                        onError={() => setHasError(true)}
                    />
                    <div className="person-content">
                        <h3 className="person-name">{person.name}</h3>
                        {person.known_for_department && (
                            <p className="person-role">
                                {getRole(person.known_for_department, person.gender)}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default PersonCard;
