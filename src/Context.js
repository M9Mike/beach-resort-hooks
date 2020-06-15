import React,{createContext,useState,useEffect} from 'react'
import items from './data'

export const RoomContext = createContext()
export const RoomProvider = ({children}) =>{
  const [state,setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  })
  //Kako tuka da imam poveke states, i da gi predadam vo value???
  // getData

  useEffect(()=>{
    let rooms = formatData(items)
    let featuredRooms = rooms.filter(x=>x.featured===true)
    let maxPrice = Math.max(...rooms.map(x=>x.price)) //Sto znaci ova, so spread raboti, bez ne
    let maxSize = Math.max(...rooms.map(x=>x.size))
    setState({...state,
      rooms,
      sortedRooms: rooms,
      featuredRooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    })
  },[])

  const formatData = q =>{
    let pomosna = q.map(x=>{
      let id = x.sys.id
      let images = x.fields.images.map(y=>y.fields.file.url)
      let room = {id,...x.fields,images}
      return room
    })
    return pomosna
  }

  const getRoom = q =>{
    let pomosna = [...state.rooms]
    const room = pomosna.find(x=>x.slug===q)
    return room
  }

  const handleChange = e =>{
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    setState({...state,
      [name]: value
    })
  }

  useEffect(()=>{
    filterRooms()
  },[state.type,state.capacity,state.price,state.minSize,state.maxSize,state.breakfast,state.pets])

  const filterRooms = () =>{
    let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets} = state
    // all the rooms
    let tempRooms = [...rooms]
    // transform value
    capacity = parseInt(capacity)
    price = parseInt(price)

    // filter by type
    if(type!=='all'){
      tempRooms = tempRooms.filter(x=>x.type===type)
    }
    // filter by capacity
    if(capacity!==1){
      tempRooms = tempRooms.filter(x=>x.capacity>=capacity)
    }
    // filter by price
    tempRooms = tempRooms.filter(x=>x.price<=price)
    // filter by size
    tempRooms = tempRooms.filter(x=>x.size>=minSize&&x.size<=maxSize)
    // filter by breakfast
    if(breakfast){
      tempRooms = tempRooms.filter(x=>x.breakfast===true)
    }
    // filter by pets
    if(pets){
      tempRooms = tempRooms.filter(x=>x.pets===true)
    }

    // hard kodirano koga ne e prazen tempRooms da se vrsi, ama dali e vaka resenie? kako preku useEffect da se iskontrolira ovoj uslov
    if(tempRooms.length>0 || capacity>=1 && price){
      setState({...state,
        sortedRooms: tempRooms
      })
    }
  }

  return (
    <RoomContext.Provider value={[{...state,getRoom,handleChange},setState]}>
      {children}
    </RoomContext.Provider>
  )
}
// export const RoomConsumer = RoomContext.Consumer ova ne go koristam, samo so useContext hookot
