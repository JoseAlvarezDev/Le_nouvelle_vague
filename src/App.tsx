import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Directors from './pages/Directors';
import DirectorDetail from './pages/DirectorDetail';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import About from './pages/About';
import SplashScreen from './components/SplashScreen';
import Actors from './pages/Actors';
import './App.css';

// Wrapper component to handle location-based transitions if needed in future
const AppContent = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/directors" element={<Directors />} />
                    <Route path="/director/:id" element={<DirectorDetail />} />
                    <Route path="/actors" element={<Actors />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Show splash screen for 2.5 seconds
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <AnimatePresence mode="wait">
                {loading ? (
                    <SplashScreen key="splash" />
                ) : (
                    <AppContent key="app" />
                )}
            </AnimatePresence>
        </Router>
    );
}

export default App;
