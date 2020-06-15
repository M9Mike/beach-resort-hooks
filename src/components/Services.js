import React,{useState} from 'react'
import Title from './Title'
import {FaCocktail,FaHiking,FaShuttleVan,FaBeer} from 'react-icons/fa'

const Services =()=>{
  const [services]=useState([
    {
      icon: <FaCocktail />,
      title: 'Free Cocktails',
      info: 'Enjoy the day to the fullest with a wide selection of some of the best cocktails in the World'
    },
    {
      icon: <FaHiking />,
      title: 'Endless Hiking',
      info: 'Fill your time with some amazing hikes. We provide the best hiking options in the area'
    },
    {
      icon: <FaShuttleVan />,
      title: 'Free Shuttle',
      info: 'Need to get somewhere? We got you covered. Enjoy the luxurious veichles, with unlimited door to door service'
    },
    {
      icon: <FaBeer />,
      title: 'Strongest Beer',
      info: 'Give me a woman that loves beer and I will conquer the World'
    }
  ])
  return(
    <section className='services'>
      <Title title='services' />
      <div className='services-center'>
        {services.map((x,i)=><article key={i} className='service'>
            <span>{x.icon}</span>
            <h6>{x.title}</h6>
            <p>{x.info}</p>
          </article>)}
      </div>
    </section>
  )
}

export default Services
