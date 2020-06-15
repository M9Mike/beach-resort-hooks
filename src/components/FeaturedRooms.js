import React,{useContext} from 'react'
import {RoomContext} from '../Context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

const FeaturedRooms =()=>{
  const [{featuredRooms:rooms,loading}] = useContext(RoomContext)
  return(
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading?<Loading />:rooms.map(x=><Room key={x.id} room={x} />)}
      </div>
    </section>
  )
}

export default FeaturedRooms
