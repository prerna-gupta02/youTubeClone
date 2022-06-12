import React from 'react'
import './_sidebar.scss'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth'

import { MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied } from 'react-icons/md';

const Sidebar = ({toggleSidebar, handleToggleSidebar}) => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className={toggleSidebar? 'sidebar open' : 'sidebar'} onClick={() => handleToggleSidebar()}>
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't know</span>
      </li>
      <hr />
      <li onClick={() => handleLogout()}>
        <MdExitToApp size={23} />
        <span>Logout</span>
      </li>
      <hr />
    </div>
  )
}

export default Sidebar