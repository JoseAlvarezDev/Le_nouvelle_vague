import { motion } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = () => {
    return (
        <motion.div
            className="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            transition={{ duration: 0.5 }}
        >
            <div className="splash-content">
                <motion.img
                    src={`${import.meta.env.BASE_URL}logo_no_bg.png`}
                    alt="Le Nouvelle Vague"
                    className="splash-logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.h1
                    className="splash-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Le Nouvelle Vague
                </motion.h1>
                <motion.div
                    className="splash-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />

                <motion.div
                    className="splash-attribution"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <img src={`${import.meta.env.BASE_URL}tmdb_logo.svg`} alt="TMDB" className="splash-tmdb-logo" />
                    <span>Powered by TMDB</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;
