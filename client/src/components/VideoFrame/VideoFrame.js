import { useEffect, useState, useRef } from "react";

async function getVidIds(data) {
    const channels = data.channels;
    const channelLinks = []; //all channels and all their videoIds will be saved here

    channels.forEach(async (e, i) => {
        const index = i;
        channelLinks[index] = [];
        const playlistID = e.list[0];
        await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw`).then(response => response.json())
            .then(data => {
                console.log('chLinks: ', data)
                data.items.map((e) => {
                    channelLinks[index].push(e.snippet.resourceId.videoId);
                    
                })
            });
    });

    
    return channelLinks;
};


//--Actual component--//
const VideoFrame = ({ data }) => {

    return (
        <div id="videoFrame">
            {
             
                data.channels.map((e, i) => {
                    const playlist = e.list[0];
                    console.log('playlist: ', playlist)
                    return (<iframe key={`${data.channels[i].name}`} src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlist}&loop=1&fs=0&disablekb=1&controls=0`} title={`${data.channels[i].name}`}></iframe>);
                })
            }
            


        </div>
    )
}

export default VideoFrame;