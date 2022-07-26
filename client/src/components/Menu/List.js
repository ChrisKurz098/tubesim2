const List = ({data}) => {
    return (
        <ul id='channelList'>
        {data.current.channels.map((e, i) => {
          if (i+1>data.current.maxCh) return false;
          return <li className='chListItem' key={i}>{e.name}</li>
        })}
      </ul>
    )
}

export default List;