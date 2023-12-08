import React, { useEffect } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { dashBoardData } from '../../data/DashBoardData'
import { useState } from 'react'
import axios from 'axios'

export default function DashBoard() {
  const[count, setCount] = useState({totalEmployees:0, totalRegEmployees:0, totalLeaveTypes:0, totalLeave:0, defaultCount:0})
  
  useEffect(()=>{
    const fetchCounts = async()=>{
      try{
        const response = await axios.get('http://localhost:4000/admin_dashboard', { withCredentials: true })
        console.log(response.data); 
        setCount(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchCounts()
  },[])
  return (
    <div>
      <AdminNavbar/>
      <div className='flex justify-center my-[200px]'>
        <div className='grid grid-cols-3 gap-16'>
            {dashBoardData.map(({title},index) =>(
            <div className=' w-[300px] h-[180px] bg-white rounded-2xl text-center flex-col p-5 shadow-xl' key={index}>
                <div className='h-8 text-white rounded-b-xl bg-redcolor'>
                    <h3 className='text-xl font-semibold'>{title}</h3>
                </div>
                <div className='flex items-center justify-center h-[100px] text-bluecolor'>
                    <h4 className='text-2xl font-bold'>{title==='Total Employees'?count.totalEmployees : title==='Registerd Employees'?count.totalRegEmployees : title==='Leave Types'?count.totalLeaveTypes: title==='Total Applications'?count.totalLeave :count.defaultCount}</h4>
                </div>
            </div>
            ))} 
        </div>
      </div>
    </div>
  )
}
