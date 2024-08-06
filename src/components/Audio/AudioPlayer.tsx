import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './AudioPlayer.css';
import playIcon from '../../assets/images/play.svg';
import pauseIcon from '../../assets/images/pause.svg';

interface AudioPlayerProps {
    url: string;
    currentPlaying: string | null;
    setCurrentPlaying: (url: string | null) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, currentPlaying, setCurrentPlaying }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayed, setIsPlayed] = useState(false);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        try {
            if (waveformRef.current) {
                wavesurfer.current = WaveSurfer.create({
                    container: waveformRef.current,
                    waveColor: isPlayed ? '#BF7AE4' : '#494747',
                    progressColor: '#BF7AE4',
                    height: 35,
                    responsive: true,
                    barWidth: 5,
                    barGap: 3,
                    cursorColor: 'transparent',
                });

                if (url) {
                    wavesurfer.current.load(url);

                    wavesurfer.current.on('ready', () => {
                        setDuration(wavesurfer.current?.getDuration() || 0);
                    });

                    wavesurfer.current.on('audioprocess', () => {
                        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
                    });

                    wavesurfer.current.on('finish', () => {
                        setIsPlaying(false);
                        setIsPlayed(true);
                    });
                }
            }
        } catch (error) {
            console.log('Error initializing WaveSurfer:', error);
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, [url, isPlayed]);

    useEffect(() => {
        if (currentPlaying !== url && isPlaying) {
            wavesurfer.current?.pause();
            setIsPlaying(false);
        }
    }, [currentPlaying, url, isPlaying]);

    const togglePlayPause = () => {
        if (wavesurfer.current) {
            if (!isPlaying) {
                setCurrentPlaying(url);
            } else {
                setCurrentPlaying(null);
            }
            wavesurfer.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={`waveform-container ${isPlayed ? 'played' : ''}`}>
            <button className="play-button" onClick={togglePlayPause}>
                <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" className={isPlayed ? 'played' : ''} />
            </button>
            <div className="wave" ref={waveformRef} />
            <div className="time-display">
                {isPlaying || currentTime > 0 ? formatTime(currentTime) : formatTime(duration)}
            </div>
        </div>
    );
};

export default AudioPlayer;
