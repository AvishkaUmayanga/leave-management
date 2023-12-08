import React, { useState } from 'react'
import axios from 'axios';
import backButton from '../../images/backspace-fill.svg'
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';

export default function AddEmployee() {

  const [firstName,setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [role, setRole] = useState('');
  // const [department, setDepartment] = useState('');

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/add_employee',{firstName, lastName, email, employeeID, role}, {withCredentials: true})
      console.log(response.data.message)
      if(response.data.message === 'Employee added successfully'){
        alert('Employee added successfully')
      }
    }
    catch(error){
      console.error(error.response.data)
      alert(error.response.data.message)
    };
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
          <h1 className='self-center mb-5 text-3xl font-bold text-bluecolor'>Add Employee</h1>  
          <form onSubmit={handleAddEmployee}>
            <InputField labelName='First Name' inputType='text' name='firstName' onChangeName={setFirstName}/> 
            <InputField labelName='Last Name' inputType='text' name='lastName' onChangeName={setLastName}/> 
            <InputField labelName='email' inputType='email' name='email' onChangeName={setEmail}/> 
            <InputField labelName='Employee ID' inputType='text' name='employeeId' onChangeName={setEmployeeID}/> 
            <InputField labelName='Role' inputType='text' name='role' onChangeName={setRole}/> 
            {/* <InputField labelName='Department' inputType='text' name='department' onChangeName={setDepartment}/>  */}
            <div className='items-center h-8 mt-5 sm:h-12 bg-bluecolor'>
              <button type="submit" className='w-full h-full text-lg font-bold text-white sm:text-xl'>Add Details</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
