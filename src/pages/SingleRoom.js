import React,{useState,useContext} from 'react'
import defaultBcg from '../images/room-9.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../Context'
import StyledHero from '../components/StyledHero'

const SingleRoom=(props)=>{
  const [slug]=useState(props.match.params.slug)
  const [defBcg]=useState(defaultBcg)
  const [{getRoom}]=useContext(RoomContext)
  const room = getRoom(slug)

  // Ne mi e jasno sega kako na copy-paste na linkot od prva ja dava sobata (koga ja ima), a preeska ne sakase
  if(!room){// if room is undefined
    return (
      <div className='error'>
        <h3>No such room could be found...</h3>
        <Link to='/rooms/' className='btn-primary'>Back to rooms</Link>
      </div>
    )
  }

  const {name,description,capacity,size,price,extras,breakfast,pets,images} = room
  const [mainImg,...defaultImg] = images
  return (
    <>
      <StyledHero img={mainImg || defBcg}>
        <Banner title={`${name} room`}>
          <Link to='/rooms/' className='btn-primary'>back to rooms</Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImg.map((x,i)=><img key={i} src={x} alt={name} />)}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>max capacity : {capacity>1?`${capacity} people` : `${capacity} person`}</h6>
            <h6>{pets?'pets allowed':'no pets allowed'}</h6>
            <h6>{breakfast && 'free breakfast included'}</h6>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <h6>extras</h6>
        <ul className='extras'>
          {extras.map((x,i)=><li key={i}>- {x}</li>)}
        </ul>
      </section>
    </>
  )
}

export default SingleRoom
