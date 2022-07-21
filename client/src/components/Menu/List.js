const List = ({data}) => {
    return (
        <ul id='channelList'>
        {data.current.channels.map((e, i) => {
          return <li className='chListItem' key={i}>{e.name}</li>
        })}
      </ul>
    )
}

export default List;