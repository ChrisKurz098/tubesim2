import { useEffect, useState, useRef } from "react";
import YouTube from 'react-youtube';
//--Actual component--//


const VideoFrame = ({ data, events, loadingPage, ovrScn, currentCh }) => {



    function onReady(event) {


        console.log(event.target)
        events.current = [...events.current, event.target]
        events.current.sort((a, b) => (a.id - b.id))
        setTimeout(() => {
            event.target.setShuffle(true);
            if (event.target.getPlayerState() === -1) event.target.nextVideo();
        }, 100)

    }

    function onError(event) {
        console.log('error:', event.target)
        //event.target.nextVideo();
    }

    function onEnd(event) {
        console.log('End: ', event.target)
    }

    function onStateChange(event){
        if(event.target.data<0) event.target.nextVideo();
    }

    return (
        <>
            {(loadingPage) ? (<div id="loadingText">{`Getting ready. This may take some time...`}</div>) : null}

            <div id="videoFrame" style={{ "transform": `scaleX(${ovrScn.horSize}) scaleY(${ovrScn.vertSize}) translate(${ovrScn.horShift}px, ${ovrScn.vertShift}px)` }}>

                {
                    data.current.channels.map((e, i) => {
                        const rndList = Math.floor(Math.random() * e.list.length)
                        const playlist = (e.list[0]) ? e.list[0] : "PLchOdr3NN1n3NZpeBRG-eukGB6Lo2HgY4";
                        const rnd = 1 //Math.floor(Math.random()*e.episodes);
                        const opts = {
                            height: '480',
                            width: '720',
                            host: 'http://www.youtube.com',
                            playerVars: {
                                start: 0,
                                controls: 0,
                                modestbranding: 1,
                                listType: 'playlist',
                                list: playlist,
                                index: rnd,
                                loop: 2,
                                autoplay: true,
                                mute: 1,
                            },
                        }
                        return (

                            <YouTube key={`${data.current.channels[i].name}`} style={{ display: `${(currentCh === i) ? "block": "none"}`}} 
                                className="video" id={`${data.current.channels[i].name}`}
                                opts={opts}
                                onReady={onReady}
                                onError={onError}
                                onStateChange={onStateChange}
                                onEnd={onEnd}
                            />

                        )

                    })
                }

            </div>
        </>
    )
}

export default VideoFrame;