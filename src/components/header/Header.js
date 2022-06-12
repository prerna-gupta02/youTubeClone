import React, { useEffect, useState } from 'react'
import './_header.scss'
import logo from '../../youtube-logo.png'

import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth'

const Header = ({handleToggleSidebar}) => {

  const dispatch = useDispatch()

  const [isLogin, setIsLogin] = useState(false);

  const {accessToken, loading} = useSelector(state => state.auth)

  const handleLogin = (e) => {
    // e.preventDefault()
    dispatch(login())
  }

  useEffect(() => {
    if(!loading && accessToken){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }, [accessToken])

  return (
    <div className='header'>
      <FaBars className='header__menu' size={26} onClick={() => handleToggleSidebar()} />
      <div className='header__logodetails'>
        <img src={logo} className='header__logodetails__logo' alt='logo' />
        <span>YouTube</span>
      </div>
      <form>
        <input type='text' placeholder='Search' />
        <button type='submit'>
          <AiOutlineSearch size={22} />
        </button>
      </form>
      <div className='header__icons'>
        <MdNotifications size={28} />
        <MdApps size={28} />
        {
          isLogin ? <img src='' alt='avatar' /> : <button onClick={handleLogin}>SIGN IN</button>
        }
      </div>
    </div>
  )
}

export default Header