import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="page-header film-strip">
                <div className="container">
                    <h1>About Le Nouvelle Vague</h1>
                    <p className="page-description">
                        The movement that changed cinema forever
                    </p>
                </div>
            </div>

            <div className="container">
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <section className="about-section">
                        <h2>What was Le Nouvelle Vague?</h2>
                        <p>
                            Le Nouvelle Vague was a French film movement
                            that emerged in the late 1950s and early 1960s. This
                            movement revolutionized world cinema by breaking with the
                            traditional conventions of cinematic narrative and filmmaking.
                        </p>
                        <p>
                            The directors of Le Nouvelle Vague, many of whom began as
                            film critics for the magazine <em>Cahiers du Cinéma</em>, believed in
                            cinema as a form of personal expression for the director, known as
                            the "auteur theory" (<em>politique des auteurs</em>).
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>Key Characteristics</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>Technical Innovation</h3>
                                <p>
                                    Use of portable cameras, natural lighting, and filming on
                                    real locations instead of studios.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3>Experimental Narrative</h3>
                                <p>
                                    Breaking temporal continuity, use of jump cuts, and non-linear
                                    narrative structures.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3>Low Budget</h3>
                                <p>
                                    Independent production with reduced budgets, allowing for
                                    greater creative freedom.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3>Contemporary Themes</h3>
                                <p>
                                    Exploration of modern life, urban alienation, and existential
                                    questions.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3>Improvised Dialogue</h3>
                                <p>
                                    Favoring spontaneity over rigid scripts, capturing authentic
                                    interactions and raw emotions.
                                </p>
                            </div>
                            <div className="feature-card">
                                <h3>Cinephilia</h3>
                                <p>
                                    A deep love for cinema history, often referencing Hollywood
                                    classics and other directors within their films.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="about-section">
                        <h2>Key Directors</h2>
                        <p>
                            Among the most influential directors of Le Nouvelle Vague are:
                        </p>
                        <ul className="directors-list">
                            <li>
                                <strong>Jean-Luc Godard</strong> - Revolutionized narrative with "Breathless" (1960)
                            </li>
                            <li>
                                <strong>François Truffaut</strong> - Debuted with "The 400 Blows" (1959)
                            </li>
                            <li>
                                <strong>Agnès Varda</strong> - Pioneer of the movement, known as its "grandmother"
                            </li>
                            <li>
                                <strong>Claude Chabrol</strong> - Master of the French psychological thriller
                            </li>
                            <li>
                                <strong>Alain Resnais</strong> - Innovator in temporal narrative
                            </li>
                            <li>
                                <strong>Jacques Demy</strong> - Creator of unique poetic musicals
                            </li>
                        </ul>
                    </section>

                    <section className="about-section">
                        <h2>Legacy and Influence</h2>
                        <p>
                            Le Nouvelle Vague had a deep and lasting impact on world cinema.
                            Its influence can be seen in later film movements
                            such as the New German Cinema, the New Hollywood of the 70s, and
                            contemporary independent cinema.
                        </p>
                        <p>
                            The techniques and philosophies developed by these directors continue
                            to inspire filmmakers around the world, demonstrating that cinema can
                            be both personal art and a medium for social and cultural exploration.
                        </p>
                    </section>

                    <section className="about-section about-cta">
                        <h2>Ready to explore?</h2>
                        <p>
                            Dive into our curated database of films, directors, and actors
                            from Le Nouvelle Vague.
                        </p>
                        <div className="cta-buttons">
                            <Link to="/movies" className="btn btn-primary">
                                Explore Movies
                            </Link>
                            <Link to="/directors" className="btn btn-secondary">
                                View Directors
                            </Link>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
