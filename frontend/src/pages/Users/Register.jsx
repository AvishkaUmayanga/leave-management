import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Register() {

    const [employeeID, setEmployeeId] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/signup', {employeeID,password})
            if(response.data.message==='Signup successful'){
                console.log(response.data);
                alert('Register Successfull')
            }
        }
        catch(error){
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    }
    return (
        <div>
        <div className='flex items-center justify-center bg-bluecolor sm:h-20 h-14'>
            <h1 className='text-2xl text-white xl:text-3xl'>Leave Management System</h1>
        </div>
        <div className='flex justify-center  my-[100px]'>
            <div className='flex flex-col  p-7 rounded-xl  bg-white shadow-xl sm:w-[500px] gap-5 w-[300px]'>
                <h1 className='self-center mb-5 text-3xl font-bold text-bluecolor'>Register</h1>  
                <form onSubmit={handleRegister}>
                    <div className='mb-5 '>
                        <label>
                            <p>Employee ID:</p>
                            <input type="text" 
                            name="employeeId"
                            className='w-full h-8 border md:h-10'
                            required
                            onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='mb-5 '>
                    <label>
                        <p>Password:</p>
                        <input type="password" 
                        name="department"
                        className='w-full h-8 border md:h-10'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    </div>
                    <div className='items-center h-8 sm:h-12 bg-bluecolor '>
                        <button type="submit" className='w-full h-full text-lg font-bold text-white sm:text-xl'>Register</button>
                    </div>
                </form>
                <div className='mt-5 '>
                    <p>Already Have an Account</p>
                    <div className='items-center h-8 mt-2 sm:h-12 bg-redcolor'>
                        <Link to="/"><button type="submit" className='w-full h-full text-lg font-bold text-white'>Login</button></Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
