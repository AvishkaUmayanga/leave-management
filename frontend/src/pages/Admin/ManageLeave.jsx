import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import TableManageLeave from '../../components/TableManageLeave'
import axios from 'axios'

export default function ManageLeave() {
  const[fetchData, setFetchData] = useState()

  useEffect(()=>{
    const allLeave = async() =>{
      try{
        const response = await axios.get('http://localhost:4000/manage_leave', {withCredentials : true})
        console.log(response.data.allLeave)
        setFetchData(response.data.allLeave)
      }
      catch(error){
        console.log(error)
      }
    }
    allLeave()
  },[])

  const columns =[
    {Header:'EmployeeID', accessor:'employeeID'},
    {Header:'Leave Type', accessor:'leaveType'},
    {Header:'Request Date', accessor:'createdAt'},
    {Header:'Start Date', accessor:'startDate'},
    {Header:'End Date', accessor:'endDate'},
    {Header:'Status', accessor:'status'},
  ]

  const data = fetchData 

  return (
    <div>
      <AdminNavbar/>
      <div className='flex justify-center mx-3 mt-20 max-xl:mt-16'>
        {fetchData? (
          <TableManageLeave columns={columns} data={data}/>
        ): <p>Loading...</p>}
      </div>
    </div>
  )
}
