import React, { useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import './AudioPlayer.css';
import playIcon from '../../assets/images/play.svg';
import pauseIcon from '../../assets/images/pause.svg';
import sampleAudio from '../../assets/audios/sample.mp3';

interface AudioPlayerProps {
    src?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlayed, setIsPlayed] = useState(false);

    useEffect(() => {
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

            wavesurfer.current.load(src || sampleAudio);

            wavesurfer.current.on('ready', () => {
                console.log('WaveSurfer is ready');
            });

            wavesurfer.current.on('audioprocess', () => {
                setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
            });

            wavesurfer.current.on('finish', () => {
                setIsPlaying(false);
                setIsPlayed(true);
            });
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, [src, isPlayed]);

    const togglePlayPause = () => {
        if (wavesurfer.current) {
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
            <div className="time-display">{formatTime(currentTime)}</div>
        </div>
    );
};

export default AudioPlayer;
