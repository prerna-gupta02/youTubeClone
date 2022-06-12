import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../../components/categories/Categories'
import Video from '../../components/video/Video'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos'
import './_homescreen.scss'
import InfinteScroll from 'react-infinite-scroll-component'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'

const HomeScreen = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPopularVideos())
  }, [dispatch])

  const { videos, activeCategory, loading } = useSelector(state => state.popularVideos)

  const fetchData = () => {
    if(activeCategory === "All")
      dispatch(getPopularVideos())
    else
      dispatch(getVideosByCategory(activeCategory))
  }

  return (
    <Container className="homescreen">
      <Categories />
      <Row>
        <InfinteScroll className='row'
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className='spinner-border d-block text-danger mx-auto'></div>
          }
        >
          {!loading ? videos.map((video) => (
            <Col lg={3} md={4}>
              <Video video={video} key={video.id} />
            </Col>
          ))
          :(
            [...Array(20)].map(() => (<Col lg={3} md={4}>
              <SkeletonVideo />
            </Col>))
          )}
        </InfinteScroll>
      </Row>
    </Container>
  )
} 

export default HomeScreen