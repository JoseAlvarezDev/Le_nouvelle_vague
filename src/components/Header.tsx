import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const location = useLocation();

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo-link" onClick={closeMenu}>
                        <img src={`${import.meta.env.BASE_URL}logo_no_bg.png`} alt="La Nouvelle Vague" className="logo" />
                    </Link>

                    <button
                        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/directors"
                            className={`nav-link ${location.pathname === '/directors' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            Directors
                        </Link>
                        <Link
                            to="/actors"
                            className={`nav-link ${location.pathname === '/actors' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            Actors/Actresses
                        </Link>
                        <Link
                            to="/movies"
                            className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/about"
                            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
