import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX, Maximize } from 'lucide-react';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  // Update current time during playback
  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video) setCurrentTime(video.currentTime);
    };
    
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer object-contain"
      />
      
      {/* Play/Pause Overlay Icon (Centered) */}
      {!isPlaying && (
        <div 
            className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none transition-opacity duration-300"
        >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                <Play className="w-6 h-6 text-white ml-1 fill-current" />
            </div>
        </div>
      )}

      {/* Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-12 transition-all duration-300 ${
          isHovering || !isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-4">
            
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          
          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = Number(e.target.value);
                }
              }}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 accent-cyan-500"
            />
            
            <span className="text-xs font-mono text-slate-300 w-10">
              {formatTime(duration || 0)}
            </span>
          </div>

          {/* Volume & Fullscreen */}
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="text-slate-300 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button className="text-slate-300 hover:text-white transition-colors">
                <Maximize className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Editorial;