import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import TableEmployees from '../../components/TableEmployees'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function LeaveTypes() {
  const[fetchData,setFetchData] = useState(null)

  useEffect(()=>{
    const fetchLeaveTypes = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/leave_types', {withCredentials: true})
        console.log(response.data.leaveTypes)
        setFetchData(response.data.leaveTypes)
      } 
      catch(error){
        console.log(error)
      }
    }
    fetchLeaveTypes()
  },[])

  const columns = [
    {Header:'Leave Type', accessor:'leaveType'},
    {Header:'Description', accessor:'description'},
  ]

  const data = fetchData;

  return (
    <div>
      <AdminNavbar/>
      <div className='flex justify-end my-10 mr-20'>
        <div className='items-center h-10 bg-redcolor w-[200px] rounded-full'>
          <Link to="/add_leave_type"><button type="submit" className='w-full h-full text-lg font-bold text-white'>Add Leave Type</button></Link>
        </div>
      </div>
      <div className='flex justify-center my-28'>
      {fetchData ? (
        <TableEmployees data={data} columns={columns} />
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </div>
  )
}
