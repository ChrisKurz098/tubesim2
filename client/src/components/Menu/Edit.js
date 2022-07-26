import { useState, useRef, useEffect } from 'react';

const Edit = ({ data, setMenuHover }) => {
  //this disables main menu functinality to make way for new inputs
  setMenuHover(4);
  const maxSelect = useRef(JSON.parse(localStorage.getItem('TubeSimData')).maxCh);
  const [maxChs,setMaxChs] = useState(new Array(maxSelect.current).fill(null));//this is used to create the channel number selection 
  const maxChSelection = new Array(30).fill(null)

  const [chState, setChState] = useState(data.current.channels);
  const [curCh, setCurCh] = useState(1);

  const saveChannelsToLocal = (saveAll) => {
    data.current.channels = chState;
    let localData = JSON.parse(localStorage.getItem('TubeSimData'));
    localData.channels = chState;
    localData.maxCh = maxChs.length;
    localStorage.setItem('TubeSimData', JSON.stringify(localData));
    window.location.reload();
  };

  const updateChState = (event) => {
    let newValue = event.target.value;
    let dataType = event.target.id;
    switch (dataType) {
      case 'name':
        newValue = `Ch: ${curCh} - ${newValue}`;
        if (newValue.length > 35) return;
        break;
      case 'episodes':
        if (newValue > 200 || newValue < 1) newValue = 1;
        break;
      case 'playlistInput':
        dataType = 'list';
        newValue = newValue.split(',');
        break;
      default:
    }
    setChState(old => {
      let newData = old;
      newData[curCh-1][dataType] = newValue;
      return newData;
    });

  }

  const updateMaxCh = (e) => {
    const newMax = new Array(parseInt(e.target.value)).fill(null);
    console.log('Update Max ch select', e.target.value, newMax)
    setMaxChs(newMax)
  }

  return (
    <div className="menuBackdrop" id="channelEditMenu">
      <div id='chEditListContainer'>
        <ul id='chEditList'>
          <li>Max Channels</li>
          <li>Channel Number:</li>
          <li>Channel Name</li>
          <li>Videos Per Playlist</li>
          <li>Play at Random Point:</li>
          <li>Youtube Playlists:</li>
        </ul>

        <div id="chEditListOptions">
        <select id="maxChSelect" onChange={updateMaxCh} value={maxChs.length}>
            {maxChSelection.map((e, i) => (<option key={`maxSelect${i}`} value={i + 1} > {`${i + 1}`} </option>))}
          </select>
          <br/>
          <select key={`maxCh${maxChs}`} id="channelNumberOption" onChange={(e) => setCurCh(e.target.value)}>
            {maxChs.map((e, i) => (<option key={`chOp${i}`} value={i + 1} > {`${i + 1}`} </option>))}
          </select>
          <br />
          <input type={'text'} key={`name-${chState[curCh - 1].name}`} id={'name'} defaultValue={chState[curCh - 1].name.split('-')[1]} onChange={updateChState} />
          <br />
          <input type={'text'} key={`episodes-${chState[curCh - 1].name}`} id={'episode'} defaultValue={chState[curCh - 1].episodes} onChange={updateChState} />
          <li>{`${chState[curCh - 1].randomPoint}`}</li>
        </div>
      </div>
      <textarea id='playlistInput' rows="10" cols="50" defaultValue={chState[curCh - 1].list} onChange={updateChState} />

      <button id='chEditSaveBtn' onClick={saveChannelsToLocal}>Save</button>
    </div>

  )
}

export default Edit;