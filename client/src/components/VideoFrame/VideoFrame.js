import { useEffect, useState, useRef } from "react";
import YouTube from 'react-youtube';
//--Actual component--//


const VideoFrame = ({ data, events, loadingPage }) => {



    function onReady(event){
        event.target.setShuffle();
      events.current=[...events.current, event.target]
      events.current.sort((a, b) => (a.id-b.id) )
    }


    return (
        <>
            {(loadingPage) ? (<div id="loadingText">{`Searching for Signal. Please Wait...`}</div>) : null}
            
            <div id="videoFrame">
                {
                    data.channels.map((e, i) => {
                        const rndList = Math.floor(Math.random()*e.list.length)
                        const playlist = e.list[0];
                        //const rnd = Math.floor(Math.random()*e.episodes);
                        const opts = {
                            height: '480',
                            width: '720',
                            playerVars: {
                                start: 0,
                                controls: 0,
                                modestbranding: 1,
                                listType: 'playlist',
                                list: playlist,
                                index: 1,
                                loop: 1, 
                                autoplay: true,
                                mute: 1,
                            },
                        }
                        return (

                            <YouTube key={`${data.channels[i].name}`} style={{ display: "none" }} className="video" id={`${data.channels[i].name}`} opts={opts} onReady={onReady}></YouTube>
                        )

                    })
                }

            </div>
        </>
    )
}

export default VideoFrame;