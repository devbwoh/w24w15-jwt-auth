import { useState } from 'react'
import { FaStar } from 'react-icons/fa'


const Song = (props) => {
  const [lyricsExpanded, setLyricsExpanded] = useState(false)

  const toggleLyrics = () => {
    setLyricsExpanded(prevState => !prevState)
  }

    return (
      <>
        <div className="container">
          <img 
            src={`https://picsum.photos/600/150?random=${props.song.id}`} 
            alt={`랜덤 이미지 ${props.song.id}`}
            onClick={toggleLyrics}/>
          <a 
            href={`https://www.youtube.com/results?search_query=${props.song.title}`}
            target="_blank"
            rel="noreferrer">
            <div className="song-title">
              {`${props.song.title} (${props.song.singer})`}
            </div>
          </a>
          {/* Rating을 FaStar Icon으로 출력 */}
          <div className="song-rating">
            {/* Spread 연산자 사용 */}
            {[...Array(props.song.rating)].map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
        {props.song.lyrics && lyricsExpanded && (
            <pre className="song-lyrics" onClick={toggleLyrics}>
              {props.song.lyrics}
            </pre>
        )}
      </>
    )
  }

  export default Song