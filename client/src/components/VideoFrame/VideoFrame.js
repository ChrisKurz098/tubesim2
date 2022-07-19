import { useEffect } from "react";

const VideoFrame = ({ data }) => {

    useEffect(() => {
        const channels = data.channels;
        let channelLinks = {};
        channels.map((e) => {
            const name = e.name;
            channelLinks[name] = [];
            const playlistID = e.list[0];
            fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=AIzaSyCZuVb4_kTsIKbDBDGMM-KDRnIHyUoJyvw`).then(response => response.json())
                .then(data => {
                    data.items.map((e) =>  channelLinks[name].push(e.snippet.resourceId.videoId))
                    return false;
                });
            return false;
        });
    console.log("Playlist Videos: ", channelLinks);
    }, [])


    return (
        <div id="videoFrame">

        </div>
    )
}

export default VideoFrame;