import React, { useEffect, useState } from 'react'
import UserNavBar from '../../components/UserNavBar';
import TableEmployees from '../../components/TableEmployees';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const [fetchLeave, setFetchLeave] = useState(null)
  const [fetchEmpDetails, setfetchEmpDetails] = useState('')
  const { employeeID } = useParams()
  useEffect(()=>{
    const leaveTable = async()=>{
      try{
        const response = await axios.get('http://localhost:4000/user_profile', {withCredentials : true})
        console.log(response.data)
        setFetchLeave(response.data.leaveDetails)
        setfetchEmpDetails(response.data.employeeDetails)
      }
      catch(error){
        console.log(error)
      }
    }
    leaveTable()
  },[employeeID])
  
  const columns =[
    {Header:'Leave Type', accessor:'leaveType'},
    {Header:'Request Date', accessor:'createdAt'},
    {Header:'Start Date', accessor:'startDate'},
    {Header:'End Date', accessor:'endDate'},
    {Header:'Status', accessor:'status'},
  ]
  const data=fetchLeave
  return (
    <div>
       <UserNavBar/>
       <div className='flex flex-col justify-between my-10 mx-7 xl:flex-row'>
        <div className='text-lg '>
          <h3>Hello <span className='text-xl font-semibold'>{fetchEmpDetails.firstName}!</span></h3>
        </div>
        <div className='flex justify-center mx-3 mt-20 max-xl:mt-16'>
          {fetchLeave? (
            <TableEmployees columns={columns} data={data}/>
          ): <p>Loading...</p>}
        </div>
        <div className="bg-white w-[300px] p-8 rounded-lg shadow-md self-center max-xl:mt-16 mt-20">
          <h3 className="mb-4 text-2xl font-bold">Your Details</h3>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Name:</h4>
            <p className="text-gray-700">{fetchEmpDetails.firstName} {fetchEmpDetails.lastName}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Employee ID:</h4>
            <p className="text-gray-700">{fetchEmpDetails.employeeID}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Email:</h4>
            <p className="text-gray-700">{fetchEmpDetails.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
