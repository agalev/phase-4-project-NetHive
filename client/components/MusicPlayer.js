import React, { useState, useRef } from "react";

const audioSources = [
  {
    src: "/Audio/2.mp3",
    title: "Fly Away",
    artist: "Lenny Kravitz",
  },
  {
    src: "/Audio/4.mp3",
    title: "Scar Tissue",
    artist: "Red Hot Chili Peppers",
  },
  {
    src: "/Audio/1.mp3",
    title: "Sexual Healing",
    artist: "Marvin Gaye",
  },
  {
    src: "/Audio/3.mp3",
    title: "Jeremy",
    artist: "Pearl Jam",
  },
];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [skipCount, setSkipCount] = useState(0);
  

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      audio.src = audioSources[currentTrackIndex].src;
      audio.volume = volume;
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    const audio = audioRef.current;

    if (currentTrackIndex < audioSources.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      audio.src = audioSources[currentTrackIndex + 1].src;
      audio.volume = volume;
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      setCurrentTrackIndex(0);
      audio.src = audioSources[0].src;
      audio.volume = volume;
      audio.play();
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % audioSources.length;
    setCurrentTrackIndex(nextIndex);
    const audio = audioRef.current;
    audio.src = audioSources[nextIndex].src;
    audio.volume = volume;
    if (isPlaying) {
      audio.play();
    }
    setSkipCount(skipCount + 1); 
  };
  

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100;
  };


  return (
    <div className="bg-gradient-to-r from-my-secondpurple to-my-blue text-white px-4 py-2 flex justify-between items-center z-50">
      <div className="music-player">
        <audio ref={audioRef} onEnded={handleEnded} onTimeUpdate={handleTimeUpdate} />
        <div className="controls">
            
          <div className="buttons-container flex items-center space-x-4">
            
          </div>
          
        </div>
        <div className="track-info-container flex items-center">
            
          <div className="track-info-wrapper">
            
            <div className="track-info">
                
              <div className="track-title font-bold text-lg">
                
                {audioSources[currentTrackIndex].title}
                
              </div>
              
              <div className="track-artist text-gray-400">
                {audioSources[currentTrackIndex].artist}
                
              </div>
              
            </div>
            
          </div>
          
        </div>
      </div>
      <button className="next-button ml-auto text-lg" onClick={handleNextTrack}>
        
        Vote To Skip ({skipCount})
        <button className="play-pause-button" onClick={handlePlayPause}>
              {isPlaying ? "II" : "▶"}
            </button>
        </button>
      <div className="volume-control flex items-center space-x-2">
        <button
          className="volume-down-button"
          onClick={() => setVolume(Math.max(0, volume - 0.1))}
        >
        </button>
      </div>
    </div>
  );
  
  
  
}

export default MusicPlayer;

