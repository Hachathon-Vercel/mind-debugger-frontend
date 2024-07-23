import React, { useRef, useEffect, useState } from 'react';
import './AudioPlayer.css';
import sampleAudio from '../../assets/audios/sample.mp3'; // Ajusta la ruta del archivo de audio según tu estructura

interface AudioPlayerProps {
    src?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const updateProgress = () => {
        const audio = audioRef.current;
        const progress = progressRef.current;
        if (audio && progress) {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            setCurrentTime(formatTime(currentTime));
            setDuration(formatTime(duration));
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="audio-player">
            <button className="play-pause" onClick={togglePlayPause}>
                {isPlaying ? '❚❚' : '▶'}
            </button>
            <div className="waveform">
                <div ref={progressRef} className="progress"></div>
            </div>
            <span className="duration">{currentTime}</span>
            <audio ref={audioRef} src={src || sampleAudio} onTimeUpdate={updateProgress} onLoadedMetadata={updateProgress}></audio>
        </div>
    );
};

export default AudioPlayer;
