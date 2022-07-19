const List = ({data}) => {
    return (
        <ul id='channelList'>
        {data.channels.map((e, i) => {
          return <li className='chListItem' key={i}>{e.name}</li>
        })}
      </ul>
    )
}

export default List;