import moment from 'moment'
import React from 'react'
import './_comment.scss';

const Comment = () => {
  return (
    <div className='comment p-2 d-flex'>
        <img src='' alt='videoImg' className='rounded-circle mr-3' />
        <div className='comment__body'>
            <p className='comment__header mb-1'>
                Sumit Dey • {moment('2020-05-05').fromNow()}
            </p>
            <p className='mb-0'>Nice Video Dude!!</p>
        </div> 
    </div>
  )
}

export default Comment