import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoPlayer from './VideoPlayer'
import { useRef } from 'react'
import videojs from 'video.js'

function App() {

  const playerRef = useRef(null);
  const videoLink = "http://localhost:8000/uploads/courses/120b2910-6be2-4lae-9f00-b987d87417f1/index.m3u8";

  const videoPlayerOptions = {
    controls : true,
    responsive : true,
    fluid : true,
    sources : [
      {
        src : videoLink,
        type : "application/x-mpegURL"
      }
    ]
  }

  const handlePlayerReady = (player)=>{
    playerRef.current = player;

    // you can handle player events here , for eg..
    player.on("waiting" , ()=>{
      videojs.log("player is waiting ");
    });

    player.on("dispose" , ()=>{
      videojs.log("Player will dispose ");
    });
  };

  return (
    <>
      <div>
        <h1>Video Player</h1>
      </div>
      <VideoPlayer options = {videoPlayerOptions} onReady={handlePlayerReady}/>
    </>
    
  )
}

export default App
