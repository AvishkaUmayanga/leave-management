import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import TableEmployees from '../../components/TableEmployees'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Employees() {
  const [fetchData, setFetchData] = useState(null)
  useEffect(() =>{
  const tableData = async() =>{
    try {
      const responseData = await axios.get('http://localhost:4000/all_employees', {withCredentials: true});
      setFetchData(responseData.data.employees);
      console.log(responseData.data.employees);
    } catch (error) {
      console.error(error);
    }
  };
  tableData();
  },[])

  const columns =[
    {Header:'First Name', accessor:'firstName'},
    {Header:'Last Name', accessor:'lastName'},
    {Header:'email', accessor:'email'},
    {Header:'Employee ID', accessor:'employeeID'},
    {Header:'Role', accessor:'role'} 
  ]

  const data = fetchData;

  
  return (
    <div>
      <AdminNavbar/>
      <div className='flex justify-end my-10 mr-20'>
        <div className='items-center h-10 bg-redcolor w-[200px] rounded-full'>
          <Link to="/add_employee"><button type="submit" className='w-full h-full text-lg font-bold text-white'>Add Employee</button></Link>
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
