import { useEffect, useState, useRef } from "react";

//--Actual component--//
const VideoFrame = ({ data, currentCh, setCurrentCh }) => {

    return (
        <div id="videoFrame">
            {
                data.channels.map( (e, i) => {
                    const playlist = e.list[0];
                    return (<iframe key={`${data.channels[i].name}`} id={`${data.channels[i].name}`} style={{display: "none"}} loading="eager" allow="autoplay" src={`https://www.youtube.com/embed/videoseries?list=${playlist}&loop=1&fs=0&disablekb=1&controls=0?modestbranding=1&autoplay=1$enablejsapi=1`} title={`${data.channels[i].name}`}></iframe>);
                })
            }
            


        </div>
    )
}

export default VideoFrame;