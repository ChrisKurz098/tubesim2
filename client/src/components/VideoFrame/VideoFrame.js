import { useEffect, useState, useRef } from "react";
import YouTube from 'react-youtube';
//--Actual component--//


const VideoFrame = ({ data, currentCh, setCurrentCh, events }) => {

    const [loading, setLoading] = useState(true)

    function onReady(event){
      events.current=[...events.current, event.target]
      events.current.sort((a, b) => (a.id-b.id) )
      if (events.current.length !== data.channels.length) setLoading(false)
    }


    return (
        <>
            {(loading) ? (<>Searching for Signal...</>) : null}
            <div id="chDisplay" key={`Z${currentCh}`}>{`${data.channels[currentCh].name}`}</div>
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