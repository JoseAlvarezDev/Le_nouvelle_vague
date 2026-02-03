import { useState } from 'react';
import './VideoPlayer.css';

interface VideoPlayerProps {
    youtubeId: string;
    autoplay?: boolean;
    muted?: boolean;
    title?: string;
}

const VideoPlayer = ({ youtubeId, autoplay = false, muted = true, title = 'Video' }: VideoPlayerProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const embedUrl = (() => {
        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            mute: muted ? '1' : '0',
            controls: '1',
            rel: '0',
            modestbranding: '1',
            playsinline: '1',
        });
        return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
    })();

    return (
        <div className="video-player">
            {isLoading && (
                <div className="video-player-loading">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                className="video-player-iframe"
            />
        </div>
    );
};

export default VideoPlayer;
