import React, { useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import menuBar from '../images/menu_hamburger.svg'
import closeBtn from '../images/x.svg'
import axios from 'axios';
import logoutBtn from '../images/logout.svg'

export default function UserNavBar() {
  const activeLink1 = "px-2 py-1  text-lg text-black rounded-full bg-white w-[150px] text-center mr-5";
  const activeLink2 = "px-2 py-1  text-lg text-black rounded-full bg-white w-[150px] text-center ml-5";
  const inActive = "w-[150px] px-2 py-1  text-lg text-white rounded-full bg-redcolor text-center"
  const activeLink = "px-2 py-1  text-lg text-black rounded-full bg-white w-[150px] text-center";

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const toggleMenu= () => {
      setIsMenuOpen(!isMenuOpen);
    }
    
    const handleLogout = async () =>{
      try{
        const response = await axios.post('http://localhost:4000/logout', {withCredentials: true})
        if(response.data.message=== 'Logout successfull')
        alert('Logout successfully')
        navigate('/')
      }
      catch(error){
        console.log(error)
      }
    }
  return (
    <div>
      <div className='flex items-center justify-end h-16 px-5 bg-bluecolor'>
        <div className='flex items-center'>
          <div className=' max-lg:hidden'>
            <NavLink to={'/profile'} className={({ isActive }) => (isActive ? activeLink1 : inActive) }> Profile</NavLink>
            <NavLink to={'/request_leave'} className={({ isActive }) => (isActive ? activeLink2 : inActive)}> Request Leave</NavLink>
          </div>
          <img src={logoutBtn} alt='logout button' onClick={handleLogout} className='w-6 ml-4 cursor-pointer'/>
          <div className='lg:hidden'>
            <img src={menuBar} alt='menu bar' onClick={toggleMenu} className={`${isMenuOpen ? 'hidden' : 'bg-white ml-4'}`}/>
            <img src={closeBtn} alt='close button' onClick={toggleMenu} className={`${isMenuOpen ? 'bg-white ml-4' : 'hidden'}`}/>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'flex flex-col items-center gap-4 py-3 bg-bluecolor' : 'hidden'}`}>
        <NavLink to={'/profile'} className={({ isActive }) => (isActive ? activeLink : inActive)}> Profile</NavLink>
        <NavLink to={'/request_leave'} className={({ isActive }) => (isActive ? activeLink : inActive)}> Request Leave</NavLink>
      </div>
    </div>
  )
}
