import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Song from './Song.js'
import { SONGS_URL } from './api'

const SongApp = ({token}) => {
  const [ songs, setSongs ] = useState([])

  const getSong = async () => {
    try {
      const res = await axios.get(SONGS_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

      console.log(res)

      setSongs(res.data)
    } catch (err) {
      console.log(err)
      
      setSongs([])
    }
  }

  useEffect(() => {
    getSong()
  }, [])

  return (
    <div>
      <Header/>
      <Playlist 
        title="프로그래밍하면서 듣고 싶은 노래"
        listSong={songs}/>
    </div>
  )
}

const Header = () => {
  return (
      <h1>웹 서버 프로그래밍</h1>
  )
}

// Destructuring 사용 가능
const Playlist = ({title, listSong}) => {
  return (
    <div className='playlist'>
      <div className="playlist">{title}</div>
      {
        listSong.map(song => 
          <Song key={song.id} song={song}/>
        )
      }
    </div>
  )
}

export default SongApp