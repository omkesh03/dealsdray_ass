import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
function Heading() {
    const user = localStorage.getItem("username")
  return (
    <div>
        <h1>Logo</h1>
        <div>
            <div className='dashboard-container'>
                <div className='left-menu'>
                    <div className='user-info'>
                <Link to='/dashboard' className='user-info'>Home</Link>
                <Link to='/employee-list' className='user-info'>Employee list</Link>
                </div>
                </div>
                <div className='right-menu'>
                    <div className='user-info'>
                        <p className='user-info'>{user}</p>
                        <Logout className='user-info'></Logout>
                        </div>    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Heading