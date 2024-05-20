import React from 'react'
import LineGraph from './LineGraph'
import Maps from './Maps'
import { TypeAnimation } from 'react-type-animation'

const ChartsAndMaps = () => {
  return (
    <div className='mt-24 px-4 md:pl-80 ' data-aos="fade-right">
      <p className='font-bold sm:text-4xl text-3xl '>
      <TypeAnimation 
        sequence={[
        "Charts and Maps",
        1000,
        ]}
        wrapper='span'
        speed={50}
        repeat={Infinity}
        cursor={false}
        />
      </p>
      <LineGraph />
      <Maps />
    </div>
  )
}

export default ChartsAndMaps
