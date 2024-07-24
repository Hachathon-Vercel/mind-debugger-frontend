declare module 'wavesurfer.js' {
    import { PluginDefinition } from 'wavesurfer.js/src/plugin/types';
    import { WaveSurferParams } from 'wavesurfer.js/types/params';

    class WaveSurfer {
        static create(params: WaveSurferParams): WaveSurfer;
        constructor(params: WaveSurferParams);
        init(): void;
        destroy(): void;
        load(url: string, peaks?: number[], preload?: string, duration?: number): void;
        play(start?: number, end?: number): void;
        pause(): void;
        playPause(): void;
        isPlaying(): boolean;
        setPlaybackRate(rate: number): void;
        getDuration(): number;
        getCurrentTime(): number;
        setCurrentTime(seconds: number): void;
        skip(seconds: number): void;
        skipForward(seconds: number): void;
        skipBackward(seconds: number): void;
        on(eventName: string, callback: (...args: any[]) => void): void;
        un(eventName: string, callback: (...args: any[]) => void): void;
        once(eventName: string, callback: (...args: any[]) => void): void;
        createTimeline(params: any): any;
        addPlugin(plugin: PluginDefinition): WaveSurfer;
        initPlugin(name: string): void;
    }

    export default WaveSurfer;
}
