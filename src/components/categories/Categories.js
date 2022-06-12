import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos';
import './_categories.scss'

const categories = [
  'All',
  'JavaScript',
  'React Js',
  'T-Series',
  'Chill-out-music',
  'Airjit Singh',
  'Music',
  'Mixes',
  'Guitar',
  'Algorithm Art',
  'Bengali Songs',
  'Coding',
  'Gaming',
  'Circket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh'
]

const Categories = () => {

  const [active, setActive] = useState('All');
  const dispatch = useDispatch();

  const handleclick = (category) => {
    setActive(category)
    if(category === "All")
      dispatch(getPopularVideos())
    else
      dispatch(getVideosByCategory(category))
  }

  return (
    <div className='categories'>
      {
        categories.map((category, index) => 
          <span 
          className={active === category ? 'active' : ''}
          key={index}
          onClick={() => handleclick(category)}
          >{category}</span>
        )
      }
    </div>
  )
}

export default Categories