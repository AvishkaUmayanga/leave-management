import React, { useState } from 'react'
import eyeIcon from '../images/eye.svg'
import eyeSlashIcon from '../images/eye-slash.svg'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


export default function LoginPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [employeeID, setEmployeeId] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/login', {employeeID,password} ,{ withCredentials: true })
            if (response.data.message === 'Login successful') {
                console.log(response.data.message) 
                const role = response.data.role
                console.log(role)
                if (role === 'admin'){
                    navigate('/dashboard')
                }else if(role === 'user'){
                    navigate('/profile')
                }
            }
        }
        catch(error){
            console.log(error.response.data)
            alert(error.response.data.message)
        }
    }

    const toggle = ()=>{
        setIsVisible(!isVisible)
    }
    
    
  return (
    <div>
      <div className='flex items-center justify-center bg-bluecolor sm:h-20 h-14'>
        <h1 className='text-2xl text-white xl:text-3xl'>Leave Management System</h1>
      </div>
      <div className='flex flex-col items-center  my-[100px]'>
            <div className='flex flex-col  p-7 rounded-xl sm:w-[500px] bg-white shadow-xl w-[300px]'>
                <h1 className='self-center mb-5 text-3xl font-bold text-bluecolor'>Login</h1>    
                <form onSubmit={handleLogin}>
                    <div className='mb-5 '>
                        <label>
                            <p>Employee ID:</p>
                            <input type="text" 
                            placeholder="Enter your employee ID" 
                            name="employeeID"
                            className='w-full h-8 border md:h-10'
                            onChange={(e) => setEmployeeId(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='mb-5 '>
                        <label>
                            <p>Password:</p>
                        </label>
                        <div className='flex border'>
                            <input type= {isVisible ?'text' : 'password'} 
                                placeholder="Enter password" 
                                name="password"
                                className='w-full h-8 outline-none md:h-10' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='flex'>
                                <img src={eyeSlashIcon} alt='eye slash icon' className={`${isVisible ? 'cursor-pointer' : 'hidden'} pr-2`}onClick={toggle}/>
                                <img src={eyeIcon} alt='eye icon' className={`${isVisible ? 'hidden' : 'cursor-pointer'} pr-2`} onClick={toggle}/>                      
                            </div>
                        </div>
                     </div>
                    <div className='items-center h-8 sm:h-12 bg-bluecolor '>
                        <button type="submit" className='w-full h-full text-lg font-bold text-white sm:text-xl'>Login</button>
                    </div>
                </form>
                <div className='mt-5 '>
                    <p>Create an Account</p>
                    <div className='items-center h-8 mt-2 sm:h-12 bg-redcolor'>
                        <Link to="/register"><button type="submit" className='w-full h-full text-lg font-bold text-white'>Register</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
