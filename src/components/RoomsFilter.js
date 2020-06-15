import React,{useContext} from 'react'
import {RoomContext} from '../Context'
import Title from './Title'

// get all unique values
const getUnique = (q,w) =>[...new Set(q.map(x=>x[w]))]

const RoomsFilter = ({rooms}) =>{
  const [{handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets}] = useContext(RoomContext)
  // get unique types
  let types = getUnique(rooms, 'type')
  // add all
  types = ['all',...types]
  let people = getUnique(rooms, 'capacity')

  return (
    <section className='filter-container'>
      <Title title='search rooms' />
      <form className='filter-form'>
        {/*select type*/}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
            {types.map((x,i)=><option key={i} value={x}>{x}</option>)}
          </select>
        </div>
        {/*end of select type*/}
        {/*select guests*/}
        <div className='form-group'>
          <label htmlFor='capacity'>guests</label>
          <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
            {people.map((x,i)=><option key={i} value={x}>{x}</option>)}
          </select>
        </div>
        {/*end of guests*/}
        {/*room price*/}
        <div className='form-group'>
          <label htmlFor='price'>room price ${price}</label>
          <input className='form-control' type='range' name='price' min={minPrice} max={maxPrice} id='price' value={price} onChange={handleChange} />
        </div>
        {/*end of room price*/}
        {/*size*/}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input className='size-input' type='number' name='minSize' id='size' value={minSize} onChange={handleChange} />
            <input className='size-input' type='number' name='maxSize' id='size' value={maxSize} onChange={handleChange} />
          </div>
        </div>
        {/*end of size*/}
        {/*extras*/}
        <div className='form-group'>
          <div className='single-extra'>
            <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange} />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange} />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        {/*end of extras*/}
      </form>
    </section>
  )
}

export default RoomsFilter
