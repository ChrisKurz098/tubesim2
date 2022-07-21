import { useState, useRef, useEffect } from 'react';

const Edit = ({ data, setMenuHover }) => {
  //this disables main menu functinality to make way for new inputs
  setMenuHover(4);
  const [select, setSelect] = useState(0);
  const [saved, setSaved] = useState(false);
  const selected = useRef(0);
  const maxChs = new Array(30).fill(null);//this is used to create the channel number selection 

  const [chState, setChState] = useState(data.current.channels);
  const [curCh, setCurCh] = useState(1);

  return (
    <div className="menuBackdrop" id="channelEditMenu">
      <div id='chEditListContainer'>
        <ul id='chEditList'>
          <li>Channel Number:</li>
          <li>Channel Name</li>
          <li>Videos Per Playlist</li>
          <li>Play at Random Point:</li>
          <li>Youtube Playlists:</li>
        </ul>

        <div id="chEditListOptions">
          <select id="channelNumberOption" onChange={(e) => setCurCh(e.target.value)}>
            {maxChs.map((e,i) => (<option key={`chOp${i}`} value={i+1} > {`${i+1}`} </option>))}
          </select>
          <br/>
          <input type={'text'} key={`name${chState[curCh-1].name}`} defaultValue={chState[curCh-1].name.split('-')[1]} />
          <br/>
          <input type={'text'} key={`numEp${chState[curCh-1].name}`} defaultValue={chState[curCh-1].episodes} />
          <li>{`${chState[curCh-1].randomPoint}`}</li>
        </div>
      </div>
      <textarea id='playlistInput' rows="10" cols="50" defaultValue={chState[curCh - 1].list}>

      </textarea>
      <p>Save</p>
    </div>

  )
}

export default Edit;