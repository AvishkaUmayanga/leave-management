import React, { useState } from 'react'
import InputField from '../../components/InputField'
import { Link } from 'react-router-dom'
import backButton from '../../images/backspace-fill.svg'
import axios from 'axios'

export default function AddLeaveType() {
  const[leaveType,setLeaveType] = useState('')
  const[description,setDescription] = useState('')

  const handleAddLeaveType = async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:4000/add_leave_types',{leaveType, description}, {withCredentials: true})
      console.log(response.data.message)
      if(response.data.message==='Leave type added successfully'){
        alert('Leave type added successfully')
      }     
    }
    catch(error){
      console.log(error.response.data)
      alert(error.response.data.message)
    }
  }
  return (
    <div>
      <div className='mt-10'>
        <Link to="/employees">
          <img src={backButton} alt="back button" className='w-8 ml-10'/>
        </Link>
      </div>
      <div className='flex justify-center mt-10'>
        <div className='flex flex-col  p-7 rounded-xl  bg-white shadow-xl sm:w-[500px] gap-5 w-[320px]'>
          <h1 className='self-center mb-5 text-3xl font-bold text-bluecolor'>Add Leave Type</h1>  
          <form onSubmit={handleAddLeaveType}>
            <InputField labelName='Leave Type' inputType='text' name='leaveType' onChangeName={setLeaveType}/> 
            <InputField labelName='Description' inputType='text' name='description' onChangeName={setDescription}/> 
            <div className='items-center h-8 mt-5 sm:h-12 bg-bluecolor'>
              <button type="submit" className='w-full h-full text-lg font-bold text-white sm:text-xl'>Add Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
