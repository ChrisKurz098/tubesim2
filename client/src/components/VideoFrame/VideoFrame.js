import { useEffect, useState, useRef } from "react";
import YouTube from 'react-youtube';
//--Actual component--//


const VideoFrame = ({ data, currentCh, setCurrentCh }) => {

    function onReady(e){
        console.log(e)
    }
    
    return (
        <>
            {(YouTube.PlayerState.BUFFERING) ? (<>Searching for Signal...</>) : null}
            <div id="videoFrame">
                {
                    data.channels.map((e, i) => {
                        const playlist = e.list[0];
                        const opts = {
                            height: '480',
                            width: '720',
                            playerVars: {
                                start: 0,
                                controls: 0,
                                modestbranding: 1,
                                listType: 'playlist',
                                list: playlist,
                                index: 1, //this always subtracts one
                                loop: 1, //loops the playlist
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