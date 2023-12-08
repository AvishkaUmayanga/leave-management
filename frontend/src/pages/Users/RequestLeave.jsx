import React, { useState } from 'react'
import UserNavBar from '../../components/UserNavBar'
import InputField from '../../components/InputField'
import axios from 'axios'

export default function RequestLeave() {
  const [selectLeaveType, setSelectLeaveType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] =useState('')
  const [employeeID, setEmployeeID] = useState('')

  const handleRequestLeave = async(e) =>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:4000/request_leave',{employeeID, selectLeaveType, startDate, endDate}, {withCredentials: true})
      if(response.data.message=== 'Request added successfully'){
        alert('Request added successfully')
      }
    }
    catch(error){
      console.log(error)
      alert(error.response.data.message)
    }
  }
  return (
    <div>
      <UserNavBar/>
      <div className='flex justify-center mt-20'>
        <form onSubmit={handleRequestLeave}>
          <div className='bg-white w-[800px] p-4'>
            <label>
              <InputField labelName='Employee Id' inputType ='text' name='employeeID' onChangeName={setEmployeeID} />
              <p className='mt-5'>Leave Type</p>
              <select id='leaveType' onChange = {(e) => setSelectLeaveType(e.target.value)} className='w-full h-8 border' value={selectLeaveType}>
                <option value='casualLeave'>Casual Leave </option>
                <option value='medicalLeave'>Medical Leave</option>
              </select>
            </label>
            <InputField labelName='Start Date' inputType ='text' name='startDate' onChangeName={setStartDate}/>
            <InputField labelName='End Date' inputType ='text' name='endDate' onChangeName={setEndDate}/>
            <div className='items-center h-8 mt-5 rounded-full sm:h-12 bg-bluecolor'>
              <button type="submit" className='w-full h-full text-lg font-bold text-white sm:text-xl'>Request</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
