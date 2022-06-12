import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homescreen/HomeScreen';
// import LoginScreen from './screens/loginscreen/LoginScreen';
import './_app.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watchScreen/WatchScreen';

const Layout = ({ children }) => {
  
  const [ toggleSidebar, setToggleSidebar ] = useState(false);

  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  }

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container'>
        <Sidebar toggleSidebar={toggleSidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className='app__video-container'>
          {children}
        </Container>
      </div>
    </>
  )
}

const App = () => {

  // const {accessToken, loading} = useSelector(state => state.auth)
  // const history = useNavigate()

  // useEffect(() => {
  //   if(!loading && !accessToken){
  //     history('/')
  //   }
  // }, [accessToken, loading, history])

  return (
    <Routes>
      <Route exact path='/' element={<Layout><HomeScreen /></Layout>}></Route>
      <Route path='/search' element={<Layout><h1>Search Results</h1></Layout>}></Route>
      <Route path='/watch/:id' element={<Layout><WatchScreen /></Layout>}></Route>
      <Route element={<h1>Redirected</h1>}></Route>
    </Routes>
  );
}

export default App;