import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audioUrl: string;
}

// Lista de músicas utilizando arquivos de acesso público
const songList: Song[] = [
  {
    id: 'around-the-world',
    title: 'Around The World',
    artist: 'Red Hot Chili Peppers',
    album: 'Californication',
    cover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTgwLDY1IEwyNSw2NSBMMjUsMTM1IEw4MCwxMzUgTDgwLDExNSBMMTEwLDEzNSBMMTEwLDY1IEw4MCw4NSBMODAsNjUgWiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjEwMCIgcj0iMjUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
    audioUrl: 'https://ia600302.us.archive.org/26/items/amazing-grace_202005/amazing-grace.mp3'
  },
  {
    id: 'what-you-are',
    title: 'What You Are',
    artist: 'Audioslave',
    album: 'Audioslave',
    cover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEwMCw2MCBBNDAsNDAgMCAwIDEgMTQwLDEwMCBBNDAsNDAgMCAwIDEgMTAwLDE0MCBBNDAsNDAgMCAwIDEgNjAsMTAwIEw4MCwxMDAgQTIwLDIwIDAgMCAwIDEwMCw4MCBBMjAsMjAgMCAwIDAgMTIwLDEwMCBBMjAsMjAgMCAwIDAgMTAwLDEyMCBBMjAsMjAgMCAwIDAgODAsMTAwIHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
    audioUrl: 'https://ia800304.us.archive.org/19/items/cd_hey-jude_the-beatles/disc1/14.%20The%20Beatles%20-%20Across%20the%20Universe_sample.mp3'
  },
  {
    id: 'outshined',
    title: 'Outshined',
    artist: 'Soundgarden',
    album: 'Badmotorfinger',
    cover: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTU1LDcwIEwxNDUsNzAgTDE0NSwxMzAgTDU1LDEzMCB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAiIGZpbGw9IiNmZmYiLz48bGluZSB4MT0iNTUiIHkxPSI3MCIgeDI9IjE0NSIgeTI9IjEzMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48bGluZSB4MT0iNTUiIHkxPSIxMzAiIHgyPSIxNDUiIHkyPSI3MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
    audioUrl: 'https://ia800107.us.archive.org/15/items/cd_the-jazz-giants-play-cole-porter_ben-webster-coleman-hawkins-buddy-rich-har/disc1/03.%20Ben%20Webster%2C%20Coleman%20Hawkins%2C%20Buddy%20Rich%2C%20Harry%20Edison%2C%20Hank%20Jones%2C%20Ray%20Brown%20-%20Embraceable%20You_sample.mp3'
  }
];

const FuturisticTurntable = () => {
  const [selectedSong, setSelectedSong] = useState<Song>(songList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>();
  const discRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Inicializar o elemento de áudio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Efeito para atualizar o volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Efeito para atualizar a música quando ela é alterada
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedSong.audioUrl;
      audioRef.current.load();
      
      // Adicionar listener para atualizar o progresso da música
      const updateProgress = () => {
        if (audioRef.current) {
          const currentProgress = audioRef.current.currentTime / audioRef.current.duration;
          setProgress(isNaN(currentProgress) ? 0 : currentProgress);
        }
      };
      
      // Adicionar listener para quando a música acabar
      const handleEnded = () => {
        setIsPlaying(false);
        
        // Ir para a próxima música
        const currentIndex = songList.findIndex(song => song.id === selectedSong.id);
        const nextIndex = (currentIndex + 1) % songList.length;
        setTimeout(() => {
          setSelectedSong(songList[nextIndex]);
          setIsPlaying(true);
        }, 500);
      };
      
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [selectedSong]);

  // Efeito para controlar a reprodução e a rotação do disco
  useEffect(() => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.error("Error playing audio:", err);
          setIsPlaying(false);
        });
      }
      
      let lastTime = 0;
      
      const animate = (time: number) => {
        if (lastTime === 0) {
          lastTime = time;
        }
        
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Rotação do disco (33 RPM)
        setRotation(prev => prev + deltaTime * 0.02);
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Animar o braço do toca-discos
      if (armRef.current) {
        armRef.current.style.transform = 'rotate(25deg)';
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Retornar o braço quando parar
      if (armRef.current) {
        armRef.current.style.transform = 'rotate(0deg)';
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Função para alternar entre play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Função para selecionar uma música
  const selectSong = (song: Song) => {
    if (selectedSong.id === song.id) {
      togglePlay();
    } else {
      // Parar a música atual
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setTimeout(() => {
        setSelectedSong(song);
        setIsPlaying(true);
      }, 500);
    }
  };
  
  // Função para ajustar o volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="w-full relative">
      {/* Toca-discos */}
      <div className="relative bg-mono-deeper border border-mono-white/20 rounded-lg p-6 w-full aspect-square max-w-md mx-auto shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
        {/* Base giratória */}
        <div className="relative w-full aspect-square bg-mono-black rounded-full border border-mono-white/10 flex items-center justify-center overflow-hidden">
          {/* Prato giratório */}
          <div 
            className="absolute w-[95%] h-[95%] rounded-full bg-gradient-to-br from-mono-deeper to-mono-black border border-mono-white/5"
            style={{
              boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.05), 0 5px 15px rgba(0, 0, 0, 0.5)"
            }}
          >
            {/* Marcações do prato */}
            <div className="absolute inset-0 rounded-full" 
              style={{
                background: "repeating-conic-gradient(rgba(255,255,255,0.03) 0deg 1deg, transparent 1deg 10deg)"
              }}
            ></div>
            
            {/* Eixo central */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mono-medium z-30"></div>
          </div>
          
          {/* Disco de vinil */}
          <div 
            ref={discRef}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isPlaying ? "none" : "transform 1s ease-out"
            }}
            className="absolute w-[75%] h-[75%] rounded-full bg-mono-black border border-mono-white/10 flex items-center justify-center"
          >
            {/* Ranhuras do disco */}
            <div className="absolute inset-0 rounded-full" 
              style={{
                background: "repeating-radial-gradient(rgba(255,255,255,0.05) 0px 1px, transparent 1px 3px)"
              }}
            ></div>
            
            {/* Etiqueta central do disco */}
            <div className="absolute w-[40%] h-[40%] rounded-full flex items-center justify-center overflow-hidden border border-mono-white/20">
              <img 
                src={selectedSong.cover} 
                alt={`${selectedSong.album} by ${selectedSong.artist}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Braço do toca-discos */}
        <div className="absolute top-6 right-12 h-[55%] w-4 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-mono-medium"></div>
          <div 
            ref={armRef}
            className="relative w-3 h-[calc(100%-8px)] bg-gradient-to-b from-mono-medium to-mono-deeper origin-top transition-transform duration-1000"
            style={{ transform: isPlaying ? 'rotate(25deg)' : 'rotate(0deg)' }}
          >
            <div className="absolute -right-1 bottom-0 w-6 h-3 bg-mono-medium"></div>
          </div>
        </div>
        
        {/* Controles */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-mono-white flex items-center justify-center text-mono-black hover:bg-mono-light transition-colors"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
          </button>
          
          {/* Efeito visual de reprodução */}
          {isPlaying && (
            <div className="flex space-x-1 items-center">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-1 bg-mono-white/70 rounded-full animate-pulse"
                  style={{ 
                    height: `${1 + Math.random() * 2}rem`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
        
        {/* HUD futurista com informações da música */}
        <div className="absolute -bottom-20 -left-3 -right-3 bg-mono-deeper border border-mono-white/20 rounded-lg p-4 backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-mono-white font-future text-lg truncate">{selectedSong.title}</div>
              <div className="text-mono-medium text-sm">{selectedSong.artist} - {selectedSong.album}</div>
            </div>
            <div className="flex items-center space-x-1">
              {isPlaying && (
                <>
                  <div className="w-2 h-2 rounded-full bg-mono-white animate-pulse"></div>
                  <span className="text-mono-medium text-xs">PLAYING</span>
                </>
              )}
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="relative w-full h-1 bg-mono-white/10 mt-2 mb-3 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-mono-white/50 rounded-full"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
          
          {/* Controle de volume */}
          <div className="flex items-center justify-end space-x-2">
            <FontAwesomeIcon 
              icon={volume > 0 ? faVolumeUp : faVolumeMute} 
              className="text-mono-medium text-sm" 
            />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-mono-white"
              aria-label="Controle de volume"
            />
          </div>
        </div>
      </div>
      
      {/* Lista de músicas */}
      <div className="mt-28 bg-mono-deeper/80 border border-mono-white/20 rounded-lg p-4 max-w-md mx-auto backdrop-blur-md">
        <h3 className="text-mono-white font-future text-lg mb-4 text-center border-b border-mono-white/10 pb-2">PLAYLIST</h3>
        <ul className="space-y-2">
          {songList.map((song) => (
            <li 
              key={song.id}
              onClick={() => selectSong(song)}
              className={`flex items-center p-3 cursor-pointer transition-all duration-300 ${
                selectedSong.id === song.id 
                  ? 'bg-mono-white/10 rounded-md border-l-4 border-mono-white pl-4' 
                  : 'hover:bg-mono-white/5 rounded-md'
              }`}
            >
              <div className="w-12 h-12 mr-4 rounded-md overflow-hidden flex-shrink-0 border border-mono-white/20">
                <img src={song.cover} alt={song.album} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-mono-white font-medium text-base truncate">{song.title}</div>
                <div className="text-mono-medium text-sm truncate">{song.artist}</div>
              </div>
              <div className="ml-3 flex-shrink-0">
                {selectedSong.id === song.id && isPlaying ? (
                  <div className="flex space-x-0.5">
                    {[1, 2, 3].map(i => (
                      <div 
                        key={i} 
                        className="w-1 h-4 bg-mono-white rounded-full animate-pulse" 
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <button 
                    className="text-mono-white hover:text-mono-light w-8 h-8 flex items-center justify-center rounded-full border border-mono-white/20 hover:bg-mono-white/10 transition-all"
                    aria-label={`Play ${song.title}`}
                  >
                    <FontAwesomeIcon icon={faPlay} size="xs" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FuturisticTurntable;