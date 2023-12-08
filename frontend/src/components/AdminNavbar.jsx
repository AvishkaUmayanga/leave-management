import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import menuBar from '../images/menu_hamburger.svg'
import closeBtn from '../images/x.svg'
import logoutBtn from '../images/logout.svg'
import axios from 'axios'

export default function AdminNavbar() {
  const activeLink = "font-bold text-black bg-white px-4 py-2 rounded-2xl";

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
      
      <div className='flex items-center justify-end h-14 bg-bluecolor'>
        <ul className='flex mx-10 text-white gap-14 max-md:hidden'>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : "")}> Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/employees" className={({ isActive }) => (isActive ? activeLink : "")}> Employess</NavLink>
          </li>
          <li>
            <NavLink to="/leave_types" className={({ isActive }) => (isActive ? activeLink : "")}>Leave Types</NavLink>
          </li>
          <li>
            <NavLink to="/manage_leave" className={({ isActive }) => (isActive ? activeLink : "")}>Manage Leave</NavLink>
          </li>
          <li>
            <img src={logoutBtn} alt='logout button' onClick={handleLogout} className='w-6 cursor-pointer'/>
          </li>
        </ul>
        <img src={menuBar} alt='menu bar' className={`${isMenuOpen ? 'hidden ' : 'bg-white md:hidden mr-5'}`} onClick={toggleMenu}/>
        <img src={closeBtn} alt='close button' className={`${isMenuOpen ? 'bg-white mr-5' : 'hidden'}`} onClick={toggleMenu}/>
      </div>


      <ul className={`${isMenuOpen ? 'flex  text-white gap-8 flex-col items-center  bg-bluecolor' : 'hidden'}`}>
            <li>
                <NavLink to="/add_employee" className={({ isActive }) => (isActive ? activeLink : "")}> Add Employee </NavLink>
            </li>
            <li>
                <NavLink to="/employees" className={({ isActive }) => (isActive ? activeLink : "")}>Employee </NavLink>
                </li>
            <li>Leave List</li>
        </ul>
    </div>
  )
}
