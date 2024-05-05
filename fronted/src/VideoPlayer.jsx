import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";


export const VideoPlayer = (props)=>{
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options , onReady} = props;


    useEffect(()=>{
        // Make sure Video.js player is only initialized once .
        if(!playerRef.current){
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement,options , ()=>{
                videojs.log("Player is ready");
                onReady && onReady(player);
            }));


            // You should update an existing player in the else block here ..
            // on prop change , for eg...
        }
        else{
            const player = playerRef.current ;

            player.autoPlay(options.autoPlay);
            player.src(options.sources);
        }
    },[options, videoRef]);

    // Dispose the videojs  player when the functional component unmounts ...
    useEffect(()=>{
        const player = playerRef.current;

        return ()=>{
            if(player && !player.isDisposed()){
                player.dispose();
                playerRef.current = null ;

            };
        };
    },[playerRef]);

    return (
        <div data-vis-player style={{width : "600px"}}> 
        <div ref={videoRef} />
        </div>
    );
};

export default VideoPlayer ; 