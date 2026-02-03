import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer film-strip">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Le Nouvelle Vague</h3>
                        <p>
                            Exploring the film movement that revolutionized world cinema
                            in the 1950s and 60s.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/directors">Directors</Link></li>
                            <li><Link to="/movies">Movies</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Data</h4>
                        <div className="tmdb-attribution-container">
                            <img
                                src={`${import.meta.env.BASE_URL}tmdb_logo.svg`}
                                alt="TMDB Logo"
                                className="tmdb-logo"
                            />
                            <p className="tmdb-attribution">
                                This product uses the TMDB API but is not endorsed or certified by TMDB.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Le Nouvelle Vague. By Jose Alvarez Dev. All rights reserved.</p>
                    <p className="footer-support">
                        Support this project: <a href="https://ko-fi.com/josealvarezdev" target="_blank" rel="noopener noreferrer" className="ko-fi-link">Buy me a coffee ☕</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
