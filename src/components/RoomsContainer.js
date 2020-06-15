import React,{useContext} from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import {RoomContext} from '../Context'
import Loading from './Loading'


const RoomsContainer = () =>{
  const [{loading,sortedRooms,rooms}] = useContext(RoomContext)

  if(loading){
    return <Loading />
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  )
}

export default RoomsContainer
