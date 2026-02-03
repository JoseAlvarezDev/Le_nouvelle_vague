import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import './TrailerModal.css';

interface TrailerModalProps {
    youtubeId: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

const TrailerModal = ({ youtubeId, title, isOpen, onClose }: TrailerModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="trailer-modal-overlay" onClick={onClose}>
            <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="trailer-modal-close" onClick={onClose} aria-label="Close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <VideoPlayer youtubeId={youtubeId} autoplay={true} muted={false} title={title} />
            </div>
        </div>
    );
};

export default TrailerModal;
