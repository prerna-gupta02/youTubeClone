import React, { useEffect, useState } from 'react'
import './_video.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {useNavigate} from 'react-router-dom'

import { AiFillEye } from 'react-icons/ai'
import request from '../../api'
import moment from 'moment'
import numeral from 'numeral'

const Video = ({ video }) => {

  const { id, snippet: {channelId, channelTitle, title, publishedAt, thumbnails: { medium }}} = video
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null)
  const navigate = useNavigate();

  const seconds = moment.duration(duration).asSeconds()
  const formatDuration = moment.utc(seconds * 1000).format("mm:ss")

  const _videoId = id?.videoId || id

  useEffect(() => {
    const getVideoDetails = async () => {
      const {data: {items}} = await request('/videos', {
        params: {
          part: 'contentDetails, statistics',
          id: _videoId
        }
      })
      setViews(items[0].statistics.viewCount)
      setDuration(items[0].contentDetails.duration)
    }
    getVideoDetails()
  }, [_videoId])

  useEffect(() => {
    const getChannelIcon = async () => {
      const {data: {items}} = await request('/channels', {
        params: {
          part: 'snippet',
          id: channelId
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    getChannelIcon()
  }, [channelId])

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`)
  }

  return (
    <div className='video' onClick={handleVideoClick}>
      <div className='video__top'>
        {/* <img src={medium.url} alt='video' /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className='video__top__duration'>{formatDuration}</span>
      </div>
      <div className='video__title'>
      {/* <img src={channelIcon?.url} alt='channel' /> */}
      <LazyLoadImage src={channelIcon?.url} effect="blur" />
        <p>{title}</p>
      </div>
      <div className='video__channel'>
        <span>{channelTitle}</span>
      </div>
      <div className='video__details'>
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views • {moment(publishedAt).fromNow()}</span>
      </div>
    </div>
  )
}

export default Video